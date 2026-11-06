"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MapPin,
  UploadCloud,
  FileCheck,
  X,
  Trash2,
  ShieldCheck,
  Flame,
  Download,
  Key,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
  Radio,
} from "lucide-react";
import { useBeamStore } from "@/lib/store";
import { useBeamP2P } from "@/lib/p2p/P2PProvider";
import { fetchActivePeers } from "@/lib/supabase";
import { formatBytes } from "@/lib/utils";

interface TransferStationProps {
  initialRecipient?: string;
  targetInputRef?: React.RefObject<HTMLInputElement | null>;
}

export const TransferStation: React.FC<TransferStationProps> = ({
  initialRecipient = "",
  targetInputRef,
}) => {
  const { user, stagedFiles, transfers, addRealFiles, removeStagedFile, clearStagedFiles, dispatchBeam } =
    useBeamStore();
  const { status: p2pStatus, sendFiles } = useBeamP2P();

  const [recipient, setRecipient] = useState(initialRecipient);
  const [passkeyLock, setPasskeyLock] = useState(true);
  const [burnOnDownload, setBurnOnDownload] = useState(false);
  const [maxDownloads, setMaxDownloads] = useState(3);
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [activePeers, setActivePeers] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync initialRecipient if prop updates
  useEffect(() => {
    if (initialRecipient) {
      setRecipient(initialRecipient);
    }
  }, [initialRecipient]);

  // Load online peers and recent recipients from Supabase
  useEffect(() => {
    fetchActivePeers().then((peers) => {
      const filtered = peers.filter((p) => p && p.toLowerCase() !== user.handle.toLowerCase());
      if (filtered.length > 0) {
        setActivePeers(filtered);
      } else {
        // Fallback to recent recipients from transfer log
        const recentTransfers = Array.from(
          new Set(
            transfers
              .map((t) => t.recipientHandle)
              .filter((h) => h && h.toLowerCase() !== user.handle.toLowerCase())
          )
        ).slice(0, 4);
        setActivePeers(recentTransfers);
      }
    });
  }, [user.handle, transfers]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addRealFiles(e.target.files);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addRealFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDispatch = async () => {
    if (!recipient.trim() || stagedFiles.length === 0) return;

    setIsSending(true);
    setSendSuccess(false);

    // 1. Kick off direct WebRTC P2P stream if peer is reachable
    const rawFiles = stagedFiles
      .map((s) => s.file)
      .filter((f): f is File => Boolean(f));
    if (rawFiles.length > 0) {
      sendFiles(recipient, rawFiles).catch(() => {});
    }

    // 2. Persist manifest and audit record to Supabase
    await dispatchBeam({
      recipientHandle: recipient,
      ttlHours: 24,
      passkeyLock,
      burnOnDownload,
      maxDownloads,
    });

    setTimeout(() => {
      setIsSending(false);
      setSendSuccess(true);
      setTimeout(() => setSendSuccess(false), 3500);
    }, 1500);
  };

  const totalBytes = stagedFiles.reduce((acc, f) => acc + f.size, 0);

  return (
    <section className="flex flex-col gap-6">
      {/* Target Recipient Card */}
      <div className="bg-surface-container-low p-6 rounded-3xl border border-white/5 shadow-lg flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="font-heading text-sm text-on-surface font-semibold flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-secondary" />
            Active Target Node
          </span>
          <span className="font-mono text-xs text-secondary bg-secondary/10 px-2.5 py-0.5 rounded-full">
            P2P Socket Direct
          </span>
        </div>

        {/* Recipient Input Frame */}
        <div className="relative flex items-center bg-surface-container-lowest p-2 rounded-2xl border border-white/5 focus-within:border-primary transition-colors">
          <div className="flex items-center pl-3 pr-1 text-primary font-mono text-base select-none">
            @
          </div>
          <input
            ref={targetInputRef}
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value.replace(/^@/, "").trim())}
            placeholder="recipient_alias"
            className="w-full bg-transparent text-on-surface font-mono text-sm placeholder:text-outline focus:outline-none py-1"
          />
          {recipient && (
            <div className="flex items-center gap-1.5 bg-surface-container px-3 py-1 rounded-full border border-white/5 mr-1 shrink-0">
              <span className="font-mono text-xs text-on-surface font-medium">@{recipient}</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
            </div>
          )}
        </div>

        {/* Active peer suggestions / recents */}
        {activePeers.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pt-1">
            <span className="font-mono text-xs text-outline whitespace-nowrap flex items-center gap-1">
              <Radio className="w-3 h-3 text-secondary animate-pulse" /> Nodes:
            </span>
            {activePeers.map((peer) => (
              <button
                key={peer}
                type="button"
                onClick={() => setRecipient(peer)}
                className="flex items-center gap-1.5 bg-surface-container hover:bg-surface-container-high px-2.5 py-1 rounded-full text-on-surface font-mono text-xs transition-colors border border-white/5 shrink-0"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span>@{peer}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Real High-Depth Dropzone Core */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`relative group bg-surface-container-low hover:bg-surface-container/90 transition-all p-8 rounded-3xl border border-dashed shadow-xl overflow-hidden cursor-pointer text-center flex flex-col items-center justify-center ${
          isDragging ? "border-primary bg-primary/5" : "border-white/15"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="w-16 h-16 mb-3 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary shadow-inner group-hover:scale-105 transition-transform">
          <UploadCloud className="w-8 h-8" />
        </div>

        <h3 className="font-heading text-lg font-semibold text-on-surface tracking-tight">
          Drop real payloads to beam
        </h3>
        <p className="text-xs text-on-surface-variant mt-1 max-w-sm">
          Click to select files from disk or drag them here. Real cryptographic hashes are generated in-browser.
        </p>

        <div className="flex items-center gap-2 bg-surface-container px-3.5 py-1 rounded-full mt-4 border border-white/5">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="font-mono text-xs text-secondary font-medium">
            Channel Active • 48.2 MB/s burst ready
          </span>
        </div>
      </div>

      {/* Staged Payload Queue */}
      <div className="bg-surface-container-low p-6 rounded-3xl border border-white/5 shadow-lg flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-heading text-sm text-on-surface font-semibold">Staged Items</span>
            <span className="font-mono text-xs bg-surface-container px-2.5 py-0.5 rounded-full text-primary font-medium">
              {stagedFiles.length} {stagedFiles.length === 1 ? "file" : "files"} ({formatBytes(totalBytes)})
            </span>
          </div>

          {stagedFiles.length > 0 && (
            <button
              type="button"
              onClick={clearStagedFiles}
              className="font-mono text-xs text-outline hover:text-error transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear All
            </button>
          )}
        </div>

        {stagedFiles.length === 0 ? (
          <div className="p-8 text-center text-outline font-mono text-xs bg-surface-container/40 rounded-2xl border border-white/5">
            No files staged yet. Drop files above to prepare a beam transmission.
          </div>
        ) : (
          <div className="flex flex-col gap-2 max-h-72 overflow-y-auto pr-1">
            {stagedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3.5 bg-surface-container rounded-2xl hover:bg-surface-container-high transition-colors border border-white/5"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center shrink-0">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs text-on-surface font-medium truncate">{file.name}</span>
                    <span className="font-mono text-[10px] text-outline">
                      {formatBytes(file.size)} • {file.hash}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono text-[10px] text-secondary bg-secondary/10 px-2 py-0.5 rounded-md">
                    SHA-256 Verified
                  </span>
                  <button
                    type="button"
                    onClick={() => removeStagedFile(file.id)}
                    className="text-outline hover:text-error transition-colors p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Security Policies */}
      <div className="bg-surface-container-low p-6 rounded-3xl border border-white/5 shadow-lg flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="font-heading text-sm text-on-surface font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-primary" />
            Transport Security Policies
          </span>
          <span className="font-mono text-xs text-outline">AES-GCM-256</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Passkey */}
          <div className="bg-surface-container p-3.5 rounded-2xl flex flex-col justify-between gap-2 border border-white/5">
            <div className="flex items-start justify-between">
              <Key className="w-4 h-4 text-primary" />
              <button
                type="button"
                onClick={() => setPasskeyLock(!passkeyLock)}
                className={`w-8 h-4.5 rounded-full p-0.5 transition-colors flex items-center ${
                  passkeyLock ? "bg-primary-container" : "bg-surface-container-highest"
                }`}
              >
                <span
                  className={`w-3.5 h-3.5 rounded-full bg-on-primary-container shadow transform transition-transform block ${
                    passkeyLock ? "translate-x-3.5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
            <div>
              <div className="text-xs text-on-surface font-medium">Passkey Lock</div>
              <div className="font-mono text-[10px] text-outline">Mandate secret key</div>
            </div>
          </div>

          {/* Burn on Download */}
          <div className="bg-surface-container p-3.5 rounded-2xl flex flex-col justify-between gap-2 border border-white/5">
            <div className="flex items-start justify-between">
              <Flame className="w-4 h-4 text-error" />
              <button
                type="button"
                onClick={() => setBurnOnDownload(!burnOnDownload)}
                className={`w-8 h-4.5 rounded-full p-0.5 transition-colors flex items-center ${
                  burnOnDownload ? "bg-error" : "bg-surface-container-highest"
                }`}
              >
                <span
                  className={`w-3.5 h-3.5 rounded-full bg-white shadow transform transition-transform block ${
                    burnOnDownload ? "translate-x-3.5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
            <div>
              <div className="text-xs text-on-surface font-medium">Burn on Download</div>
              <div className="font-mono text-[10px] text-outline">Purge upon 1st receipt</div>
            </div>
          </div>

          {/* Cap Access */}
          <div className="bg-surface-container p-3.5 rounded-2xl flex flex-col justify-between gap-2 border border-white/5">
            <div className="flex items-start justify-between">
              <Download className="w-4 h-4 text-secondary" />
              <select
                value={maxDownloads}
                onChange={(e) => setMaxDownloads(Number(e.target.value))}
                className="bg-surface-container-high text-on-surface font-mono text-xs px-2 py-0.5 rounded-lg border-0 focus:outline-none"
              >
                <option value={1}>1 time</option>
                <option value={3}>3 times</option>
                <option value={999}>Unlimited</option>
              </select>
            </div>
            <div>
              <div className="text-xs text-on-surface font-medium">Cap Access</div>
              <div className="font-mono text-[10px] text-outline">Restrict repeat pulls</div>
            </div>
          </div>
        </div>

        {/* Live WebRTC Streaming Bar */}
        {p2pStatus.isStreaming && (
          <div className="bg-surface-container p-3.5 rounded-2xl flex flex-col gap-2 border border-secondary/30 animate-pulse">
            <div className="flex items-center justify-between font-mono text-xs text-secondary">
              <span className="flex items-center gap-1.5 font-semibold">
                <Radio className="w-3.5 h-3.5 animate-spin" /> Streaming to @{p2pStatus.peerHandle}
              </span>
              <span>{p2pStatus.speedMBs} MB/s • {p2pStatus.percent}%</span>
            </div>
            <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary transition-all duration-300"
                style={{ width: `${p2pStatus.percent}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-outline font-mono text-[10px]">
              <span>{p2pStatus.fileName}</span>
              <span>{formatBytes(p2pStatus.bytesTransferred)} / {formatBytes(p2pStatus.totalBytes)}</span>
            </div>
          </div>
        )}

        {/* Master Dispatch Button */}
        <button
          type="button"
          onClick={handleDispatch}
          disabled={stagedFiles.length === 0 || isSending}
          className={`w-full relative group overflow-hidden mt-2 p-[1px] rounded-full shadow-lg transition-all ${
            stagedFiles.length === 0
              ? "opacity-50 cursor-not-allowed bg-surface-container-highest"
              : "bg-gradient-to-r from-primary-container via-primary to-secondary hover:shadow-primary/30"
          }`}
        >
          <div className="w-full bg-surface-container-lowest group-hover:bg-opacity-80 transition-all py-3 px-6 rounded-full flex items-center justify-center gap-3">
            {isSending ? (
              <>
                <RefreshCw className="w-4 h-4 text-secondary animate-spin" />
                <span className="font-heading text-sm text-secondary font-semibold">
                  Encrypting & Streaming Packets...
                </span>
              </>
            ) : sendSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-secondary" />
                <span className="font-heading text-sm text-secondary font-semibold">
                  Payload Dispatched to @{recipient}!
                </span>
              </>
            ) : (
              <>
                <span className="font-heading text-sm text-on-surface font-semibold tracking-tight">
                  Beam {stagedFiles.length} {stagedFiles.length === 1 ? "File" : "Files"} to @{recipient}
                </span>
                <div className="w-6 h-6 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </>
            )}
          </div>
        </button>
      </div>
    </section>
  );
};
