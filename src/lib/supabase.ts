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
      return { available: true }; // Fallback to optimistic
    }

    if (data) {
      return { available: false, reason: `@${clean} has already been claimed.` };
    }
  } catch (err) {
    console.error("Network error during handle check:", err);
  }

  return { available: true };
}

// Register new profile and claim handle
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

// Authenticate profile by handle or email
export async function authenticateProfileInDb(
  handleOrEmail: string
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
  } catch (err) {
    console.error("Failed to record transfer in Supabase:", err);
  }
}

// Fetch transfers for a handle
export async function fetchTransfersFromDb(handle: string): Promise<TransferRecord[]> {
  try {
    const { data, error } = await supabase
      .from("transfers")
      .select("*")
      .or(`sender_handle.eq.${handle},recipient_handle.eq.${handle}`)
      .order("created_at", { ascending: false });

    if (error || !data) return [];

    return data.map((t) => ({
      id: t.id,
      recipientHandle: t.recipient_handle,
      senderHandle: t.sender_handle,
      files: t.files || [],
      totalBytes: Number(t.total_bytes),
      status: t.status,
      progress: 100,
      speedMBs: 48.2,
      ttlHours: t.ttl_hours,
      passkeyLock: t.passkey_lock,
      burnOnDownload: t.burn_on_download,
      maxDownloads: t.max_downloads,
      downloadCount: t.download_count,
      createdAt: new Date(t.created_at).getTime(),
      expiresAt: new Date(t.expires_at).getTime(),
    }));
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
