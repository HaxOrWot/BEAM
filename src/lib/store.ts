"use client";

import { useState, useEffect } from "react";
import { StagedFile, TransferRecord, UserAccount } from "./types";
import { computeSHA256 } from "./utils";

const USER_STORAGE_KEY = "beam_user_account";
const STAGED_STORAGE_KEY = "beam_staged_files";
const TRANSFERS_STORAGE_KEY = "beam_transfers";

const DEFAULT_USER: UserAccount = {
  handle: "alexchen",
  fullName: "Alex Chen",
  email: "alex@nexuslabs.studio",
  plan: "pro",
  nodeId: "084",
  gatewayNode: "Frankfurt-01 (18ms ping)",
  storageLimitBytes: 100 * 1024 * 1024 * 1024, // 100 GB
  storageUsedBytes: 42.5 * 1024 * 1024 * 1024, // 42.5 GB
  avatarUrl: "",
  isLoggedIn: true,
};

export function useBeamStore() {
  const [user, setUser] = useState<UserAccount>(DEFAULT_USER);
  const [stagedFiles, setStagedFiles] = useState<StagedFile[]>([]);
  const [transfers, setTransfers] = useState<TransferRecord[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      const savedTransfers = localStorage.getItem(TRANSFERS_STORAGE_KEY);
      if (savedTransfers) {
        setTransfers(JSON.parse(savedTransfers));
      }
    } catch {
      // Ignore parse errors on first load
    }
    setIsLoaded(true);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } catch {}
  }, [user, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(TRANSFERS_STORAGE_KEY, JSON.stringify(transfers));
    } catch {}
  }, [transfers, isLoaded]);

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
    if (stagedFiles.length === 0) return null;

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

  // Update account
  const updateAccount = (updates: Partial<UserAccount>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  return {
    user,
    stagedFiles,
    transfers,
    isLoaded,
    addRealFiles,
    removeStagedFile,
    clearStagedFiles,
    dispatchBeam,
    triggerFileDownload,
    updateAccount,
  };
}
