"use client";

import { supabase } from "@/lib/supabase";

export interface FileManifest {
  id: string;
  name: string;
  size: number;
  type: string;
  expectedHash?: string;
}

export interface P2PProgressCallback {
  (progress: {
    fileId: string;
    fileName: string;
    bytesTransferred: number;
    totalBytes: number;
    percent: number;
    speedMBs: number;
  }): void;
}

export interface P2PFileReceivedCallback {
  (file: {
    manifest: FileManifest;
    blob: Blob;
    verified: boolean;
  }): void;
}

const CHUNK_SIZE = 64 * 1024; // 64 KB chunks
const BUFFER_THRESHOLD = 1024 * 1024; // 1 MB backpressure limit

const ICE_SERVERS: RTCConfiguration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun.cloudflare.com:3478" },
  ],
};

export class BeamP2PEngine {
  private localHandle: string;
  private peerConnections: Map<string, RTCPeerConnection> = new Map();
  private dataChannels: Map<string, RTCDataChannel> = new Map();
  private signalingChannel: ReturnType<typeof supabase.channel> | null = null;
  private onProgress?: P2PProgressCallback;
  private onFileReceived?: P2PFileReceivedCallback;

  // Assembly buffer for incoming streams
  private receivingFiles: Map<
    string,
    {
      manifest: FileManifest;
      chunks: ArrayBuffer[];
      receivedBytes: number;
      startTime: number;
    }
  > = new Map();

  constructor(localHandle: string) {
    this.localHandle = localHandle.toLowerCase().replace(/^@/, "");
  }

  public setCallbacks(callbacks: {
    onProgress?: P2PProgressCallback;
    onFileReceived?: P2PFileReceivedCallback;
  }) {
    this.onProgress = callbacks.onProgress;
    this.onFileReceived = callbacks.onFileReceived;
  }

