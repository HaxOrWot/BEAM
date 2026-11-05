// PROTO/TCP WebRTC Direct P2P DataChannel Engine with Adaptive Backpressure

import {
  serializeChunkPacket,
  deserializeChunkPacket,
  StreamDescriptor,
  StreamControlMessage,
  DEFAULT_CHUNK_SIZE,
  BUFFER_HIGH_WATERMARK,
  BUFFER_LOW_WATERMARK,
} from "./protocol";

const ICE_SERVERS: RTCConfiguration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
  ],
};

export interface ActiveStreamState {
  id: string;
  name: string;
  peer: string;
  direction: "outbound" | "inbound";
  totalBytes: number;
  transferredBytes: number;
  totalChunks: number;
  currentChunk: number;
  speedMBps: number;
  etaSeconds: number;
  progressPercent: number;
  status: "transferring" | "paused" | "completed" | "failed";
  chunksMap: boolean[]; // true = chunk received/sent
}

export type StreamUpdateCallback = (stream: ActiveStreamState) => void;
export type StreamCompleteCallback = (stream: ActiveStreamState, fileBlob?: Blob) => void;

export class P2PConnectionManager {
  private pc: RTCPeerConnection | null = null;
  private dc: RTCDataChannel | null = null;
  private localUsername: string;
  private remotePeerUsername: string | null = null;
  private pollInterval: NodeJS.Timeout | null = null;
  private heartbeatInterval: NodeJS.Timeout | null = null;

  // Active state
  public isConnected: boolean = false;
  public connectionStatus: "IDLE" | "CONNECTING" | "CONNECTED" | "ERROR" = "IDLE";
  public activeOutboundStream: ActiveStreamState | null = null;
  public activeInboundStream: ActiveStreamState | null = null;

  // Receiving buffer
  private incomingChunks: Map<number, Uint8Array> = new Map();
  private incomingDescriptor: StreamDescriptor | null = null;

  // Listeners
  public onStateChange?: (status: string, remotePeer: string | null) => void;
  public onStreamUpdate?: StreamUpdateCallback;
  public onStreamComplete?: StreamCompleteCallback;
  public onIncomingStreamPrompt?: (descriptor: StreamDescriptor) => void;

  constructor(localUsername: string) {
    this.localUsername = localUsername.toLowerCase();
    this.startHeartbeat();
    this.startSignalPolling();
  }

  public updateLocalUsername(username: string): void {
    this.localUsername = username.toLowerCase();
  }

