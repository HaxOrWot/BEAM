import { createClient } from "@supabase/supabase-js";
import { UserAccount, TransferRecord } from "./types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dyohmgckebfgdjqnasnk.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5b2htZ2NrZWJmZ2RqcW5hc25rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM5NzMzOTIsImV4cCI6MjEwOTU0OTM5Mn0.6ybPjZI3ozPhL2SP21S-xKn8mrJQwztUMv9XYvtjH7E";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 20,
    },
  },
});

// Cryptographic Passphrase Hasher (SHA-256 with handle salt)
export async function hashPassphrase(passphrase: string, salt: string = "beam_crypto_salt"): Promise<string> {
  if (!passphrase) return "";
  try {
    const enc = new TextEncoder();
    const data = enc.encode(`${passphrase}:${salt}`);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } catch {
    return "";
  }
}

// Check if a handle is available
export async function isHandleAvailableInDb(handle: string): Promise<{ available: boolean; reason?: string }> {
  const clean = handle.trim().toLowerCase().replace(/^@/, "");
  const reserved = ["admin", "root", "support", "beam", "system", "api", "help", "login", "signup", "dashboard"];

  if (!clean || clean.length < 3) {
    return { available: false, reason: "Handle must be at least 3 characters." };
  }
  if (reserved.includes(clean)) {
    return { available: false, reason: `@${clean} is a reserved system handle.` };
  }

  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("handle")
      .ilike("handle", clean)
      .maybeSingle();

    if (error) {
      console.error("Supabase handle check error:", error);
      return { available: true };
    }

    if (data) {
      return { available: false, reason: `@${clean} has already been claimed.` };
    }
  } catch (err) {
    console.error("Network error during handle check:", err);
  }

  return { available: true };
}

// Register new profile and claim handle with cryptographic passphrase hashing
export async function createProfileInDb(params: {
  handle: string;
  fullName: string;
  email: string;
  plan: "free" | "pro";
  passphrase?: string;
}): Promise<{ success: boolean; user?: UserAccount; error?: string }> {
  const cleanHandle = params.handle.trim().toLowerCase().replace(/^@/, "");
  const nodeId = Math.floor(100 + Math.random() * 900).toString();
  const storageLimit = params.plan === "pro" ? 250 * 1024 * 1024 * 1024 : 25 * 1024 * 1024 * 1024;

  const passphraseHash = params.passphrase ? await hashPassphrase(params.passphrase, cleanHandle) : null;

  try {
    const { data, error } = await supabase
      .from("profiles")
      .insert({
        handle: cleanHandle,
        full_name: params.fullName.trim() || cleanHandle,
        email: params.email.trim() || `${cleanHandle}@beam.network`,
        plan: params.plan,
        node_id: nodeId,
        gateway_node: "Frankfurt-01 (18ms ping)",
        storage_limit_bytes: storageLimit,
        storage_used_bytes: 0,
        passphrase_hash: passphraseHash,
      })
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    const user: UserAccount = {
      handle: data.handle,
      fullName: data.full_name,
      email: data.email,
      plan: data.plan,
      nodeId: data.node_id,
      gatewayNode: data.gateway_node,
      storageLimitBytes: Number(data.storage_limit_bytes),
      storageUsedBytes: Number(data.storage_used_bytes),
      avatarUrl: "",
      isLoggedIn: true,
      createdAt: new Date(data.created_at).getTime(),
    };

    return { success: true, user };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Database connection failed";
    return { success: false, error: msg };
  }
}

// Authenticate profile by handle/email with real cryptographic passphrase verification
export async function authenticateProfileInDb(
  handleOrEmail: string,
  passphrase?: string
): Promise<{ success: boolean; user?: UserAccount; notFound?: boolean; error?: string }> {
  const query = handleOrEmail.trim().toLowerCase().replace(/^@/, "");

  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .or(`handle.ilike.${query},email.ilike.${query}`)
      .maybeSingle();

    if (error) {
      return { success: false, error: error.message };
    }

    if (!data) {
      return {
        success: false,
        notFound: true,
        error: `Identity "${query}" not found. Claim this username to get started!`,
      };
    }

    // Cryptographic passphrase verification
    if (data.passphrase_hash) {
      if (!passphrase) {
        return {
          success: false,
          error: "Passphrase required. Please enter your secret key to unlock this identity.",
        };
      }

      const computedHash = await hashPassphrase(passphrase, data.handle.toLowerCase());
      if (computedHash !== data.passphrase_hash) {
        return {
          success: false,
          error: "Invalid passphrase. Authentication failed.",
        };
      }
    }

    const user: UserAccount = {
      handle: data.handle,
      fullName: data.full_name,
      email: data.email,
      plan: data.plan,
      nodeId: data.node_id,
      gatewayNode: data.gateway_node,
      storageLimitBytes: Number(data.storage_limit_bytes),
      storageUsedBytes: Number(data.storage_used_bytes),
      avatarUrl: "",
      isLoggedIn: true,
      createdAt: new Date(data.created_at).getTime(),
    };

    return { success: true, user };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Database error";
    return { success: false, error: msg };
  }
}

