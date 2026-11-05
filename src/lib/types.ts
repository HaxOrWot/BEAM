export type SocketState = "ESTABLISHED" | "SYN_SENT" | "LISTEN" | "CLOSE_WAIT" | "TIME_WAIT";

export type CipherSuite = "TLS_AES_256_GCM_SHA384" | "CHACHA20_POLY1305_SHA256" | "ECDHE_ED25519";

export interface SocketStream {
  id: string;
  localPort: number;
  remoteEndpoint: string;
  state: SocketState;
  rtt: number;
  throughput: string;
  cipher: CipherSuite;
}

export interface PeerNode {
  id: string;
  alias: string;
  endpoint: string;
  status: "ONLINE" | "SYNCING" | "NEGOTIATING" | "OFFLINE";
  latency: number;
  uploadSpeed: string;
  downloadSpeed: string;
  protocol: string;
}

export interface FileTransfer {
  id: string;
  fileName: string;
  fileSize: string;
  progress: number;
  speed: string;
  peerAlias: string;
  status: "TRANSFERRING" | "VERIFYING" | "COMPLETED" | "PAUSED";
  chunksTotal: number;
  chunksCompleted: number;
}

export interface KeyRecord {
  id: string;
  label: string;
  algorithm: "Ed25519" | "Curve25519" | "RSA-4096" | "FIDO2";
  fingerprint: string;
  createdDate: string;
  status: "ACTIVE" | "EXPIRED" | "REVOKED";
}

export interface SystemMetric {
  label: string;
  value: string;
  unit: string;
  delta?: string;
  positive?: boolean;
}
