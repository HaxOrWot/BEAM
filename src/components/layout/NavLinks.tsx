"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavItem {
  label: string;
  href: string;
  tag?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Overview", href: "/" },
  { label: "Transfers", href: "/transfers" },
  { label: "Streams", href: "/streams" },
  { label: "Peers", href: "/peers" },
  { label: "Key Vault", href: "/vault" },
  { label: "Handshakes", href: "/handshakes" },
  { label: "Storage", href: "/storage" },
  { label: "Telemetry", href: "/telemetry" },
  { label: "Diagnostics", href: "/diagnostics" },
  { label: "Auth", href: "/auth", tag: "NODE" },
];

export const NavLinks: React.FC<{ onItemClick?: () => void }> = ({ onItemClick }) => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={`px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors whitespace-nowrap ${
              isActive
                ? "bg-primary text-black font-semibold"
                : "text-on-surface-variant hover:text-primary hover:bg-surface-high/30"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};
