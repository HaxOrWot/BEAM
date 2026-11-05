// PROTO/TCP Node Identity & Authentication Core

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  authProvider: "google" | "github" | "enclave" | "anonymous";
  callsign: string;
  publicKeyHex: string;
  createdAt: number;
}

const STORAGE_KEY = "proto_tcp_active_identity";

// Deterministic callsign generator
export function generateCallsign(seed?: string): string {
  const hash = seed
    ? Math.abs(seed.split("").reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0))
    : Math.floor(Math.random() * 0xffffff);
  return `NODE_0x${hash.toString(16).toUpperCase().padStart(4, "0").slice(-4)}`;
}

// Generates an Ed25519-style hex public fingerprint
export function generatePublicKeyHex(seed?: string): string {
  const hexChars = "0123456789abcdef";
  let result = "proto_pk_live_";
  for (let i = 0; i < 64; i++) {
    result += hexChars[Math.floor(Math.random() * hexChars.length)];
  }
  return result;
}

// Normalizes usernames to lowercase alphanumerics with hyphens
export function normalizeUsername(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/^@+/, "")
    .replace(/[^a-z0-9_-]/g, "");
}

// Retrieves current user profile from localStorage or creates an initial anonymous identity
export function getStoredIdentity(): UserProfile {
  if (typeof window === "undefined") {
    return createAnonymousIdentity();
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.username) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Failed to load stored identity, creating fallback:", e);
  }

  const fallback = createAnonymousIdentity();
  saveIdentity(fallback);
  return fallback;
}

export function saveIdentity(profile: UserProfile): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error("Failed to save identity to localStorage:", e);
  }
}

export function createAnonymousIdentity(customUsername?: string): UserProfile {
  const randNum = Math.floor(1000 + Math.random() * 9000);
  const username = customUsername ? normalizeUsername(customUsername) : `operator-${randNum}`;
  const callsign = generateCallsign(username);
  const publicKeyHex = generatePublicKeyHex(username);

  return {
    id: `usr_${Date.now()}_${randNum}`,
    username,
    email: `${username}@mesh.proto`,
    displayName: username.toUpperCase(),
    authProvider: "anonymous",
    callsign,
    publicKeyHex,
    createdAt: Date.now(),
  };
}

export function createSocialIdentity(
  provider: "google" | "github",
  email: string,
  name: string,
  avatar?: string
): UserProfile {
  const baseUsername = normalizeUsername(email.split("@")[0] || name);
  const callsign = generateCallsign(email);
  const publicKeyHex = generatePublicKeyHex(email);

  return {
    id: `${provider}_${Date.now()}`,
    username: baseUsername,
    email,
    displayName: name,
    avatarUrl: avatar,
    authProvider: provider,
    callsign,
    publicKeyHex,
    createdAt: Date.now(),
  };
}
