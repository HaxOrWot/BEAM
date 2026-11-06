"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/logo/Logo";
import { Search, UserCheck, LogOut, ChevronDown, Send, Shield } from "lucide-react";
import { useBeamStore } from "@/lib/store";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoaded, logout } = useBeamStore();
  const [queryHandle, setQueryHandle] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (queryHandle.trim()) {
      const target = queryHandle.replace(/^@/, "").trim();
      if (user.isLoggedIn) {
        router.push(`/dashboard?target=${encodeURIComponent(target)}`);
      } else {
        router.push(`/signup?handle=${encodeURIComponent(target)}`);
      }
    }
  };

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    router.push("/");
  };

  const navLinks = [
    { label: "Overview", href: "/" },
    { label: "Send by @Username", href: user.isLoggedIn ? "/dashboard" : "/login" },
    { label: "Transfers & Vault", href: user.isLoggedIn ? "/dashboard" : "/login" },
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
          {isLoaded && user.isLoggedIn && user.handle ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 bg-surface-container px-3.5 py-1.5 rounded-full hover:bg-surface-container-high transition-colors border border-white/10"
              >
                <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-mono text-xs font-semibold">
                  {user.handle.slice(0, 2).toUpperCase()}
                </div>
                <span className="font-mono text-xs text-on-surface font-medium">@{user.handle}</span>
                <UserCheck className="w-3.5 h-3.5 text-secondary" />
                <ChevronDown className="w-3 h-3 text-outline" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-surface-container-low border border-white/10 rounded-2xl p-2 shadow-2xl z-50 flex flex-col gap-1 backdrop-blur-xl">
                  <div className="px-3 py-2 border-b border-white/5 mb-1">
                    <div className="font-mono text-xs text-on-surface font-semibold truncate">
                      @{user.handle}
                    </div>
                    <div className="font-mono text-[10px] text-outline">
                      Node #{user.nodeId || "001"} • {user.plan.toUpperCase()}
                    </div>
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-on-surface hover:bg-surface-container transition-colors"
                  >
                    <Send className="w-3.5 h-3.5 text-primary" />
                    <span>Transfer Dashboard</span>
                  </Link>

                  <Link
                    href="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-on-surface hover:bg-surface-container transition-colors"
                  >
                    <Shield className="w-3.5 h-3.5 text-secondary" />
                    <span>Personal Vault</span>
                  </Link>

                  <div className="border-t border-white/5 my-1" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-error hover:bg-error/10 transition-colors w-full text-left"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="text-sm font-heading text-on-surface-variant hover:text-on-surface px-3 py-1.5 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="text-sm font-heading bg-primary-container text-on-primary-container px-4 py-1.5 rounded-full hover:bg-primary hover:text-on-primary transition-all font-medium shadow-sm"
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
