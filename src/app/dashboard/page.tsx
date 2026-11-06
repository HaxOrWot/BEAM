"use client";

import React, { Suspense, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { StatusHeader } from "@/components/dashboard/StatusHeader";
import { TransferStation } from "@/components/dashboard/TransferStation";
import { ActivityDeck } from "@/components/dashboard/ActivityDeck";
import { RoutingTelemetry } from "@/components/dashboard/RoutingTelemetry";
import { useBeamStore } from "@/lib/store";
import { Lock, Sparkles, LogIn } from "lucide-react";

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const targetParam = searchParams.get("target") || "";
  const targetInputRef = useRef<HTMLInputElement>(null);

  const { user, isLoaded } = useBeamStore();

  useEffect(() => {
    if (isLoaded && !user.isLoggedIn) {
      router.replace("/login?redirect=/dashboard");
    }
  }, [isLoaded, user.isLoggedIn, router]);

  const handleNewSendClick = () => {
    targetInputRef.current?.focus();
    targetInputRef.current?.select();
  };

  if (!isLoaded) {
    return (
      <div className="text-center font-mono text-outline py-24 text-xs">
        Checking cryptographic identity node...
      </div>
    );
  }

  if (!user.isLoggedIn) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-6 flex flex-col items-center">
        <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center text-primary mb-4 border border-white/5">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-on-surface">Authentication Required</h2>
        <p className="text-xs text-on-surface-variant mt-2 max-w-sm">
          You must claim a personal @username handle or sign in to access the Beam Transfer Station and encrypted vault.
        </p>
        <div className="flex items-center gap-3 mt-6">
          <Link
            href="/login"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-heading text-xs font-semibold transition-colors border border-white/5"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </Link>
          <Link
            href="/signup"
            className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary font-heading text-xs font-semibold transition-all shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Claim Handle</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full max-w-7xl mx-auto px-6 pb-20 space-y-8"
      suppressHydrationWarning
    >
      {/* Glow Layer */}
      <div className="absolute -top-10 left-1/4 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-24 right-1/4 w-80 h-80 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top HUD */}
      <StatusHeader onNewSendClick={handleNewSendClick} />

      {/* Dual Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Transfer Station */}
        <div className="lg:col-span-7">
          <TransferStation
            initialRecipient={targetParam || "sarah_design"}
            targetInputRef={targetInputRef}
          />
        </div>

        {/* Right Col: Deck & Telemetry */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <ActivityDeck />
          <RoutingTelemetry />
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="text-center font-mono text-outline py-20">Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
