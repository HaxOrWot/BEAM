import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(bytes: number, decimals: number = 1): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export async function computeSHA256(file: File | Blob): Promise<string> {
  try {
    const buffer = await file.arrayBuffer();
    const digest = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(digest));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  } catch (err) {
    console.error("SHA-256 calculation failed:", err);
    return "";
  }
}

export function formatShortHash(hash: string): string {
  if (!hash) return "sha256:pending";
  if (hash.startsWith("sha256-")) return hash; // backwards compatibility
  const clean = hash.replace(/^sha256:/, "");
  if (clean.length < 16) return `sha256:${clean}`;
  return `sha256:${clean.slice(0, 8)}...${clean.slice(-6)}`;
}

export async function verifyFileIntegrity(blob: Blob, expectedHash: string): Promise<boolean> {
  if (!expectedHash) return true;
  const computed = await computeSHA256(blob);
  const cleanExpected = expectedHash.replace(/^sha256:/, "");
  // If legacy shortened hash, check prefix/suffix
  if (cleanExpected.includes("...")) {
    const parts = cleanExpected.replace(/^sha256-/, "").split("...");
    return computed.startsWith(parts[0]) && computed.endsWith(parts[1]);
  }
  return computed.toLowerCase() === cleanExpected.toLowerCase();
}

export function formatTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}