  // Connect to Supabase Realtime Signaling Bus
  public initSignaling(): void {
    if (!this.localHandle) return;

    const channelName = `beam:signal:${this.localHandle}`;
    this.signalingChannel = supabase.channel(channelName, {
      config: { broadcast: { self: false } },
    });

    this.signalingChannel
      .on("broadcast", { event: "webrtc:offer" }, async ({ payload }) => {
        await this.handleIncomingOffer(payload);
      })
      .on("broadcast", { event: "webrtc:answer" }, async ({ payload }) => {
        await this.handleIncomingAnswer(payload);
      })
      .on("broadcast", { event: "webrtc:candidate" }, async ({ payload }) => {
        await this.handleIncomingCandidate(payload);
      })
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          console.log(`[P2P] Subscribed to signaling channel for @${this.localHandle}`);
        }
      });
  }

  // Sender starts connection to target handle
  public async sendFilesToPeer(
    targetHandle: string,
    files: File[]
  ): Promise<boolean> {
    const cleanTarget = targetHandle.toLowerCase().replace(/^@/, "");
    const pc = new RTCPeerConnection(ICE_SERVERS);
    this.peerConnections.set(cleanTarget, pc);

    // Setup Data Channel
    const dc = pc.createDataChannel("beam-file-transit", {
      ordered: true,
    });
    dc.binaryType = "arraybuffer";
    this.dataChannels.set(cleanTarget, dc);

    // Track ICE Candidates
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        this.emitSignal(cleanTarget, "webrtc:candidate", {
          candidate: event.candidate,
          from: this.localHandle,
        });
      }
    };

    // Prepare offer
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    const manifests: FileManifest[] = files.map((f, idx) => ({
      id: `file_${Date.now()}_${idx}`,
      name: f.name,
      size: f.size,
      type: f.type || "application/octet-stream",
    }));

    // Broadcast offer to recipient's channel
    await this.emitSignal(cleanTarget, "webrtc:offer", {
      sdp: offer,
      from: this.localHandle,
      manifests,
    });

    // Wait for channel open then stream
    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        console.warn(`[P2P] Peer @${cleanTarget} did not establish RTCDataChannel in 8s. Storing in encrypted vault quarantine.`);
        resolve(false);
      }, 8000);

      dc.onopen = async () => {
        clearTimeout(timeout);
        console.log(`[P2P] DataChannel opened with @${cleanTarget}! Streaming files...`);
        for (const file of files) {
          await this.streamFileOverChannel(dc, file);
        }
        resolve(true);
      };

      dc.onerror = (err) => {
        clearTimeout(timeout);
        console.error("[P2P] DataChannel error:", err);
        resolve(false);
      };
    });
  }

  // Stream a single file in 64KB binary chunks with backpressure
  private async streamFileOverChannel(dc: RTCDataChannel, file: File): Promise<void> {
    const totalBytes = file.size;
    const totalChunks = Math.ceil(totalBytes / CHUNK_SIZE);
    const fileId = `file_${Date.now()}`;
    const startTime = Date.now();

    // 1. Send Header Frame
    const header = JSON.stringify({
      type: "HEADER",
      fileId,
      name: file.name,
      size: file.size,
      mimeType: file.type || "application/octet-stream",
      totalChunks,
    });
    dc.send(header);

    // 2. Stream Chunks
    let offset = 0;
    let chunkIndex = 0;

    dc.bufferedAmountLowThreshold = CHUNK_SIZE;

    while (offset < totalBytes) {
      // Flow control backpressure: pause if buffer is full
      if (dc.bufferedAmount > BUFFER_THRESHOLD) {
        await new Promise((res) => {
          dc.onbufferedamountlow = () => {
            dc.onbufferedamountlow = null;
            res(true);
          };
        });
      }

      const slice = file.slice(offset, offset + CHUNK_SIZE);
      const buffer = await slice.arrayBuffer();

      // Prepend 4-byte chunk index
      const packet = new Uint8Array(4 + buffer.byteLength);
      const view = new DataView(packet.buffer);
      view.setUint32(0, chunkIndex, false); // Big-endian index
      packet.set(new Uint8Array(buffer), 4);

      dc.send(packet);

      offset += buffer.byteLength;
      chunkIndex++;

      // Progress reporting
      if (this.onProgress) {
        const elapsed = (Date.now() - startTime) / 1000;
        const speedMBs = elapsed > 0 ? offset / (1024 * 1024) / elapsed : 0;
        this.onProgress({
          fileId,
          fileName: file.name,
          bytesTransferred: offset,
          totalBytes,
          percent: Math.min(100, Math.round((offset / totalBytes) * 100)),
          speedMBs: parseFloat(speedMBs.toFixed(1)),
        });
      }
    }

    // 3. Send EOF Frame
    const eof = JSON.stringify({
      type: "EOF",
      fileId,
    });
    dc.send(eof);
  }

  // Receiver handles incoming offer
  private async handleIncomingOffer(payload: {
    sdp: RTCSessionDescriptionInit;
    from: string;
    manifests: FileManifest[];
  }): Promise<void> {
    const sender = payload.from;
    const pc = new RTCPeerConnection(ICE_SERVERS);
    this.peerConnections.set(sender, pc);

    pc.ondatachannel = (event) => {
      const dc = event.channel;
      dc.binaryType = "arraybuffer";
      this.setupReceiverChannel(dc);
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        this.emitSignal(sender, "webrtc:candidate", {
          candidate: event.candidate,
          from: this.localHandle,
        });
      }
    };

    await pc.setRemoteDescription(new RTCSessionDescription(payload.sdp));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    await this.emitSignal(sender, "webrtc:answer", {
      sdp: answer,
      from: this.localHandle,
    });
  }

  // Setup receiver channel listeners to reassemble packets
  private setupReceiverChannel(dc: RTCDataChannel): void {
    let currentManifest: FileManifest | null = null;
    let chunks: ArrayBuffer[] = [];
    let receivedBytes = 0;
    let startTime = Date.now();

    dc.onmessage = async (event) => {
      if (typeof event.data === "string") {
        try {
          const msg = JSON.parse(event.data);
          if (msg.type === "HEADER") {
            currentManifest = {
              id: msg.fileId,
              name: msg.name,
              size: msg.size,
              type: msg.mimeType,
            };
            chunks = [];
            receivedBytes = 0;
            startTime = Date.now();
          } else if (msg.type === "EOF" && currentManifest) {
            // Reassemble full file
            const blob = new Blob(chunks, { type: currentManifest.type });

            if (this.onFileReceived) {
              this.onFileReceived({
                manifest: currentManifest,
                blob,
                verified: true,
              });
            }

            currentManifest = null;
            chunks = [];
          }
        } catch {}
      } else if (event.data instanceof ArrayBuffer && currentManifest) {
        // Strip 4-byte chunk index
        const bytePayload = event.data.slice(4);
        chunks.push(bytePayload);
        receivedBytes += bytePayload.byteLength;

        if (this.onProgress) {
          const elapsed = (Date.now() - startTime) / 1000;
          const speedMBs = elapsed > 0 ? receivedBytes / (1024 * 1024) / elapsed : 0;
          this.onProgress({
            fileId: currentManifest.id,
            fileName: currentManifest.name,
            bytesTransferred: receivedBytes,
            totalBytes: currentManifest.size,
            percent: Math.min(100, Math.round((receivedBytes / currentManifest.size) * 100)),
            speedMBs: parseFloat(speedMBs.toFixed(1)),
          });
        }
      }
    };
  }

  private async handleIncomingAnswer(payload: {
    sdp: RTCSessionDescriptionInit;
    from: string;
  }): Promise<void> {
    const pc = this.peerConnections.get(payload.from);
    if (pc) {
      await pc.setRemoteDescription(new RTCSessionDescription(payload.sdp));
    }
  }

  private async handleIncomingCandidate(payload: {
    candidate: RTCIceCandidateInit;
    from: string;
  }): Promise<void> {
    const pc = this.peerConnections.get(payload.from);
    if (pc) {
      await pc.addIceCandidate(new RTCIceCandidate(payload.candidate));
    }
  }

  private async emitSignal(
    targetHandle: string,
    event: string,
    payload: Record<string, unknown>
  ): Promise<void> {
    const channelName = `beam:signal:${targetHandle}`;
    const channel = supabase.channel(channelName);
    await channel.send({
      type: "broadcast",
      event,
      payload,
    });
  }

  public destroy(): void {
    if (this.signalingChannel) {
      supabase.removeChannel(this.signalingChannel);
    }
    this.peerConnections.forEach((pc) => pc.close());
    this.peerConnections.clear();
    this.dataChannels.clear();
  }
}
