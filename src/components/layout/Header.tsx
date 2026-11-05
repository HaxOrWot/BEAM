"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useP2P } from "@/context/P2PContext";

export const Header: React.FC<{ onToggleMobile?: () => void }> = ({ onToggleMobile }) => {
  const pathname = usePathname();
  const { identity, activePeers, connectionStatus, activePeer } = useP2P();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-50 bg-surface-container-lowest/90 backdrop-blur-xl border-b border-outline-variant">
      <div className="h-16 w-full px-margin flex items-center justify-between gap-gutter">
        {/* Brand */}
        <div className="flex items-center gap-space-lg">
          <Link href="/" className="flex items-center gap-space-md">
            {/* Logo */}
            <img
              alt="PROTO TCP Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1UefZC82qpVYoJan_34mSElYmS95VAOXagd0YOaqYPwlbZptt2CJtbCcykkK1wgP9ZKGh3kIK6OM3qexr6pLfzuOfYoabTZ9WXP-gmHZI4KsQNWCZmHEe1U5rGlsLljsc0MuUbNeWb7sUnQdKSlNKG0_f78bm4_0KLoHme7idvsuj-oYK6AuI0dpNPcbxsVaP1LJs3rkXZ01F4_QQluMKuWYSc_EgAJgRgXBAQgtKym"
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm uppercase tracking-wider text-primary font-medium">
                PROTO/TCP
              </span>
              <span className="font-label-caps text-label-caps uppercase text-outline tracking-widest">
                DIRECT P2P SOCKET LAYER
              </span>
            </div>
          </Link>

          {/* Telemetry Chips in Header */}
          <div className="hidden xl:flex items-center gap-space-sm pl-space-md border-l border-outline-variant">
            {/* Active Node Identity Chip */}
            <Link
              href="/auth"
              className="flex items-center gap-space-xs px-space-sm py-space-xs bg-surface-container border border-outline-variant hover:border-primary transition-colors"
            >
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              <span className="font-telemetry-sm text-telemetry-sm text-primary font-semibold">
                @{identity.username}
              </span>
              <span className="font-telemetry-sm text-[10px] text-outline font-mono">
                [{identity.callsign}]
              </span>
            </Link>

            {/* P2P Connection Status Chip */}
            <div className="flex items-center gap-space-xs px-space-sm py-space-xs bg-surface-container border border-outline-variant">
              <span className="font-label-caps text-label-caps text-outline uppercase">P2P:</span>
              <span
                className={`font-telemetry-sm text-telemetry-sm font-semibold ${
                  connectionStatus === "CONNECTED"
                    ? "text-primary"
                    : connectionStatus === "CONNECTING"
                    ? "text-gold-light animate-pulse"
                    : "text-outline"
                }`}
              >
                {connectionStatus === "CONNECTED"
                  ? `TUNNEL -> @${activePeer}`
                  : connectionStatus === "CONNECTING"
                  ? "HANDSHAKING..."
                  : "READY"}
              </span>
            </div>

            {/* Active Peers Online Count */}
            <Link
              href="/peers"
              className="flex items-center gap-space-xs px-space-sm py-space-xs bg-surface-container border border-outline-variant hover:border-primary transition-colors"
            >
              <span className="font-label-caps text-label-caps text-outline uppercase">MESH:</span>
              <span className="font-telemetry-sm text-telemetry-sm text-primary font-semibold">
                {activePeers.length} PEER{activePeers.length === 1 ? "" : "S"} ONLINE
              </span>
            </Link>
          </div>
        </div>

        {/* Right Status / Mobile Toggle */}
        <div className="flex items-center gap-space-sm">
          <Link
            href="/auth"
            className="flex items-center gap-space-xs px-space-sm py-1.5 border border-outline-variant bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface font-label-caps text-label-caps uppercase tracking-wider"
          >
            <span className="material-symbols-outlined text-[15px] text-primary">
              {identity.authProvider === "anonymous" ? "key" : "account_circle"}
            </span>
            <span className="hidden sm:inline">
              {identity.authProvider === "anonymous" ? "SIGN IN" : `@${identity.username}`}
            </span>
          </Link>

          <Link
            href="/diagnostics"
            className="flex items-center gap-space-xs px-space-sm py-1.5 border border-outline-variant bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface font-label-caps text-label-caps uppercase tracking-wider"
          >
            <span className="material-symbols-outlined text-[15px] text-primary">terminal</span>
            <span className="hidden md:inline">DIAGNOSTICS</span>
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={onToggleMobile}
            className="md:hidden p-2 border border-outline-variant bg-surface-container text-primary flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[20px]">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
};
