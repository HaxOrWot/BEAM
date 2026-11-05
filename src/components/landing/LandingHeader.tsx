"use client";

import React, { useState } from "react";
import Link from "next/link";

export const LandingHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md border-b border-surface-container-high">
      <div className="h-14 w-full px-margin flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-space-lg">
          <Link
            href="/"
            className="font-label-caps text-label-caps uppercase tracking-wider text-primary flex items-center gap-space-xs"
          >
            <span className="w-2 h-2 bg-primary inline-block" />
            <span>PROTO/TCP</span>
          </Link>
          <div className="hidden md:block h-4 w-px bg-surface-container-high" />
          <span className="hidden lg:inline-block font-label-caps text-label-caps uppercase text-outline tracking-wider">
            KERNEL STREAM PIPELINE RFC 9293
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-space-lg font-body-sm text-body-sm text-on-surface-variant">
          <a href="#overview" className="hover:text-on-surface transition-colors">
            Overview
          </a>
          <a href="#specs" className="hover:text-on-surface transition-colors">
            Specifications
          </a>
          <a href="#wire-test" className="hover:text-on-surface transition-colors">
            Wire Test
          </a>
          <Link href="/transfers" className="hover:text-primary transition-colors text-on-surface flex items-center gap-1 font-medium">
            <span>Console</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          </Link>
          <Link href="/peers" className="hover:text-on-surface transition-colors">
            Peers
          </Link>
          <Link href="/vault" className="hover:text-on-surface transition-colors">
            Vault
          </Link>
          <Link href="/diagnostics" className="hover:text-on-surface transition-colors">
            Diagnostics
          </Link>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-space-sm">
          <Link
            href="/transfers"
            className="px-space-md py-1.5 font-label-caps text-label-caps uppercase tracking-wider font-semibold transition-colors flex items-center gap-space-xs"
            style={{
              backgroundColor: "rgb(223, 189, 105)",
              color: "rgb(19, 19, 19)",
              boxShadow: "rgba(223, 189, 105, 0.3) 0px 0px 12px",
            }}
          >
            <span className="material-symbols-outlined text-[15px]">terminal</span>
            <span>ENTER CONSOLE</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 border border-outline-variant text-primary"
            aria-label="Toggle Navigation"
          >
            <span className="material-symbols-outlined text-[18px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-surface-container-high bg-surface-container-lowest p-4 flex flex-col gap-3 font-body-sm">
          <a href="#overview" onClick={() => setMobileMenuOpen(false)} className="py-1 text-on-surface">Overview</a>
          <a href="#specs" onClick={() => setMobileMenuOpen(false)} className="py-1 text-on-surface">Specifications</a>
          <a href="#wire-test" onClick={() => setMobileMenuOpen(false)} className="py-1 text-on-surface">Wire Test</a>
          <Link href="/transfers" onClick={() => setMobileMenuOpen(false)} className="py-1 text-primary font-medium flex items-center gap-2">
            <span>Transfer Console</span>
            <span className="px-1.5 py-0.5 bg-surface-container-high text-[10px] text-primary">LIVE</span>
          </Link>
          <Link href="/peers" onClick={() => setMobileMenuOpen(false)} className="py-1 text-on-surface">P2P Mesh Peers</Link>
          <Link href="/vault" onClick={() => setMobileMenuOpen(false)} className="py-1 text-on-surface">Key Ring &amp; Vault</Link>
          <Link href="/diagnostics" onClick={() => setMobileMenuOpen(false)} className="py-1 text-on-surface">Kernel Diagnostics</Link>
          <Link href="/auth" onClick={() => setMobileMenuOpen(false)} className="py-1 text-on-surface">Node Authentication</Link>
        </div>
      )}
    </header>
  );
};
