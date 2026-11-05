import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-surface-high bg-surface-lowest mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="font-mono text-xs font-semibold text-primary uppercase tracking-wider">
            PROTO/TCP ENGINE ARCHITECTURE
          </div>
          <div className="font-mono text-[11px] text-outline mt-1">
            RFC 9293 SYNCHRONOUS KERNEL STREAM PIPELINE &bull; GNU AGPLv3
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-on-surface-variant">
          <Link href="/" className="hover:text-primary transition-colors">
            Architecture
          </Link>
          <Link href="/telemetry" className="hover:text-primary transition-colors">
            Socket State
          </Link>
          <Link href="/peers" className="hover:text-primary transition-colors">
            P2P Mesh
          </Link>
          <Link href="/vault" className="hover:text-primary transition-colors">
            E2EE Vault
          </Link>
          <span className="text-outline text-[10px] hidden sm:inline">
            SEC: TLS_AES_256_GCM_SHA384
          </span>
        </div>
      </div>
    </footer>
  );
};
