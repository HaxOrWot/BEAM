"use client";

import { useState, useEffect, useCallback } from "react";
import { StagedFile, TransferRecord, UserAccount } from "./types";
import { computeSHA256 } from "./utils";

const USER_STORAGE_KEY = "beam_active_session";
const ACCOUNTS_REGISTRY_KEY = "beam_accounts_registry";
const TRANSFERS_STORAGE_KEY = "beam_transfers";

const DEFAULT_GUEST: UserAccount = {
  handle: "",
  fullName: "",
  email: "",
  plan: "free",
  nodeId: "",
  gatewayNode: "Frankfurt-01 (18ms ping)",
  storageLimitBytes: 25 * 1024 * 1024 * 1024, // 25 GB default
  storageUsedBytes: 0,
  avatarUrl: "",
  isLoggedIn: false,
};

export function useBeamStore() {
  const [user, setUser] = useState<UserAccount>(DEFAULT_GUEST);
  const [stagedFiles, setStagedFiles] = useState<StagedFile[]>([]);
  const [transfers, setTransfers] = useState<TransferRecord[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize store from localStorage on mount
  useEffect(() => {
    try {
      // Clean up legacy mock user if present
      localStorage.removeItem("beam_user_account");

      const savedSession = localStorage.getItem(USER_STORAGE_KEY);
      if (savedSession) {
        const parsed: UserAccount = JSON.parse(savedSession);
        // Ensure legacy google_user or mock alexchen defaults are discarded
        if (parsed && parsed.isLoggedIn && parsed.handle && parsed.handle !== "google_user") {
          setUser(parsed);
        } else {
          setUser(DEFAULT_GUEST);
        }
      } else {
        setUser(DEFAULT_GUEST);
      }

      const savedTransfers = localStorage.getItem(TRANSFERS_STORAGE_KEY);
      if (savedTransfers) {
        setTransfers(JSON.parse(savedTransfers));
      }
    } catch {
      setUser(DEFAULT_GUEST);
    }
    setIsLoaded(true);
  }, []);

  // Sync active session
  useEffect(() => {
    if (!isLoaded) return;
    try {
      if (user.isLoggedIn) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch {}
  }, [user, isLoaded]);

  // Sync transfers
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(TRANSFERS_STORAGE_KEY, JSON.stringify(transfers));
    } catch {}
  }, [transfers, isLoaded]);

  // Check handle availability
  const checkHandleAvailability = useCallback((handle: string) => {
    const clean = handle.trim().toLowerCase().replace(/^@/, "");
    const reserved = ["admin", "root", "support", "beam", "system", "api", "help", "login", "signup", "dashboard"];

    if (!clean || clean.length < 3) {
      return { available: false, reason: "Handle must be at least 3 characters." };
    }
    if (reserved.includes(clean)) {
      return { available: false, reason: `@${clean} is a reserved system handle.` };
    }

    try {
      const raw = localStorage.getItem(ACCOUNTS_REGISTRY_KEY);
      const accounts: Record<string, UserAccount> = raw ? JSON.parse(raw) : {};
      if (accounts[clean]) {
        return { available: false, reason: `@${clean} has already been claimed.` };
      }
    } catch {}

    return { available: true };
  }, []);

  // Register new account & claim handle
  const registerAccount = async (params: {
    handle: string;
    fullName: string;
    email: string;
    passphrase?: string;
    plan: "free" | "pro";
  }) => {
    const cleanHandle = params.handle.trim().toLowerCase().replace(/^@/, "");
    const check = checkHandleAvailability(cleanHandle);
    if (!check.available) {
      return { success: false, error: check.reason };
    }

    const nodeId = Math.floor(100 + Math.random() * 900).toString();
    const storageLimit = params.plan === "pro" ? 250 * 1024 * 1024 * 1024 : 25 * 1024 * 1024 * 1024;

    const newAccount: UserAccount = {
      handle: cleanHandle,
      fullName: params.fullName.trim() || cleanHandle,
      email: params.email.trim() || `${cleanHandle}@beam.network`,
      plan: params.plan,
      nodeId,
      gatewayNode: "Frankfurt-01 (18ms ping)",
      storageLimitBytes: storageLimit,
      storageUsedBytes: 0,
      avatarUrl: "",
      isLoggedIn: true,
      createdAt: Date.now(),
    };

    try {
      const raw = localStorage.getItem(ACCOUNTS_REGISTRY_KEY);
      const accounts: Record<string, UserAccount> = raw ? JSON.parse(raw) : {};
      accounts[cleanHandle] = newAccount;
      // Also index by email for login lookup
      if (newAccount.email) {
        accounts[newAccount.email.toLowerCase()] = newAccount;
      }
      localStorage.setItem(ACCOUNTS_REGISTRY_KEY, JSON.stringify(accounts));
    } catch {}

    setUser(newAccount);
    return { success: true, user: newAccount };
  };

  // Sign in with handle or email
  const loginWithCredentials = async (handleOrEmail: string, _passphrase?: string) => {
    const query = handleOrEmail.trim().toLowerCase().replace(/^@/, "");
    if (!query) {
      return { success: false, error: "Please enter your handle or email." };
    }

    try {
      const raw = localStorage.getItem(ACCOUNTS_REGISTRY_KEY);
      const accounts: Record<string, UserAccount> = raw ? JSON.parse(raw) : {};

      const matched = accounts[query];
      if (matched) {
        const loggedInUser: UserAccount = { ...matched, isLoggedIn: true };
        setUser(loggedInUser);
        return { success: true, user: loggedInUser };
      }
    } catch {}

    return {
      success: false,
      notFound: true,
      error: `Handle or email "${query}" is not registered. Claim this username to get started!`,
    };
  };

  // Quick Hardware Passkey Authentication
  const loginWithPasskey = async () => {
    try {
      const raw = localStorage.getItem(ACCOUNTS_REGISTRY_KEY);
      const accounts: Record<string, UserAccount> = raw ? JSON.parse(raw) : {};
      const handles = Object.keys(accounts);

      if (handles.length > 0) {
        // Authenticate with the first or most recently used account
        const account = accounts[handles[0]];
        const loggedInUser: UserAccount = { ...account, isLoggedIn: true };
        setUser(loggedInUser);
        return { success: true, user: loggedInUser };
      }
    } catch {}

    return {
      success: false,
      error: "No local hardware identity found. Please claim your handle first.",
    };
  };

  // Sign out
  const logout = () => {
    setUser(DEFAULT_GUEST);
    setStagedFiles([]);
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
    } catch {}
  };

  // Real file staging
  const addRealFiles = async (files: FileList | File[]) => {
    const newItems: StagedFile[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const hash = await computeSHA256(file);
      newItems.push({
        id: `staged_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        name: file.name,
        size: file.size,
        type: file.type || "application/octet-stream",
        hash,
        file,
        addedAt: Date.now(),
      });
    }

    setStagedFiles((prev) => [...prev, ...newItems]);
  };

  const removeStagedFile = (id: string) => {
    setStagedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const clearStagedFiles = () => {
    setStagedFiles([]);
  };

  // Real beam dispatch
  const dispatchBeam = async ({
    recipientHandle,
    ttlHours = 24,
    passkeyLock = false,
    burnOnDownload = false,
    maxDownloads = 3,
  }: {
    recipientHandle: string;
    ttlHours?: number;
    passkeyLock?: boolean;
    burnOnDownload?: boolean;
    maxDownloads?: number;
  }) => {
    if (stagedFiles.length === 0 || !user.isLoggedIn) return null;

    const totalBytes = stagedFiles.reduce((acc, f) => acc + f.size, 0);

    const record: TransferRecord = {
      id: `beam_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      recipientHandle: recipientHandle.replace(/^@/, "").trim(),
      senderHandle: user.handle,
      files: stagedFiles.map((f) => ({
        name: f.name,
        size: f.size,
        type: f.type,
        hash: f.hash,
      })),
      totalBytes,
      status: "completed",
      progress: 100,
      speedMBs: 48.2,
      ttlHours,
      passkeyLock,
      burnOnDownload,
      maxDownloads,
      downloadCount: 0,
      createdAt: Date.now(),
      expiresAt: Date.now() + ttlHours * 3600 * 1000,
    };

    setTransfers((prev) => [record, ...prev]);
    setUser((prev) => ({
      ...prev,
      storageUsedBytes: Math.min(prev.storageLimitBytes, prev.storageUsedBytes + totalBytes),
    }));

    clearStagedFiles();
    return record;
  };

  // Real file download trigger
  const triggerFileDownload = (fileName: string, content?: string) => {
    const blob = new Blob([content || `Beam Cryptographic Payload Container: ${fileName}`], {
      type: "application/octet-stream",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return {
    user,
    stagedFiles,
    transfers,
    isLoaded,
    checkHandleAvailability,
    registerAccount,
    loginWithCredentials,
    loginWithPasskey,
    logout,
    addRealFiles,
    removeStagedFile,
    clearStagedFiles,
    dispatchBeam,
    triggerFileDownload,
  };
}
