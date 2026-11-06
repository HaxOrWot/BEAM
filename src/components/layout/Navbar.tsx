"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/logo/Logo";
import { Search, UserCheck } from "lucide-react";
import { useBeamStore } from "@/lib/store";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useBeamStore();
  const [queryHandle, setQueryHandle] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (queryHandle.trim()) {
      const target = queryHandle.replace(/^@/, "").trim();
      router.push(`/dashboard?target=${encodeURIComponent(target)}`);
    }
  };

  const navLinks = [
    { label: "Overview", href: "/" },
    { label: "Send by @Username", href: "/dashboard" },
    { label: "Transfers & Vault", href: "/dashboard" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-white/5">
      <div className="h-20 max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
        {/* Brand & Recipient Lookup */}
        <div className="flex items-center gap-6">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <Logo size={34} />
          </Link>

          <form onSubmit={handleSearch} className="hidden xl:flex items-center bg-surface-container-low px-3 py-1.5 rounded-full border border-white/5">
            <Search className="w-4 h-4 text-outline mr-2" />
            <span className="font-mono text-xs text-outline mr-1">@</span>
            <input
              type="text"
              value={queryHandle}
              onChange={(e) => setQueryHandle(e.target.value)}
              placeholder="recipient username"
              className="bg-transparent text-xs text-on-surface placeholder:text-outline font-mono focus:outline-none w-36"
            />
          </form>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-surface-container-low/60 p-1 rounded-full border border-white/5">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-sm font-heading font-medium transition-colors ${
                  isActive
                    ? "bg-primary-container text-on-primary-container"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* User Auth Cluster */}
        <div className="flex items-center gap-3">
          {user.isLoggedIn ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 bg-surface-container px-3 py-1.5 rounded-full hover:bg-surface-container-high transition-colors border border-white/5"
            >
              <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-mono text-xs font-semibold">
                {user.handle.slice(0, 2).toUpperCase()}
              </div>
              <span className="font-mono text-xs text-on-surface">@{user.handle}</span>
              <UserCheck className="w-3.5 h-3.5 text-secondary" />
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="text-sm font-heading text-on-surface-variant hover:text-on-surface px-3 py-1.5"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="text-sm font-heading bg-primary-container text-on-primary-container px-4 py-1.5 rounded-full hover:bg-primary transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
