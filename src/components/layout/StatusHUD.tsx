"use client";

import React from "react";
import Link from "next/link";
import { Activity, Radio, Cpu, ShieldCheck } from "lucide-react";

export const StatusHUD: React.FC = () => {
  return (
    <aside className="border-b border-surface-high bg-surface-lowest/70 backdrop-blur-sm text-[11px] font-mono text-outline py-1.5 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 text-on-surface">
            <Radio size={12} className="text-primary animate-pulse" />
            <span className="text-[10px] text-outline">MESH:</span>
            <span className="text-primary font-medium">4 PEERS</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Activity size={12} className="text-secondary" />
            <span className="text-[10px] text-outline">RTT:</span>
            <span className="text-primary">0.14 ms</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5">
            <Cpu size={12} className="text-outline" />
            <span className="text-[10px] text-outline">RING BUFFER:</span>
            <span className="text-primary">32.4% / 4 GB</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-outline">
            <ShieldCheck size={12} className="text-primary" />
            <span className="text-[10px] hidden md:inline">CIPHER:</span>
            <span className="text-on-surface text-[10px]">TLS_AES_256_GCM</span>
          </div>

          <Link
            href="/transfers"
            className="text-[10px] text-primary hover:underline uppercase"
          >
            ACTIVE FLUSH: 9.84 Gbps &rarr;
          </Link>
        </div>
      </div>
    </aside>
  );
};
