// In-memory signaling & peer presence store for PROTO/TCP

export interface RegisteredPeer {
  username: string;
  callsign: string;
  publicKey: string;
  authProvider: string;
  lastHeartbeat: number;
}

export interface QueuedSignal {
  id: string;
  targetUsername: string;
  senderUsername: string;
  type: "OFFER" | "ANSWER" | "ICE_CANDIDATE" | "CANCEL";
  data: any;
  timestamp: number;
}

interface GlobalStore {
  peers: Map<string, RegisteredPeer>;
  signals: QueuedSignal[];
}

declare global {
  // eslint-disable-next-line no-var
  var __PROTO_TCP_STORE__: GlobalStore | undefined;
}

if (!globalThis.__PROTO_TCP_STORE__) {
  globalThis.__PROTO_TCP_STORE__ = {
    peers: new Map<string, RegisteredPeer>(),
    signals: [],
  };
}

const store = globalThis.__PROTO_TCP_STORE__;

export function registerOrUpdatePeer(peer: Omit<RegisteredPeer, "lastHeartbeat">): void {
  const normalized = peer.username.toLowerCase();
  store.peers.set(normalized, {
    ...peer,
    username: normalized,
    lastHeartbeat: Date.now(),
  });
  pruneStalePeers();
}

export function lookupPeer(username: string): RegisteredPeer | null {
  pruneStalePeers();
  const normalized = username.toLowerCase().replace(/^@+/, "");
  return store.peers.get(normalized) || null;
}

export function listActivePeers(): RegisteredPeer[] {
  pruneStalePeers();
  return Array.from(store.peers.values());
}

export function enqueueSignal(signal: Omit<QueuedSignal, "id" | "timestamp">): void {
  const target = signal.targetUsername.toLowerCase().replace(/^@+/, "");
  const sender = signal.senderUsername.toLowerCase().replace(/^@+/, "");
  store.signals.push({
    ...signal,
    id: `sig_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    targetUsername: target,
    senderUsername: sender,
    timestamp: Date.now(),
  });
  pruneStaleSignals();
}

export function pollSignalsFor(username: string): QueuedSignal[] {
  const normalized = username.toLowerCase().replace(/^@+/, "");
  const matching = store.signals.filter((s) => s.targetUsername === normalized);
  // Remove retrieved signals
  store.signals = store.signals.filter((s) => s.targetUsername !== normalized);
  return matching;
}

// Pruning helpers
function pruneStalePeers(): void {
  const now = Date.now();
  for (const [key, peer] of store.peers.entries()) {
    if (now - peer.lastHeartbeat > 30000) {
      // 30s timeout
      store.peers.delete(key);
    }
  }
}

function pruneStaleSignals(): void {
  const now = Date.now();
  store.signals = store.signals.filter((s) => now - s.timestamp < 60000); // 60s timeout
}
