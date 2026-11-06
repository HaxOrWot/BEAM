import React from "react";
import Link from "next/link";
import { Logo } from "@/components/logo/Logo";
import { ShieldCheck, Activity } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-surface-container-low border-t border-white/5 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Logo size={28} />
          <p className="text-xs text-on-surface-variant max-w-sm text-center md:text-left">
            Frictionless, end-to-end encrypted direct file transmission to cryptographic identity handles.
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs text-on-surface-variant font-mono">
          <div className="flex items-center gap-1.5 text-secondary">
            <Activity className="w-3.5 h-3.5" />
            <span>Protocol v4.2 Mesh Active</span>
          </div>
          <div className="flex items-center gap-1.5 text-primary">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zero-Storage Intermediary</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-outline">
          <Link href="/privacy" className="hover:text-on-surface transition-colors">
            Privacy
          </Link>
          <span>•</span>
          <Link href="/terms" className="hover:text-on-surface transition-colors">
            Terms
          </Link>
          <span>•</span>
          <span>© 2026 Beam Protocol</span>
        </div>
      </div>
    </footer>
  );
};
