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
  AlertTriangle,
  FileText,
  Folder,
  Lock,
  Zap,
  Clock,
  Upload,
  History,
} from "lucide-react";
import { useBeamStore } from "@/lib/store";
import { useBeamP2P } from "@/lib/p2p/P2PProvider";
import { fetchActivePeers } from "@/lib/supabase";
import { formatBytes, formatShortHash } from "@/lib/utils";

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
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState("");

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
      const files = Array.from(e.target.files);
      addRealFiles(files);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      addRealFiles(files);
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

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      setUploadProgress(Math.min(100, progress));
      
      if (progress > 100) {
        clearInterval(interval);
      }
    }, 200);

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

    clearInterval(interval);
    setUploadProgress(100);

    setTimeout(() => {
      setIsSending(false);
      setSendSuccess(true);
      setTimeout(() => {
        setSendSuccess(false);
        setUploadProgress(0);
      }, 3500);
    }, 1000);
  };

  const totalBytes = stagedFiles.reduce((acc, f) => acc + f.size, 0);
  const fileCount = stagedFiles.length;

  // Get file icon based on type
  const getFileIcon = (file: typeof stagedFiles[0]) => {
    const isFolder = file.type === "application/octet-stream" && file.size === 0;
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");
    const isAudio = file.type.startsWith("audio/");
    const isPDF = file.type === "application/pdf";
    const isArchive = file.type.includes("zip") || file.type.includes("tar") || file.type.includes("gzip");

    if (isFolder) return Folder;
    if (isImage) return FileText;
    if (isVideo) return FileText;
    if (isAudio) return FileText;
    if (isPDF) return FileText;
    if (isArchive) return FileText;
    return FileText;
  };

  return (
    <section className="flex flex-col gap-6 animate-fade-in">
      {/* Target Recipient Card */}
      <div className="bg-surface-container-low p-6 rounded-3xl border border-white/5 shadow-lg flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="font-heading text-sm text-on-surface font-semibold flex items-center gap-2">
            <MapPin className="w-4 h-4 text-secondary" />
            Active Target Node
          </span>
          <span className="font-mono text-xs text-secondary bg-secondary/10 px-3 py-1 rounded-full">
            P2P Socket Direct
          </span>
        </div>

        {/* Recipient Input Frame */}
        <div className="relative flex items-center bg-surface-container-lowest p-3 rounded-2xl border border-white/5 focus-within:border-primary/50 focus-within:shadow-lg focus-within:shadow-primary/20 transition-all">
          <div className="flex items-center pl-4 pr-2 text-primary font-mono text-lg select-none">
            @
          </div>
          <input
            ref={targetInputRef}
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value.replace(/^@/, "").trim())}
            placeholder="recipient_alias"
            className="w-full bg-transparent text-on-surface font-mono text-sm placeholder:text-outline focus:outline-none py-2"
          />
          {recipient && (
            <div className="flex items-center gap-2 bg-surface-container px-4 py-2 rounded-full border border-white/5 mr-1 shrink-0">
              <span className="font-mono text-xs text-on-surface font-medium">@{recipient}</span>
              <CheckCircle2 className="w-4 h-4 text-secondary" />
            </div>
          )}
        </div>

        {/* Active peer suggestions / recents */}
        {activePeers.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pt-2 -mx-1 px-1">
            <span className="font-mono text-xs text-outline whitespace-nowrap flex items-center gap-1">
              <Radio className="w-3 h-3 text-secondary animate-pulse" /> Nodes:
            </span>
            {activePeers.map((peer) => (
              <button
                key={peer}
                type="button"
                onClick={() => setRecipient(peer)}
                className="flex items-center gap-2 bg-surface-container hover:bg-surface-container-high px-3 py-1.5 rounded-full text-on-surface font-mono text-xs transition-all border border-white/5 shrink-0 hover:border-primary/30"
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
        className={`relative group bg-surface-container-low hover:bg-surface-container/90 transition-all p-10 rounded-3xl border border-dashed shadow-xl overflow-hidden cursor-pointer text-center flex flex-col items-center justify-center ${
          isDragging ? "border-primary bg-primary/5" : "border-white/15"
        }`}
      >
        {/* Drag overlay */}
        {isDragging && (
          <div className="absolute inset-0 bg-primary/10 backdrop-blur-sm z-0" />
        )}
        
        <div className="relative z-10 w-20 h-20 mb-4 rounded-3xl bg-gradient-to-br from-primary-container/30 to-primary/20 flex items-center justify-center text-primary shadow-lg group-hover:scale-110 group-hover:shadow-primary/30 transition-all duration-300">
          <UploadCloud className="w-10 h-10" />
        </div>

        <h3 className="font-heading text-xl font-semibold text-on-surface tracking-tight">
          Drop real payloads to beam
        </h3>
        <p className="text-xs text-on-surface-variant mt-2 max-w-sm">
          Click to select files from disk or drag them here. Real cryptographic hashes are generated in-browser.
        </p>

        <div className="flex items-center gap-3 mt-6 relative z-10">
          <span className="font-mono text-xs text-on-surface bg-surface-container px-3 py-1.5 rounded-full border border-white/5">
            Drag & drop support
          </span>
          <span className="font-mono text-xs text-secondary bg-secondary/10 px-3 py-1.5 rounded-full">
            Max 100 GB per file
          </span>
        </div>
      </div>

      {/* Staged Payload Queue */}
      <div className="bg-surface-container-low p-6 rounded-3xl border border-white/5 shadow-lg flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-heading text-sm text-on-surface font-semibold flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-primary" />
              Staged Items
            </span>
            <span className="font-mono text-xs bg-surface-container px-3 py-1 rounded-full text-primary font-medium">
              {fileCount} {fileCount === 1 ? "file" : "files"} ({formatBytes(totalBytes)})
            </span>
          </div>

          {stagedFiles.length > 0 && (
            <button
              type="button"
              onClick={clearStagedFiles}
              className="font-mono text-xs text-outline hover:text-error transition-colors flex items-center gap-2 px-3 py-1.5 hover:bg-error/10 rounded-lg"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear All
            </button>
          )}
        </div>

        {stagedFiles.length === 0 ? (
          <div className="p-10 text-center text-outline font-mono text-xs bg-surface-container/40 rounded-2xl border border-white/5 animate-fade-in">
            <UploadCloud className="w-10 h-10 mx-auto mb-3 opacity-50" />
            No files staged yet. Drop files above to prepare a beam transmission.
          </div>
        ) : (
          <div className="flex flex-col gap-3 max-h-96 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-surface-container-high scrollbar-track-surface-container-lowest">
            {stagedFiles.map((file, idx) => {
              const Icon = getFileIcon(file);
              return (
                <div
                  key={file.id}
                  className="group relative flex items-center gap-4 p-4 bg-surface-container hover:bg-surface-container-high transition-all rounded-2xl border border-white/5 hover:border-primary/30"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-container/20 to-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-on-surface font-medium truncate">{file.name}</span>
                      {file.type.startsWith("image/") && (
                        <span className="font-mono text-[10px] text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">Image</span>
                      )}
                      {file.type.startsWith("video/") && (
                        <span className="font-mono text-[10px] text-tertiary bg-tertiary/10 px-2 py-0.5 rounded-full">Video</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="font-mono text-xs text-outline">{formatBytes(file.size)}</span>
                      <span className="font-mono text-[10px] text-secondary flex items-center gap-1">
                        <Zap className="w-3 h-3" /> {formatShortHash(file.hash)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={() => removeStagedFile(file.id)}
                      className="text-outline hover:text-error transition-colors p-2 hover:bg-error/10 rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Security Policies */}
      <div className="bg-surface-container-low p-6 rounded-3xl border border-white/5 shadow-lg flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="font-heading text-sm text-on-surface font-semibold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            Transport Security Policies
          </span>
          <span className="font-mono text-xs text-outline">AES-GCM-256</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Passkey */}
          <div className="bg-surface-container p-4 rounded-2xl flex flex-col justify-between gap-3 border border-white/5 hover:border-primary/30 transition-all">
            <div className="flex items-start justify-between">
              <Key className="w-5 h-5 text-primary" />
              <button
                type="button"
                onClick={() => setPasskeyLock(!passkeyLock)}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors flex items-center ${
                  passkeyLock ? "bg-primary-container" : "bg-surface-container-highest"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full bg-on-primary-container shadow transform transition-transform block ${
                    passkeyLock ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
            <div>
              <div className="text-xs text-on-surface font-medium">Passkey Lock</div>
              <div className="font-mono text-[10px] text-outline mt-1">Mandate secret key</div>
            </div>
          </div>

          {/* Burn on Download */}
          <div className="bg-surface-container p-4 rounded-2xl flex flex-col justify-between gap-3 border border-white/5 hover:border-error/30 transition-all">
            <div className="flex items-start justify-between">
              <Flame className="w-5 h-5 text-error" />
              <button
                type="button"
                onClick={() => setBurnOnDownload(!burnOnDownload)}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors flex items-center ${
                  burnOnDownload ? "bg-error" : "bg-surface-container-highest"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform block ${
                    burnOnDownload ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
            <div>
              <div className="text-xs text-on-surface font-medium">Burn on Download</div>
              <div className="font-mono text-[10px] text-outline mt-1">Purge upon 1st receipt</div>
            </div>
          </div>

          {/* Cap Access */}
          <div className="bg-surface-container p-4 rounded-2xl flex flex-col justify-between gap-3 border border-white/5 hover:border-secondary/30 transition-all">
            <div className="flex items-start justify-between">
              <Download className="w-5 h-5 text-secondary" />
              <select
                value={maxDownloads}
                onChange={(e) => setMaxDownloads(Number(e.target.value))}
                className="bg-surface-container-high text-on-surface font-mono text-xs px-3 py-1 rounded-lg border-0 focus:outline-none"
              >
                <option value={1}>1 time</option>
                <option value={3}>3 times</option>
                <option value={999}>Unlimited</option>
              </select>
            </div>
            <div>
              <div className="text-xs text-on-surface font-medium">Cap Access</div>
              <div className="font-mono text-[10px] text-outline mt-1">Restrict repeat pulls</div>
            </div>
          </div>
        </div>

        {/* Live WebRTC Streaming Bar */}
        {p2pStatus.isStreaming && (
          <div className="bg-surface-container p-4 rounded-2xl flex flex-col gap-3 border border-secondary/30 animate-pulse">
            <div className="flex items-center justify-between font-mono text-xs text-secondary">
              <span className="flex items-center gap-2 font-semibold">
                <Radio className="w-4 h-4 animate-spin" /> Streaming to @{p2pStatus.peerHandle}
              </span>
              <div className="flex items-center gap-3">
                <span>{p2pStatus.speedMBs} MB/s</span>
                <span>{p2pStatus.percent}%</span>
              </div>
            </div>
            <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-secondary to-tertiary transition-all duration-300"
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
          <div className="w-full bg-surface-container-lowest group-hover:bg-opacity-80 transition-all py-4 px-8 rounded-full flex items-center justify-center gap-4">
            {isSending ? (
              <>
                <RefreshCw className="w-5 h-5 text-secondary animate-spin" />
                <span className="font-heading text-sm text-secondary font-semibold">
                  {uploadProgress < 100 ? "Uploading..." : "Encrypting & Streaming..."}
                </span>
              </>
            ) : sendSuccess ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-secondary" />
                <span className="font-heading text-sm text-secondary font-semibold">
                  Payload Dispatched to @{recipient}!
                </span>
              </>
            ) : (
              <>
                <span className="font-heading text-sm text-on-surface font-semibold tracking-tight">
                  Beam {stagedFiles.length} {stagedFiles.length === 1 ? "File" : "Files"} to @{recipient}
                </span>
                <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </>
            )}
          </div>
        </button>
      </div>
    </section>
  );
};
