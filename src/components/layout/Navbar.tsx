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
  const [scrolled, setScrolled] = useState(false);

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

  // Handle scroll for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    <header 
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-surface/90 backdrop-blur-lg border-b border-white/5 shadow-lg" : "bg-surface/80 backdrop-blur-xl border-b border-white/5"
      }`}
    >
      <div className="h-20 max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
        {/* Brand & Recipient Lookup */}
        <div className="flex items-center gap-6">
          <Link href="/" className="hover:opacity-90 transition-opacity transform hover:scale-105">
            <Logo size={36} />
          </Link>

          <form onSubmit={handleSearch} className="hidden xl:flex items-center bg-surface-container px-4 py-2 rounded-full border border-white/10 transition-all focus-within:border-primary/50 focus-within:shadow-md">
            <Search className="w-4 h-4 text-outline mr-2" />
            <span className="font-mono text-xs text-outline mr-1">@</span>
            <input
              type="text"
              value={queryHandle}
              onChange={(e) => setQueryHandle(e.target.value)}
              placeholder="recipient username"
              className="bg-transparent text-xs text-on-surface placeholder:text-outline font-mono focus:outline-none w-40"
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
                className={`px-4 py-1.5 rounded-full text-sm font-heading font-medium transition-all ${
                  isActive
                    ? "bg-primary-container text-on-primary-container shadow-lg shadow-primary/20"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
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
                className="flex items-center gap-2 bg-surface-container px-4 py-2 rounded-full hover:bg-surface-container-high transition-all border border-white/10 hover:shadow-lg group"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-container via-primary to-secondary text-on-primary-container flex items-center justify-center font-mono text-xs font-semibold shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all">
                  {user.handle.slice(0, 2).toUpperCase()}
                </div>
                <span className="font-mono text-xs text-on-surface font-medium hidden sm:inline">@{user.handle}</span>
                <UserCheck className="w-4 h-4 text-secondary" />
                <ChevronDown className={`w-4 h-4 text-outline transition-transform ${menuOpen ? "rotate-180" : ""}`} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-surface-container-low border border-white/10 rounded-2xl p-3 shadow-2xl z-50 flex flex-col gap-2 backdrop-blur-2xl animate-fade-in">
                  <div className="px-4 py-3 border-b border-white/5 mb-1">
                    <div className="font-mono text-sm text-on-surface font-semibold truncate">
                      @{user.handle}
                    </div>
                    <div className="font-mono text-[10px] text-outline mt-0.5">
                      Node #{user.nodeId || "001"} • {user.plan.toUpperCase()}
                    </div>
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-on-surface hover:bg-surface-container transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                      <Send className="w-4 h-4" />
                    </div>
                    <span>Transfer Dashboard</span>
                  </Link>

                  <Link
                    href="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-on-surface hover:bg-surface-container transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                      <Shield className="w-4 h-4" />
                    </div>
                    <span>Personal Vault</span>
                  </Link>

                  <div className="border-t border-white/5 my-1" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-error hover:bg-error/10 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center group-hover:bg-error group-hover:text-on-error transition-colors">
                      <LogOut className="w-4 h-4" />
                    </div>
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="text-sm font-heading text-on-surface-variant hover:text-on-surface px-4 py-2 rounded-full transition-colors hover:bg-surface-container"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="text-sm font-heading bg-gradient-to-r from-primary-container via-primary to-secondary text-on-primary-container px-5 py-2 rounded-full hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all font-medium"
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
