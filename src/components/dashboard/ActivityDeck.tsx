"use client";

import React, { useState } from "react";
import {
  Link as LinkIcon,
  Copy,
  Check,
  Download,
  Clock,
  Send,
  FileCode,
  ShieldCheck,
  Flame,
  Key,
  AlertTriangle,
  RefreshCw,
  Lock,
} from "lucide-react";
import { useBeamStore } from "@/lib/store";
import { useBeamP2P } from "@/lib/p2p/P2PProvider";
import { formatBytes, formatTimeAgo, formatShortHash } from "@/lib/utils";

export const ActivityDeck: React.FC = () => {
  const { user, transfers, downloadTransferFile } = useBeamStore();
  const { getReceivedBlob } = useBeamP2P();
  const [activeTab, setActiveTab] = useState<"incoming" | "sent">("incoming");
  const [copied, setCopied] = useState(false);
  const [downloadingFile, setDownloadingFile] = useState<string | null>(null);
  const [integrityStatus, setIntegrityStatus] = useState<Record<string, "verified" | "mismatch" | "error">>({});
  const [passkeyInputs, setPasskeyInputs] = useState<Record<string, string>>({});
  const [passkeyErrors, setPasskeyErrors] = useState<Record<string, string>>({});

  const ingressUrl = `https://beam.sh/@${user.handle}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(ingressUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async (item: (typeof transfers)[0], fileName: string, expectedHash?: string) => {
    const fileKey = `${item.id}_${fileName}`;
    setDownloadingFile(fileKey);
    setPasskeyErrors((prev) => ({ ...prev, [item.id]: "" }));

    // If passkey locked, verify passphrase was typed
    if (item.passkeyLock) {
      const entered = passkeyInputs[item.id];
      if (!entered) {
        setPasskeyErrors((prev) => ({ ...prev, [item.id]: "Passphrase required to unlock payload." }));
        setDownloadingFile(null);
        return;
      }
    }

    const cachedBlob = getReceivedBlob(fileName);

    const result = await downloadTransferFile({
      transferId: item.id,
      fileName,
      expectedHash,
      cachedBlob,
    });

    setDownloadingFile(null);

    if (result.success) {
      setIntegrityStatus((prev) => ({
        ...prev,
        [fileKey]: result.verified ? "verified" : "mismatch",
      }));
    } else {
      setIntegrityStatus((prev) => ({
        ...prev,
        [fileKey]: "error",
      }));
      setPasskeyErrors((prev) => ({ ...prev, [item.id]: result.error || "Download failed" }));
    }
  };

  // Filter transfers into sent and incoming for this user
  const sentTransfers = transfers.filter((t) => t.senderHandle.toLowerCase() === user.handle.toLowerCase());
  const incomingTransfers = transfers.filter((t) => t.recipientHandle.toLowerCase() === user.handle.toLowerCase());

  return (
    <div className="flex flex-col gap-6">
      {/* Personal Ingress Link Card */}
      <div className="bg-surface-container-low p-6 rounded-3xl border border-white/5 shadow-lg flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="font-heading text-sm text-on-surface font-semibold flex items-center gap-1.5">
            <LinkIcon className="w-4 h-4 text-secondary" />
            Personal Ingress Link
          </span>
          <span className="font-mono text-xs text-outline">Public Receiver Node</span>
        </div>

        <div className="flex items-center justify-between bg-surface-container-lowest px-4 py-2 rounded-2xl border border-white/5">
          <div className="flex items-center gap-1 font-mono text-xs text-secondary truncate pr-2 select-all">
            <span className="text-outline">https://</span>beam.sh/@{user.handle}
          </div>
          <button
            type="button"
            onClick={handleCopyLink}
            className="flex items-center gap-1 font-mono text-xs bg-surface-container hover:bg-surface-container-high text-on-surface px-3 py-1 rounded-full transition-colors border border-white/5 shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-secondary" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <p className="text-xs text-on-surface-variant">
          Anyone with this address can direct-beam payloads directly into your encrypted vault quarantine.
        </p>
      </div>

      {/* Activity Deck */}
      <div className="bg-surface-container-low p-6 rounded-3xl border border-white/5 shadow-lg flex flex-col gap-4">
        {/* Deck Tabs */}
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <div className="flex items-center gap-1 bg-surface-container p-1 rounded-full border border-white/5">
            <button
              type="button"
              onClick={() => setActiveTab("incoming")}
              className={`px-3 py-1 rounded-full font-heading text-xs font-medium transition-colors ${
                activeTab === "incoming"
                  ? "bg-primary-container text-on-primary-container"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Incoming Beams ({incomingTransfers.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("sent")}
              className={`px-3 py-1 rounded-full font-heading text-xs font-medium transition-colors ${
                activeTab === "sent"
                  ? "bg-primary-container text-on-primary-container"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Sent Logs ({sentTransfers.length})
            </button>
          </div>
          <span className="font-mono text-xs text-outline font-medium">REAL TIME</span>
        </div>

        {/* Incoming Beams */}
        {activeTab === "incoming" && (
          <div className="flex flex-col gap-3">
            {incomingTransfers.length === 0 ? (
              <div className="p-8 text-center text-outline font-mono text-xs bg-surface-container/40 rounded-2xl border border-white/5">
                No incoming payloads currently active. Send a beam to your own handle (@{user.handle}) or share your link to receive files!
              </div>
            ) : (
              incomingTransfers.map((item) => {
                const isExpired = item.status === "expired" || Date.now() > item.expiresAt;

                return (
                  <div
                    key={item.id}
                    className={`bg-surface-container p-4 rounded-2xl flex flex-col gap-3 border transition-colors ${
                      isExpired ? "opacity-60 border-error/20" : "border-white/5 hover:border-white/10"
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="font-heading text-xs text-on-surface font-semibold">
                          @{item.senderHandle}
                        </span>
                        <span className="font-mono text-[10px] text-outline">
                          • {formatTimeAgo(item.createdAt)}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {item.burnOnDownload && (
                          <span className="font-mono text-[9px] bg-error/15 text-error px-2 py-0.5 rounded-full flex items-center gap-0.5 font-medium">
                            <Flame className="w-2.5 h-2.5" /> Burn On Download
                          </span>
                        )}
                        {item.passkeyLock && (
                          <span className="font-mono text-[9px] bg-primary/15 text-primary px-2 py-0.5 rounded-full flex items-center gap-0.5 font-medium">
                            <Lock className="w-2.5 h-2.5" /> Passkey Protected
                          </span>
                        )}
                        {isExpired ? (
                          <span className="font-mono text-[9px] bg-error/20 text-error px-2 py-0.5 rounded-full font-semibold">
                            Burned / Expired
                          </span>
                        ) : (
                          <span className="font-mono text-[10px] bg-secondary/10 text-secondary px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {item.ttlHours}h TTL
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Passkey Input if locked and active */}
                    {item.passkeyLock && !isExpired && (
                      <div className="flex items-center gap-2 bg-surface-container-lowest p-2 rounded-xl border border-white/5">
                        <Key className="w-3.5 h-3.5 text-primary shrink-0 ml-1" />
                        <input
                          type="password"
                          value={passkeyInputs[item.id] || ""}
                          onChange={(e) =>
                            setPasskeyInputs((prev) => ({ ...prev, [item.id]: e.target.value }))
                          }
                          placeholder="Enter sender's passphrase to unlock..."
                          className="w-full bg-transparent text-xs text-on-surface font-mono placeholder:text-outline focus:outline-none"
                        />
                      </div>
                    )}

                    {passkeyErrors[item.id] && (
                      <div className="font-mono text-[11px] text-error flex items-center gap-1 px-1">
                        <AlertTriangle className="w-3 h-3" />
                        <span>{passkeyErrors[item.id]}</span>
                      </div>
                    )}

                    {/* Files list */}
                    {item.files.map((file, idx) => {
                      const fileKey = `${item.id}_${file.name}`;
                      const isDownloading = downloadingFile === fileKey;
                      const status = integrityStatus[fileKey];
                      const receivedBlob = getReceivedBlob(file.name);

                      return (
                        <div
                          key={idx}
                          className="flex items-center justify-between bg-surface-container-lowest p-2.5 rounded-xl border border-white/5"
                        >
                          <div className="flex items-center gap-2.5 min-w-0 pr-2">
                            <FileCode className="w-6 h-6 text-secondary shrink-0" />
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5 font-mono text-xs text-on-surface truncate font-medium">
                                <span>{file.name}</span>
                                {receivedBlob && (
                                  <span className="font-mono text-[9px] bg-secondary/15 text-secondary px-1.5 py-0.2 rounded">
                                    Direct WebRTC
                                  </span>
                                )}
                              </div>
                              <div className="font-mono text-[10px] text-outline">
                                {formatBytes(file.size)} • {formatShortHash(file.hash)}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {status === "verified" && (
                              <span className="font-mono text-[10px] text-secondary bg-secondary/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                                <Check className="w-3 h-3" /> SHA-256 Validated
                              </span>
                            )}
                            {status === "mismatch" && (
                              <span className="font-mono text-[10px] text-error bg-error/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" /> Hash Mismatch
                              </span>
                            )}

                            <button
                              type="button"
                              disabled={isExpired || isDownloading}
                              onClick={() => handleDownload(item, file.name, file.hash)}
                              className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
                                isExpired
                                  ? "bg-surface-container-highest text-outline cursor-not-allowed"
                                  : isDownloading
                                  ? "bg-secondary text-surface"
                                  : "bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container shadow-sm"
                              }`}
                            >
                              {isDownloading ? (
                                <>
                                  <RefreshCw className="w-3 h-3 animate-spin" /> Verifying...
                                </>
                              ) : (
                                <>
                                  <Download className="w-3.5 h-3.5" /> Download
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    <div className="flex items-center justify-between text-outline font-mono text-[10px] px-1">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-secondary" />
                        {item.downloadCount} / {item.maxDownloads} downloads logged
                      </span>
                      <span>Supabase Encrypted Storage & P2P</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Sent Logs */}
        {activeTab === "sent" && (
          <div className="flex flex-col gap-3">
            {sentTransfers.length === 0 ? (
              <div className="p-8 text-center text-outline font-mono text-xs bg-surface-container/40 rounded-2xl border border-white/5">
                No sent transfers recorded yet. Dispatch your first payload using the Transfer Station!
              </div>
            ) : (
              sentTransfers.map((item) => (
                <div
                  key={item.id}
                  className="bg-surface-container p-4 rounded-2xl flex flex-col gap-1.5 border border-white/5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Send className="w-3.5 h-3.5 text-primary" />
                      <span className="font-heading text-xs text-on-surface font-semibold">
                        To @{item.recipientHandle}
                      </span>
                    </div>
                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 rounded-full ${
                        item.status === "expired"
                          ? "bg-error/15 text-error"
                          : "text-secondary bg-secondary/10"
                      }`}
                    >
                      {item.status === "expired" ? "Burned / Expired" : "Delivered & Audited"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-outline font-mono text-xs mt-1">
                    <span className="text-on-surface truncate pr-2">
                      {item.files.map((f) => f.name).join(", ")} ({formatBytes(item.totalBytes)})
                    </span>
                    <span className="shrink-0 text-[10px]">{formatTimeAgo(item.createdAt)}</span>
                  </div>

                  <div className="flex items-center justify-between font-mono text-[10px] text-outline pt-1">
                    <span>
                      TTL: {item.ttlHours}h • Downloads: {item.downloadCount}/{item.maxDownloads}
                    </span>
                    <span>{item.passkeyLock ? "Passkey Locked" : "Open"}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
