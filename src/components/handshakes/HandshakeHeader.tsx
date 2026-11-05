"use client";

import React from "react";

export const HandshakeHeader: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md pb-space-lg mb-space-md border-b border-outline-variant/30">
      <div className="flex flex-col gap-space-xs">
        <div className="flex items-center gap-space-sm">
          <span className="w-1.5 h-1.5 bg-primary" />
          <span className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-wider">
            GATEKEEPER / TLS 1.3 PSK
          </span>
          <span className="font-label-caps text-label-caps border border-outline-variant/30 px-space-xs py-0.5 text-primary">
            PORT 9042 // INGRESS
          </span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-medium uppercase">
          Socket Handshakes &amp; Peer Authorizations
        </h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Real-time socket verification queue, ephemeral token approvals, and zero-trust DMA transport gateway.
        </p>
      </div>

      <div className="flex items-center gap-space-sm self-start md:self-end">
        <button
          onClick={() => alert("Stale socket descriptors flushed.")}
          className="px-space-md py-1.5 border border-outline-variant/30 hover:border-primary text-on-surface hover:text-primary font-label-caps text-label-caps uppercase transition-colors flex items-center gap-space-xs tracking-wider"
        >
          <span className="material-symbols-outlined text-[14px]">cleaning_services</span>
          <span>FLUSH STALE SOCKS</span>
        </button>
        <button
          onClick={() => alert("Ingress locked down. Only pre-authorized keys accepted.")}
          className="px-space-md py-1.5 bg-primary text-on-primary hover:bg-gold-warm font-label-caps text-label-caps uppercase font-semibold transition-all flex items-center gap-space-xs tracking-wider shadow-[0_0_12px_rgba(212,175,55,0.25)]"
        >
          <span className="material-symbols-outlined text-[14px]">shield</span>
          <span>LOCKDOWN INGRESS</span>
        </button>
      </div>
    </div>
  );
};
