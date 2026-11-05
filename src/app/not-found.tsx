"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function NotFound() {
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2800);
  };

  return (
    <div className="relative w-full max-w-[1440px] mx-auto px-margin py-space-xl flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[520px] bg-primary/5 rounded-full blur-[140px]" />
        <div className="absolute top-12 left-1/4 w-px h-64 bg-gradient-to-b from-primary/20 via-transparent to-transparent" />
        <div className="absolute bottom-12 right-1/4 w-px h-64 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center">
        {/* Error Badge */}
        <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 bg-surface-container-high rounded-none shadow-[0_0_12px_rgba(212,175,55,0.08)]">
          <span className="w-1.5 h-1.5 bg-primary rounded-none shadow-[0_0_8px_rgba(212,175,55,0.6)] animate-pulse" />
          <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary">
            [ KERNEL ERROR / PACKET_UNREACHABLE ]
          </span>
        </div>

        {/* 404 Display */}
        <div className="relative my-space-md select-none">
          <span className="font-display-lg text-[130px] md:text-[210px] leading-none tracking-tighter font-semibold text-transparent [-webkit-text-stroke:1px_#DFBD69] drop-shadow-[0_0_24px_rgba(212,175,55,0.18)]">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>
        </div>

        {/* Status Line */}
        <div className="flex items-center gap-space-xs font-telemetry-md text-telemetry-md text-primary font-medium tracking-tight -mt-4 mb-space-sm">
          <span className="text-primary select-none">::</span>
          <span>SOCKET_ENDPOINT_NOT_FOUND</span>
          <span className="text-outline select-none">(ERR_TCP_RESET)</span>
        </div>

        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl text-center leading-relaxed mb-space-xl">
          The requested socket path or peer descriptor{" "}
          <span className="font-telemetry-sm text-telemetry-sm text-primary px-1.5 py-0.5 bg-surface-container-high">
            /peers/unresolved-node
          </span>{" "}
          does not exist in the routing table, was terminated by peer RST flag, or the session ticket has expired.
        </p>

        {/* Diagnostic Trace Box */}
        <div className="w-full max-w-2xl bg-surface-container-low shadow-2xl p-space-lg text-left relative mb-space-xl overflow-hidden border border-outline-variant">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
          <div className="flex items-center justify-between pb-space-sm mb-space-sm bg-surface-container-lowest -mx-space-lg -mt-space-lg px-space-lg py-2.5 border-b border-outline-variant">
            <div className="flex items-center gap-space-xs font-label-caps text-label-caps text-outline tracking-wider">
              <span className="material-symbols-outlined text-[14px] text-primary">terminal</span>
              <span>DIAGNOSTIC_TRACE // PROTO_INGRESS_STACK</span>
            </div>
            <div className="flex items-center gap-space-sm font-telemetry-sm text-telemetry-sm text-outline">
              <span className="inline-block w-2 h-2 bg-primary/40" />
              <span>CIDR_MISS</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 font-telemetry-sm text-telemetry-sm select-text">
            <div className="flex items-start gap-space-sm">
              <span className="text-outline shrink-0">[0.0000s]</span>
              <span className="text-on-surface">SYN sent to target endpoint... <span className="text-primary font-medium">TIMEOUT</span></span>
            </div>
            <div className="flex items-start gap-space-sm">
              <span className="text-outline shrink-0">[0.0421s]</span>
              <span className="text-on-surface">Routing engine: table miss in CIDR <span className="text-primary">0.0.0.0/0</span></span>
            </div>
            <div className="flex items-start gap-space-sm">
              <span className="text-outline shrink-0">[0.0425s]</span>
              <span className="text-on-surface">Packet dropped: <span className="text-error font-medium">RST_STREAM_NO_ERROR</span></span>
            </div>
            <div className="flex items-start gap-space-sm">
              <span className="text-outline shrink-0">[0.0500s]</span>
              <span className="text-on-surface">Connection state: <span className="text-primary font-semibold">CLOSED (Code 404)</span></span>
            </div>
          </div>

          <div className="mt-space-md pt-space-xs flex items-center justify-between font-label-caps text-label-caps text-outline border-t border-outline-variant/40">
            <span>TX_PACKETS: 01 // RX_PACKETS: 00</span>
            <span className="text-primary flex items-center gap-1">
              <span className="w-1 h-1 bg-primary" />
              RETRY_BUDGET: EXHAUSTED
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-space-sm w-full justify-center mb-space-xl">
          <Link
            href="/peers"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-lg py-3 bg-primary text-on-primary font-headline-sm text-headline-sm tracking-wide font-semibold hover:bg-gold-warm active:scale-[0.99] transition-all shadow-[0_0_12px_rgba(212,175,55,0.25)]"
          >
            <span className="material-symbols-outlined text-[18px]">hub</span>
            <span>RETURN TO ACTIVE PEERS</span>
          </Link>
          <button
            onClick={() => showToast("ROUTE_DUMP: 0x7FF0_UNASSIGNED_NIC_INTERFACE")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-md py-3 bg-surface-container border border-outline-variant text-on-surface hover:text-primary hover:bg-surface-container-high font-telemetry-sm text-telemetry-sm tracking-wider transition-colors"
          >
            <span className="material-symbols-outlined text-[16px] text-outline">account_tree</span>
            <span>INSPECT ROUTING TABLE</span>
          </button>
          <button
            onClick={() => showToast("KERNEL_RING_BUFFER: DUMPED_TO_LOCAL_VAR")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-md py-3 bg-surface-container border border-outline-variant text-on-surface hover:text-primary hover:bg-surface-container-high font-telemetry-sm text-telemetry-sm tracking-wider transition-colors"
          >
            <span className="material-symbols-outlined text-[16px] text-outline">data_object</span>
            <span>VIEW KERNEL LOGS</span>
          </button>
        </div>

        {/* Control Shortcuts */}
        <div className="w-full max-w-lg flex flex-col items-center">
          <div className="w-full flex items-center gap-space-sm mb-space-md opacity-40">
            <div className="h-px flex-1 bg-outline-variant" />
            <span className="font-label-caps text-label-caps text-outline uppercase tracking-widest">
              CONTROL SHORTCUTS
            </span>
            <div className="h-px flex-1 bg-outline-variant" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-space-md gap-y-space-xs font-telemetry-sm text-telemetry-sm text-outline">
            <Link href="/transfers" className="hover:text-primary transition-colors flex items-center gap-1.5 py-1">
              <span className="material-symbols-outlined text-[14px]">swap_horiz</span>
              <span>Transfer Console</span>
            </Link>
            <span>&bull;</span>
            <Link href="/vault" className="hover:text-primary transition-colors flex items-center gap-1.5 py-1">
              <span className="material-symbols-outlined text-[14px]">key</span>
              <span>Key Ring &amp; Vault</span>
            </Link>
            <span>&bull;</span>
            <Link href="/diagnostics" className="hover:text-primary transition-colors flex items-center gap-1.5 py-1">
              <span className="material-symbols-outlined text-[14px]">network_ping</span>
              <span>Socket Diagnostics</span>
            </Link>
            <span>&bull;</span>
            <button
              onClick={() => showToast("MDNS_MULTICAST: PROBING 224.0.0.251:5353...")}
              className="hover:text-primary transition-colors flex items-center gap-1.5 py-1"
            >
              <span className="material-symbols-outlined text-[14px]">radar</span>
              <span>mDNS Discovery</span>
            </button>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-12 right-margin z-50 flex items-center gap-space-sm bg-surface-container-highest border border-primary px-space-md py-space-sm shadow-2xl animate-fade-in">
          <span className="w-2 h-2 bg-primary animate-pulse" />
          <span className="font-telemetry-sm text-telemetry-sm text-primary font-mono">{toastMsg}</span>
        </div>
      )}
    </div>
  );
}
