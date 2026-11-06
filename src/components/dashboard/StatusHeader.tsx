"use client";

import React from "react";
import { UserCheck, HardDrive, Send, Sliders } from "lucide-react";
import { useBeamStore } from "@/lib/store";
import { formatBytes } from "@/lib/utils";

interface StatusHeaderProps {
  onNewSendClick?: () => void;
}

export const StatusHeader: React.FC<StatusHeaderProps> = ({ onNewSendClick }) => {
  const { user } = useBeamStore();

  const percentUsed = Math.min(
    100,
    Math.round((user.storageUsedBytes / user.storageLimitBytes) * 100)
  );

  return (
    <section className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 bg-surface-container-low p-6 rounded-3xl border border-white/5 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        {/* User Handle Pill */}
        <div className="flex items-center gap-3 bg-surface-container px-4 py-2 rounded-full border border-white/5 w-fit">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-mono text-sm font-bold">
              {user.handle.slice(0, 2).toUpperCase()}
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-secondary rounded-full ring-2 ring-surface animate-pulse" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-heading text-base font-semibold text-on-surface">
                @{user.handle}
              </span>
              <UserCheck className="w-4 h-4 text-secondary" />
            </div>
            <span className="font-mono text-[10px] text-outline">
              ED25519 • Beam Node #{user.nodeId}
            </span>
          </div>
        </div>

        {/* Vault Capacity */}
        <div className="flex flex-col justify-center bg-surface-container/60 px-5 py-2.5 rounded-2xl min-w-[260px] border border-white/5">
          <div className="flex items-center justify-between font-mono text-xs mb-1.5">
            <span className="text-on-surface-variant flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-secondary" /> Vault Capacity
            </span>
            <span className="text-on-surface font-medium">
              {formatBytes(user.storageUsedBytes)} / {formatBytes(user.storageLimitBytes)}
            </span>
          </div>
          <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-container via-primary to-secondary rounded-full transition-all duration-500"
              style={{ width: `${percentUsed}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-1 text-outline font-mono text-[10px]">
            <span>{percentUsed}% consumed</span>
            <span>{formatBytes(user.storageLimitBytes - user.storageUsedBytes)} remaining</span>
          </div>
        </div>
      </div>

      {/* Action Cluster */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onNewSendClick}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-primary-container text-on-primary-container px-6 py-2.5 rounded-full font-heading text-sm font-semibold hover:bg-primary hover:text-on-primary transition-all shadow-md"
        >
          <Send className="w-4 h-4" />
          <span>New Send to @Username</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center p-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors border border-white/5"
          title="Vault Settings"
        >
          <Sliders className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