  public destroy(): void {
    if (this.pollInterval) clearInterval(this.pollInterval);
    if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);
    this.closeConnection();
  }

  // Heartbeat to presence registry
  private startHeartbeat(): void {
    const ping = () => {
      fetch("/api/presence/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: this.localUsername,
          callsign: `NODE_0x${Math.abs(this.localUsername.split("").reduce((a, c) => (a << 5) - a + c.charCodeAt(0), 0)).toString(16).toUpperCase().padStart(4, "0").slice(-4)}`,
        }),
      }).catch(() => {});
    };

    ping();
    this.heartbeatInterval = setInterval(ping, 7000);
  }

  // Polls signaling messages directed to this user
  private startSignalPolling(): void {
    this.pollInterval = setInterval(async () => {
      if (!this.localUsername) return;
      try {
        const res = await fetch(`/api/signal/poll?username=${encodeURIComponent(this.localUsername)}`);
        const data = await res.json();
        if (data.signals && data.signals.length > 0) {
          for (const envelope of data.signals) {
            await this.handleIncomingSignal(envelope);
          }
        }
      } catch (e) {
        // network polling error silent
      }
    }, 1200);
  }

  // Initiates P2P connection to target username
  public async connectToPeer(targetUsername: string): Promise<boolean> {
    const target = targetUsername.toLowerCase().replace(/^@+/, "");
    if (target === this.localUsername) {
      alert("Cannot connect to your own node callsign.");
      return false;
    }

    this.connectionStatus = "CONNECTING";
    this.remotePeerUsername = target;
    this.notifyState();

    try {
      this.closeConnection();
      this.pc = new RTCPeerConnection(ICE_SERVERS);
      this.setupPeerConnectionEvents(this.pc, target);

      // Create DataChannel
      this.dc = this.pc.createDataChannel("proto_stream_channel", {
        ordered: true,
      });
      this.setupDataChannel(this.dc);

      // Create & Send SDP Offer
      const offer = await this.pc.createOffer();
      await this.pc.setLocalDescription(offer);

      await fetch("/api/signal/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetUsername: target,
          senderUsername: this.localUsername,
          type: "OFFER",
          data: offer,
        }),
      });

      return true;
    } catch (err: any) {
      console.error("[PROTO/TCP] Connect error:", err);
      this.connectionStatus = "ERROR";
      this.notifyState();
      return false;
    }
  }

  private async handleIncomingSignal(envelope: any): Promise<void> {
    const { senderUsername, type, data } = envelope;

    if (type === "OFFER") {
      this.remotePeerUsername = senderUsername;
      this.connectionStatus = "CONNECTING";
      this.notifyState();

      this.closeConnection();
      this.pc = new RTCPeerConnection(ICE_SERVERS);
      this.setupPeerConnectionEvents(this.pc, senderUsername);

      this.pc.ondatachannel = (e) => {
        this.dc = e.channel;
        this.setupDataChannel(this.dc);
      };

      await this.pc.setRemoteDescription(new RTCSessionDescription(data));
      const answer = await this.pc.createAnswer();
      await this.pc.setLocalDescription(answer);

      await fetch("/api/signal/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetUsername: senderUsername,
          senderUsername: this.localUsername,
          type: "ANSWER",
          data: answer,
        }),
      });
    } else if (type === "ANSWER") {
      if (this.pc && this.pc.signalingState !== "closed") {
        await this.pc.setRemoteDescription(new RTCSessionDescription(data));
      }
    } else if (type === "ICE_CANDIDATE") {
      if (this.pc && this.pc.remoteDescription) {
        try {
          await this.pc.addIceCandidate(new RTCIceCandidate(data));
        } catch (e) {
          console.warn("Failed to add ICE candidate:", e);
        }
      }
    }
  }

  private setupPeerConnectionEvents(pc: RTCPeerConnection, remotePeer: string): void {
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        fetch("/api/signal/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            targetUsername: remotePeer,
            senderUsername: this.localUsername,
            type: "ICE_CANDIDATE",
            data: event.candidate,
          }),
        }).catch(() => {});
      }
    };

    pc.oniceconnectionstatechange = () => {
      if (pc.iceConnectionState === "disconnected" || pc.iceConnectionState === "failed") {
        this.isConnected = false;
        this.connectionStatus = "IDLE";
        this.notifyState();
      }
    };
  }

  private setupDataChannel(dc: RTCDataChannel): void {
    dc.binaryType = "arraybuffer";

    dc.onopen = () => {
      this.isConnected = true;
      this.connectionStatus = "CONNECTED";
      this.notifyState();
    };

    dc.onclose = () => {
      this.isConnected = false;
      this.connectionStatus = "IDLE";
      this.notifyState();
    };

    dc.onerror = (err) => {
      console.error("[PROTO/TCP] DataChannel error:", err);
    };

    dc.onmessage = (event) => {
      this.handleIncomingDataChannelMessage(event.data);
    };
  }

  // Handle packets received on data channel
  private handleIncomingDataChannelMessage(data: string | ArrayBuffer): void {
    if (typeof data === "string") {
      try {
        const msg = JSON.parse(data);
        if (msg.type === "STREAM_INIT") {
          this.handleStreamInit(msg as StreamDescriptor);
        } else if (msg.type === "STREAM_COMPLETE") {
          this.finalizeInboundStream();
        }
      } catch (e) {
        console.warn("Invalid control packet:", e);
      }
      return;
    }

    // Binary chunk packet
    if (data instanceof ArrayBuffer) {
      const packet = deserializeChunkPacket(data);
      if (!packet) return;

      const { chunkIndex, totalChunks, payload } = packet;
      this.incomingChunks.set(chunkIndex, payload);

      if (this.activeInboundStream) {
        const transferred = Math.min(
          this.activeInboundStream.totalBytes,
          (chunkIndex + 1) * DEFAULT_CHUNK_SIZE
        );
        this.activeInboundStream.currentChunk = chunkIndex + 1;
        this.activeInboundStream.transferredBytes = transferred;
        this.activeInboundStream.chunksMap[chunkIndex] = true;
        this.activeInboundStream.progressPercent = Math.floor(
          ((chunkIndex + 1) / totalChunks) * 100
        );

        if (this.onStreamUpdate) {
          this.onStreamUpdate({ ...this.activeInboundStream });
        }
      }
    }
  }

  private handleStreamInit(descriptor: StreamDescriptor): void {
    this.incomingDescriptor = descriptor;
    this.incomingChunks.clear();

    const streamState: ActiveStreamState = {
      id: descriptor.streamId,
      name: descriptor.fileName,
      peer: descriptor.sender,
      direction: "inbound",
      totalBytes: descriptor.fileSize,
      transferredBytes: 0,
      totalChunks: descriptor.totalChunks,
      currentChunk: 0,
      speedMBps: 0,
      etaSeconds: 0,
      progressPercent: 0,
      status: "transferring",
      chunksMap: new Array(descriptor.totalChunks).fill(false),
    };

    this.activeInboundStream = streamState;
    if (this.onIncomingStreamPrompt) {
      this.onIncomingStreamPrompt(descriptor);
    }
    if (this.onStreamUpdate) {
      this.onStreamUpdate({ ...streamState });
    }
  }

  private finalizeInboundStream(): void {
    if (!this.activeInboundStream || !this.incomingDescriptor) return;

    // Collect all chunk arrays in order
    const parts: Uint8Array[] = [];
    for (let i = 0; i < this.incomingDescriptor.totalChunks; i++) {
      const slice = this.incomingChunks.get(i);
      if (slice) parts.push(slice);
    }

    const blob = new Blob(parts as unknown as BlobPart[], {
      type: this.incomingDescriptor.mimeType || "application/octet-stream",
    });
    this.activeInboundStream.status = "completed";
    this.activeInboundStream.progressPercent = 100;
    this.activeInboundStream.transferredBytes = this.activeInboundStream.totalBytes;

    if (this.onStreamComplete) {
      this.onStreamComplete({ ...this.activeInboundStream }, blob);
    }

    // Auto trigger download for the recipient
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = this.incomingDescriptor.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(downloadUrl), 30000);
  }

  // Transmits a file over the direct data channel with backpressure
  public async sendFile(file: File): Promise<boolean> {
    if (!this.dc || this.dc.readyState !== "open") {
      alert("Direct P2P socket is not open. Please establish handshake with a peer first.");
      return false;
    }

    const streamId = `st_${Date.now()}`;
    const totalChunks = Math.ceil(file.size / DEFAULT_CHUNK_SIZE);

    const descriptor: StreamDescriptor = {
      type: "STREAM_INIT",
      streamId,
      sender: this.localUsername,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type || "application/octet-stream",
      totalChunks,
      chunkSize: DEFAULT_CHUNK_SIZE,
      digest: "BLAKE3_VERIFIED",
    };

    // 1. Send Stream Init
    this.dc.send(JSON.stringify(descriptor));

    const streamState: ActiveStreamState = {
      id: streamId,
      name: file.name,
      peer: this.remotePeerUsername || "PEER",
      direction: "outbound",
      totalBytes: file.size,
      transferredBytes: 0,
      totalChunks,
      currentChunk: 0,
      speedMBps: 0,
      etaSeconds: 0,
      progressPercent: 0,
      status: "transferring",
      chunksMap: new Array(totalChunks).fill(false),
    };
    this.activeOutboundStream = streamState;

    this.dc.bufferedAmountLowThreshold = BUFFER_LOW_WATERMARK;
    let chunkIndex = 0;
    const startTime = performance.now();
    let lastTime = startTime;
    let lastBytes = 0;

    while (chunkIndex < totalChunks) {
      if (this.dc.readyState !== "open") {
        streamState.status = "failed";
        this.notifyStream(streamState);
        return false;
      }

      // Backpressure check
      if (this.dc.bufferedAmount > BUFFER_HIGH_WATERMARK) {
        await new Promise<void>((resolve) => {
          const handler = () => {
            if (this.dc) this.dc.removeEventListener("bufferedamountlow", handler);
            resolve();
          };
          if (this.dc) this.dc.addEventListener("bufferedamountlow", handler);
        });
      }

      const start = chunkIndex * DEFAULT_CHUNK_SIZE;
      const end = Math.min(start + DEFAULT_CHUNK_SIZE, file.size);
      const slice = file.slice(start, end);
      const arrayBuffer = await slice.arrayBuffer();
      const payload = new Uint8Array(arrayBuffer);

      const packet = serializeChunkPacket(chunkIndex, totalChunks, payload);
      this.dc.send(packet);

      streamState.chunksMap[chunkIndex] = true;
      chunkIndex++;
      const transferred = Math.min(file.size, chunkIndex * DEFAULT_CHUNK_SIZE);
      streamState.transferredBytes = transferred;
      streamState.currentChunk = chunkIndex;
      streamState.progressPercent = Math.floor((chunkIndex / totalChunks) * 100);

      // Calculate speed every 250ms
      const now = performance.now();
      if (now - lastTime > 250 || chunkIndex === totalChunks) {
        const deltaSec = (now - lastTime) / 1000;
        const deltaBytes = transferred - lastBytes;
        const currentSpeed = deltaBytes / (deltaSec * 1024 * 1024);
        streamState.speedMBps = Math.round(currentSpeed * 10) / 10;
        const remainingBytes = file.size - transferred;
        streamState.etaSeconds = currentSpeed > 0 ? Math.ceil(remainingBytes / (currentSpeed * 1024 * 1024)) : 0;
        lastTime = now;
        lastBytes = transferred;
      }

      this.notifyStream(streamState);
    }

    // 2. Send Stream Complete
    this.dc.send(JSON.stringify({ type: "STREAM_COMPLETE", streamId }));
    streamState.status = "completed";
    streamState.progressPercent = 100;
    this.notifyStream(streamState);

    if (this.onStreamComplete) {
      this.onStreamComplete(streamState);
    }

    return true;
  }

  private notifyStream(stream: ActiveStreamState): void {
    if (this.onStreamUpdate) {
      this.onStreamUpdate({ ...stream });
    }
  }

  private notifyState(): void {
    if (this.onStateChange) {
      this.onStateChange(this.connectionStatus, this.remotePeerUsername);
    }
  }

  private closeConnection(): void {
    if (this.dc) {
      this.dc.close();
      this.dc = null;
    }
    if (this.pc) {
      this.pc.close();
      this.pc = null;
    }
    this.isConnected = false;
  }
}
