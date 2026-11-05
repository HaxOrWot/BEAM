import { SocketStream, PeerNode, FileTransfer, KeyRecord, SystemMetric } from "./types";

export const DASHBOARD_METRICS: SystemMetric[] = [
  { label: "AGGREGATE THROUGHPUT", value: "9.84", unit: "Gbps", delta: "+0.14 Gbps", positive: true },
  { label: "KERNEL RTT LATENCY", value: "0.14", unit: "ms", delta: "-0.02 ms", positive: true },
  { label: "DMA PACKET RATE", value: "842.1", unit: "kpps", delta: "Nominal", positive: true },
  { label: "CHECKSUM CRC ERRORS", value: "0.000", unit: "%", delta: "0 Drops", positive: true },
];

export const MOCK_SOCKETS: SocketStream[] = [
  {
    id: "sock-9921",
    localPort: 9293,
    remoteEndpoint: "198.51.100.24:44321",
    state: "ESTABLISHED",
    rtt: 0.12,
    throughput: "4.82 Gbps",
    cipher: "TLS_AES_256_GCM_SHA384",
  },
  {
    id: "sock-9922",
    localPort: 9294,
    remoteEndpoint: "203.0.113.88:51200",
    state: "ESTABLISHED",
    rtt: 0.18,
    throughput: "3.91 Gbps",
    cipher: "CHACHA20_POLY1305_SHA256",
  },
  {
    id: "sock-9923",
    localPort: 9295,
    remoteEndpoint: "192.0.2.14:38902",
    state: "SYN_SENT",
    rtt: 0.29,
    throughput: "1.11 Gbps",
    cipher: "ECDHE_ED25519",
  },
  {
    id: "sock-9924",
    localPort: 9290,
    remoteEndpoint: "0.0.0.0:0",
    state: "LISTEN",
    rtt: 0.0,
    throughput: "0.00 Gbps",
    cipher: "TLS_AES_256_GCM_SHA384",
  },
];

export const MOCK_PEERS: PeerNode[] = [
  {
    id: "peer-node-alpha",
    alias: "mesh-us-east-core1",
    endpoint: "198.51.100.24",
    status: "ONLINE",
    latency: 0.12,
    uploadSpeed: "4.82 Gbps",
    downloadSpeed: "4.91 Gbps",
    protocol: "PROTO/TCP v1.4",
  },
  {
    id: "peer-node-beta",
    alias: "mesh-eu-central-edge",
    endpoint: "203.0.113.88",
    status: "ONLINE",
    latency: 0.18,
    uploadSpeed: "3.91 Gbps",
    downloadSpeed: "3.85 Gbps",
    protocol: "PROTO/TCP v1.4",
  },
  {
    id: "peer-node-gamma",
    alias: "mesh-ap-northeast-gw",
    endpoint: "192.0.2.14",
    status: "SYNCING",
    latency: 0.29,
    uploadSpeed: "1.11 Gbps",
    downloadSpeed: "980 Mbps",
    protocol: "PROTO/TCP v1.3",
  },
  {
    id: "peer-node-delta",
    alias: "mesh-local-relay-dock",
    endpoint: "127.0.0.1",
    status: "ONLINE",
    latency: 0.02,
    uploadSpeed: "10.0 Gbps",
    downloadSpeed: "10.0 Gbps",
    protocol: "PROTO/TCP v1.4 (IPC)",
  },
];

export const MOCK_TRANSFERS: FileTransfer[] = [
  {
    id: "xfer-01",
    fileName: "kernel-image-v6.12-x86_64.raw",
    fileSize: "8.42 GB",
    progress: 74,
    speed: "4.21 Gbps",
    peerAlias: "mesh-us-east-core1",
    status: "TRANSFERRING",
    chunksTotal: 256,
    chunksCompleted: 189,
  },
  {
    id: "xfer-02",
    fileName: "encrypted-e2ee-vault-shard.tar.zst",
    fileSize: "32.10 GB",
    progress: 42,
    speed: "3.88 Gbps",
    peerAlias: "mesh-eu-central-edge",
    status: "TRANSFERRING",
    chunksTotal: 1024,
    chunksCompleted: 430,
  },
  {
    id: "xfer-03",
    fileName: "telemetry-matrix-dump-20261106.bin",
    fileSize: "1.18 GB",
    progress: 100,
    speed: "0.00 Gbps",
    peerAlias: "mesh-local-relay-dock",
    status: "COMPLETED",
    chunksTotal: 64,
    chunksCompleted: 64,
  },
];

export const MOCK_KEYS: KeyRecord[] = [
  {
    id: "key-ed-01",
    label: "Local Mesh Master Ingress Key",
    algorithm: "Ed25519",
    fingerprint: "SHA256:7f9a2b8e4c1d0f3a5b6c8d9e0a1b2c3d4e5f6a7b",
    createdDate: "2026-11-05 18:00 UTC",
    status: "ACTIVE",
  },
  {
    id: "key-fido-02",
    label: "YubiKey 5 NFC Hardware Key",
    algorithm: "FIDO2",
    fingerprint: "FIDO2:a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0",
    createdDate: "2026-11-04 12:30 UTC",
    status: "ACTIVE",
  },
  {
    id: "key-curve-03",
    label: "Ephemeral Curve25519 Peer Exchange",
    algorithm: "Curve25519",
    fingerprint: "SHA256:3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e",
    createdDate: "2026-11-05 21:15 UTC",
    status: "ACTIVE",
  },
];
