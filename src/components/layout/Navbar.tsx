"use client";

import React, { useState } from "react";
import Link from "next/link";
import { NavLinks } from "./NavLinks";
import { Badge } from "../ui/Badge";
import { Menu, X, Terminal } from "lucide-react";

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur border-b border-surface-high">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-primary uppercase"
          >
            <span className="w-2.5 h-2.5 bg-primary inline-block" />
            <span>PROTO/TCP</span>
          </Link>
          <div className="hidden lg:flex items-center">
            <NavLinks />
          </div>
        </div>

        {/* Right HUD Controls */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <Badge variant="active" size="sm">
              PORT 9293
            </Badge>
            <span className="font-mono text-[10px] text-outline uppercase hidden md:inline">
              DMA: 10 Gbps
            </span>
          </div>

          <Link
            href="/diagnostics"
            className="p-1.5 border border-surface-high text-on-surface-variant hover:text-primary hover:bg-surface-high/30 transition-colors"
            title="Kernel Diagnostics"
          >
            <Terminal size={14} />
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-1.5 border border-surface-high text-primary"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-surface-high bg-surface-lowest p-4">
          <NavLinks onItemClick={() => setMobileOpen(false)} />
        </div>
      )}
    </header>
  );
};
