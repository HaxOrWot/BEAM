"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { LandingHeader } from "../landing/LandingHeader";
import { LandingFooter } from "../landing/LandingFooter";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { P2PProvider, useP2P } from "@/context/P2PContext";
import Link from "next/link";

const IncomingStreamToast: React.FC = () => {
  const { incomingPrompt, dismissIncomingPrompt } = useP2P();

  if (!incomingPrompt) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md bg-surface-container-high border-2 border-primary p-4 shadow-2xl flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center justify-between border-b border-outline-variant pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-label-caps text-xs text-primary uppercase font-bold tracking-wider">
            INCOMING DIRECT P2P STREAM
          </span>
        </div>
        <button onClick={dismissIncomingPrompt} className="text-outline hover:text-primary">
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>

      <div className="flex flex-col gap-1 text-xs font-mono">
        <div className="text-on-surface truncate font-medium">
          FILE: {incomingPrompt.fileName}
        </div>
        <div className="text-outline">
          FROM: @{incomingPrompt.sender} &bull; SIZE: {(incomingPrompt.fileSize / (1024 * 1024)).toFixed(1)} MB
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <Link
          href="/transfers"
          onClick={dismissIncomingPrompt}
          className="flex-1 py-1.5 bg-primary text-on-primary font-label-caps text-center text-xs uppercase font-bold hover:bg-gold-warm transition-colors"
        >
          VIEW IN CONSOLE
        </Link>
        <button
          onClick={dismissIncomingPrompt}
          className="px-3 py-1.5 bg-surface-container border border-outline-variant text-outline hover:text-primary text-xs uppercase font-mono"
        >
          DISMISS
        </button>
      </div>
    </div>
  );
};

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLandingPage = pathname === "/";

  return (
    <P2PProvider>
      {isLandingPage ? (
        <div suppressHydrationWarning className="bg-surface font-body-lg text-body-lg text-on-surface antialiased min-h-screen flex flex-col justify-between">
          <LandingHeader />
          <main className="pt-14 w-full flex-1 bg-surface">
            {children}
          </main>
          <LandingFooter />
        </div>
      ) : (
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

          <IncomingStreamToast />
        </div>
      )}
    </P2PProvider>
  );
};
