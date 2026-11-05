"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { LandingHeader } from "../landing/LandingHeader";
import { LandingFooter } from "../landing/LandingFooter";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLandingPage = pathname === "/";

  if (isLandingPage) {
    return (
      <div suppressHydrationWarning className="bg-surface font-body-lg text-body-lg text-on-surface antialiased min-h-screen flex flex-col justify-between">
        <LandingHeader />
        <main className="pt-14 w-full flex-1 bg-surface">
          {children}
        </main>
        <LandingFooter />
      </div>
    );
  }

  // Console Mode for /transfers, /peers, /vault, /diagnostics, /streams, etc.
  return (
    <div suppressHydrationWarning className="bg-surface font-body-lg text-body-lg text-on-surface antialiased min-h-screen">
      <Header onToggleMobile={() => setMobileOpen(!mobileOpen)} />

      {/* Desktop Fixed Sidebar */}
      <div className="hidden md:block fixed top-16 left-0 bottom-0 z-40">
        <Sidebar />
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
          <div className="w-72 h-full bg-surface-container-lowest">
            <div className="p-4 flex justify-between items-center border-b border-outline-variant">
              <span className="font-headline-sm text-primary uppercase">PROTO/TCP</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1 border border-outline-variant text-primary"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <Sidebar onCloseMobile={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="md:pl-64">
        <main className="relative pt-16 w-full min-h-screen bg-surface">
          {children}
        </main>
      </div>
    </div>
  );
};
