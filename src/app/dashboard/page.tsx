"use client";

import React, { Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { StatusHeader } from "@/components/dashboard/StatusHeader";
import { TransferStation } from "@/components/dashboard/TransferStation";
import { ActivityDeck } from "@/components/dashboard/ActivityDeck";
import { RoutingTelemetry } from "@/components/dashboard/RoutingTelemetry";

function DashboardContent() {
  const searchParams = useSearchParams();
  const targetParam = searchParams.get("target") || "sarah_design";
  const targetInputRef = useRef<HTMLInputElement>(null);

  const handleNewSendClick = () => {
    targetInputRef.current?.focus();
    targetInputRef.current?.select();
  };

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
            initialRecipient={targetParam}
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