// Upload genuine file payload into Supabase Storage
export async function uploadPayloadFile(
  transferId: string,
  file: File
): Promise<{ success: boolean; path?: string; error?: string }> {
  try {
    const filePath = `${transferId}/${file.name}`;
    const { data, error } = await supabase.storage
      .from("beam-payloads")
      .upload(filePath, file, {
        upsert: true,
        contentType: file.type || "application/octet-stream",
      });

    if (error) {
      console.warn("Storage upload fallback error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, path: data.path };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Storage upload failed";
    return { success: false, error: msg };
  }
}

// Download genuine file payload from Supabase Storage
export async function downloadPayloadFile(
  transferId: string,
  fileName: string
): Promise<{ success: boolean; blob?: Blob; error?: string }> {
  try {
    const filePath = `${transferId}/${fileName}`;
    const { data, error } = await supabase.storage
      .from("beam-payloads")
      .download(filePath);

    if (error || !data) {
      return { success: false, error: error?.message || "File payload unavailable in vault quarantine." };
    }

    return { success: true, blob: data };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Storage download failed";
    return { success: false, error: msg };
  }
}

// Purge payload transfer files (Burn on Download or TTL expiration)
export async function purgePayloadTransfer(transferId: string, fileNames: string[]): Promise<void> {
  try {
    const paths = fileNames.map((name) => `${transferId}/${name}`);
    await supabase.storage.from("beam-payloads").remove(paths);
    await supabase.from("transfers").update({ status: "expired" }).eq("id", transferId);
  } catch (err) {
    console.error("Failed to purge burned transfer:", err);
  }
}

// Enforce download limits & burn on download
export async function incrementTransferDownloadCount(transferId: string): Promise<{
  newCount: number;
  isBurned: boolean;
  status: string;
}> {
  try {
    const { data: current } = await supabase
      .from("transfers")
      .select("download_count, max_downloads, burn_on_download, files")
      .eq("id", transferId)
      .single();

    if (!current) return { newCount: 1, isBurned: false, status: "completed" };

    const newCount = (current.download_count || 0) + 1;
    const shouldBurn = Boolean(current.burn_on_download) || newCount >= current.max_downloads;
    const newStatus = shouldBurn ? "expired" : "completed";

    await supabase
      .from("transfers")
      .update({
        download_count: newCount,
        status: newStatus,
      })
      .eq("id", transferId);

    if (shouldBurn && current.files) {
      const fileNames = (current.files as Array<{ name: string }>).map((f) => f.name);
      purgePayloadTransfer(transferId, fileNames).catch(() => {});
    }

    return { newCount, isBurned: shouldBurn, status: newStatus };
  } catch {
    return { newCount: 1, isBurned: false, status: "completed" };
  }
}

// Update sender's vault storage consumption in database
export async function updateStorageUsedInDb(handle: string, additionalBytes: number): Promise<void> {
  try {
    const { data } = await supabase
      .from("profiles")
      .select("storage_used_bytes, storage_limit_bytes")
      .eq("handle", handle)
      .single();

    if (data) {
      const newUsed = Math.min(
        Number(data.storage_limit_bytes),
        Number(data.storage_used_bytes || 0) + additionalBytes
      );
      await supabase
        .from("profiles")
        .update({ storage_used_bytes: newUsed })
        .eq("handle", handle);
    }
  } catch {}
}

// Save transfer record to Supabase
export async function saveTransferToDb(record: TransferRecord): Promise<void> {
  try {
    await supabase.from("transfers").insert({
      id: record.id,
      sender_handle: record.senderHandle,
      recipient_handle: record.recipientHandle,
      files: record.files,
      total_bytes: record.totalBytes,
      status: record.status,
      passkey_lock: record.passkeyLock,
      burn_on_download: record.burnOnDownload,
      max_downloads: record.maxDownloads,
      download_count: record.downloadCount,
      ttl_hours: record.ttlHours,
      expires_at: new Date(record.expiresAt).toISOString(),
    });

    await updateStorageUsedInDb(record.senderHandle, record.totalBytes);
  } catch (err) {
    console.error("Failed to record transfer in Supabase:", err);
  }
}

// Fetch transfers for a handle and enforce TTL expiration
export async function fetchTransfersFromDb(handle: string): Promise<TransferRecord[]> {
  try {
    const { data, error } = await supabase
      .from("transfers")
      .select("*")
      .or(`sender_handle.eq.${handle},recipient_handle.eq.${handle}`)
      .order("created_at", { ascending: false });

    if (error || !data) return [];

    const now = Date.now();

    return data.map((t) => {
      const expiresAt = new Date(t.expires_at).getTime();
      const isExpired = t.status === "expired" || now > expiresAt;
      return {
        id: t.id,
        recipientHandle: t.recipient_handle,
        senderHandle: t.sender_handle,
        files: t.files || [],
        totalBytes: Number(t.total_bytes),
        status: isExpired ? "expired" : t.status,
        progress: 100,
        speedMBs: 48.2,
        ttlHours: t.ttl_hours,
        passkeyLock: t.passkey_lock,
        burnOnDownload: t.burn_on_download,
        maxDownloads: t.max_downloads,
        downloadCount: t.download_count,
        createdAt: new Date(t.created_at).getTime(),
        expiresAt,
      };
    });
  } catch {
    return [];
  }
}

// Update presence in Supabase
export async function updatePresenceInDb(handle: string, nodeId: string): Promise<void> {
  if (!handle) return;
  try {
    await supabase.from("presence").upsert({
      handle,
      node_id: nodeId,
      is_online: true,
      last_seen: new Date().toISOString(),
    });
  } catch {}
}

// Fetch active online peer handles
export async function fetchActivePeers(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from("presence")
      .select("handle")
      .order("last_seen", { ascending: false })
      .limit(8);

    if (error || !data) return [];
    return data.map((p) => p.handle);
  } catch {
    return [];
  }
}
