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
  Radio,
} from "lucide-react";
import { useBeamStore } from "@/lib/store";
import { useBeamP2P } from "@/lib/p2p/P2PProvider";
import { formatBytes, formatTimeAgo } from "@/lib/utils";

export const ActivityDeck: React.FC = () => {
  const { user, transfers, triggerFileDownload } = useBeamStore();
  const { getReceivedBlob } = useBeamP2P();
  const [activeTab, setActiveTab] = useState<"incoming" | "sent">("incoming");
  const [copied, setCopied] = useState(false);

  const ingressUrl = `https://beam.sh/@${user.handle}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(ingressUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Filter transfers into sent and incoming for this user
  const sentTransfers = transfers.filter((t) => t.senderHandle === user.handle);
  const incomingTransfers = transfers.filter((t) => t.recipientHandle === user.handle);

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
              incomingTransfers.map((item) => (
                <div
                  key={item.id}
                  className="bg-surface-container p-4 rounded-2xl flex flex-col gap-2.5 border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="font-heading text-xs text-on-surface font-semibold">
                        @{item.senderHandle}
                      </span>
                      <span className="font-mono text-[10px] text-outline">
                        • {formatTimeAgo(item.createdAt)}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] bg-error/15 text-error px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Expires in {item.ttlHours}h
                    </span>
                  </div>

                  {item.files.map((file, idx) => {
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
                                  Live P2P
                                </span>
                              )}
                            </div>
                            <div className="font-mono text-[10px] text-outline">
                              {formatBytes(file.size)} • {file.hash}
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => triggerFileDownload(file.name, receivedBlob)}
                          className="bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-all shrink-0"
                        >
                          <Download className="w-3.5 h-3.5" /> Download
                        </button>
                      </div>
                    );
                  })}

                  <div className="flex items-center justify-between text-outline font-mono text-[10px] px-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-secondary" /> AES-256 Validated
                    </span>
                    <span>P2P WebRTC Handshake</span>
                  </div>
                </div>
              ))
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
                    <span className="font-mono text-[10px] text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
                      Dispatched
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-outline font-mono text-xs mt-1">
                    <span className="text-on-surface truncate pr-2">
                      {item.files.map((f) => f.name).join(", ")} ({formatBytes(item.totalBytes)})
                    </span>
                    <span className="shrink-0 text-[10px]">{formatTimeAgo(item.createdAt)}</span>
                  </div>

                  <div className="flex items-center justify-between font-mono text-[10px] text-outline pt-1">
                    <span>TTL: {item.ttlHours}h</span>
                    <span>Passkey: {item.passkeyLock ? "Mandatory" : "Open"}</span>
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
