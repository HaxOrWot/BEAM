import React from "react";
import Link from "next/link";

export const LandingFooter: React.FC = () => {
  return (
    <footer className="w-full border-t border-surface-container-high bg-surface-container-lowest">
      <div className="w-full px-margin py-space-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
        <div className="flex flex-col gap-space-xs">
          <div className="font-label-caps text-label-caps uppercase tracking-wider text-primary">
            PROTO/TCP ENGINE ARCHITECTURE
          </div>
          <div className="font-telemetry-sm text-telemetry-sm text-outline">
            RFC 9293 SYNCHRONOUS KERNEL STREAM PIPELINE &bull; GNU AGPLv3
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-space-lg font-body-sm text-body-sm text-on-surface-variant">
          <Link href="#overview" className="hover:text-on-surface transition-colors">
            Architecture
          </Link>
          <Link href="/telemetry" className="hover:text-on-surface transition-colors">
            Socket State
          </Link>
          <Link href="/peers" className="hover:text-on-surface transition-colors">
            P2P Mesh
          </Link>
          <Link href="/vault" className="hover:text-on-surface transition-colors">
            E2EE Vault
          </Link>
          <span className="font-telemetry-sm text-telemetry-sm text-outline hidden sm:inline">
            SEC: TLS_AES_256_GCM_SHA384
          </span>
        </div>
      </div>
    </footer>
  );
};
