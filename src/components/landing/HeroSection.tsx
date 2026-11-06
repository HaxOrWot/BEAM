"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useBeamStore } from "@/lib/store";
import {
  Zap,
  Lock,
  Gauge,
  UploadCloud,
  FileArchive,
  Film,
  CheckCircle2,
  X,
  Send,
  Timer,
  Fingerprint,
  Bell,
  RefreshCw,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const HeroSection: React.FC = () => {
  const router = useRouter();
  const { user } = useBeamStore();
  const [recipient, setRecipient] = useState("elena");
  const [ttlHours, setTtlHours] = useState(24);
  const [isSending, setIsSending] = useState(false);
  const [demoDone, setDemoDone] = useState(false);
  const [progress, setProgress] = useState(75);

  const mockQueue = [
    {
      id: "f1",
      name: "brand_guidelines_2025_master.zip",
      size: "1.4 GB",
      status: "Ready for handshake",
      icon: FileArchive,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      id: "f2",
      name: "product_launch_reel_prores_4k.mov",
      size: "4.8 GB",
      status: "Direct chunk indexed",
      icon: Film,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
  ];

  const handleSendSimulate = () => {
    if (user.isLoggedIn) {
      router.push(`/dashboard?target=${encodeURIComponent(recipient)}`);
      return;
    }

    setIsSending(true);
    setDemoDone(false);
    setProgress(20);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSending(false);
          setDemoDone(true);
          return 100;
        }
        return prev + 20;
      });
    }, 250);
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 pt-10 pb-20 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-primary-container/20 via-secondary-container/10 to-transparent blur-[120px] pointer-events-none -z-10" />

      {/* Hero Header */}
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Live Velocity Badge */}
        <div className="inline-flex items-center gap-2 bg-surface-container-high px-4 py-1.5 rounded-full border border-white/5 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
          </span>
          <span className="font-mono text-xs text-secondary uppercase tracking-widest font-semibold">
            Protocol v4.2 Live
          </span>
          <span className="text-outline text-xs">•</span>
          <span className="text-xs text-on-surface-variant">Zero links. Zero intermediaries.</span>
        </div>

        {/* Title */}
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-on-surface leading-tight">
          Share files directly to any{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-container to-secondary">
            @username
          </span>{" "}
          instantly.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-on-surface-variant mt-4 max-w-2xl leading-relaxed">
          End-to-end encrypted, zero link clutter, and sub-second P2P routing. Just specify an identity handle and drop your payload.
        </p>

        {/* Micro stats ticker */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-on-surface-variant font-mono text-xs">
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-secondary" />
            <span>Up to 100 GB Free</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-primary" />
            <span>AES-256-GCM Ephemeral</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Gauge className="w-4 h-4 text-tertiary" />
            <span>~1.2 GB/s Mesh Velocity</span>
          </div>
        </div>
      </div>

      {/* Interactive Transfer Pod (Landing Page Demo) */}
      <div className="mt-12 max-w-5xl mx-auto">
        <div className="relative bg-surface-container/80 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl overflow-hidden">
          {/* Sheen line */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Pod Header */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-error/70 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-secondary-container/70 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-primary/70 inline-block" />
              <span className="font-mono text-xs text-outline ml-2">// interactive_transfer_pod.beam</span>
            </div>
            <div className="flex items-center gap-1.5 bg-surface-container-lowest px-3 py-1 rounded-full border border-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="font-mono text-xs text-secondary font-medium">MESH NODE ACTIVE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Dropzone & File Queue */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="group bg-surface-container-low/90 rounded-2xl p-6 flex flex-col items-center justify-center text-center border border-dashed border-white/15 hover:border-primary/50 transition-all cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-primary-container/20 flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <div className="font-heading text-lg font-semibold text-on-surface">
                  Drop files to beam
                </div>
                <p className="text-xs text-on-surface-variant max-w-xs mt-1">
                  Drag assets directly or click to browse local memory. Payloads stream point-to-point.
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <span className="font-mono text-xs bg-surface-container-highest px-2.5 py-1 rounded-full text-primary-fixed">
                    Max 100 GB payload
                  </span>
                  <span className="font-mono text-xs bg-surface-container-highest px-2.5 py-1 rounded-full text-secondary">
                    Folder drag enabled
                  </span>
                </div>
              </div>

              {/* Payload Queue */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between px-1">
                  <span className="font-mono text-xs text-outline uppercase tracking-wider">Payload Queue (2)</span>
                  <span className="font-mono text-xs text-on-surface-variant">6.2 GB total</span>
                </div>

                {mockQueue.map((file) => {
                  const Icon = file.icon;
                  return (
                    <div
                      key={file.id}
                      className="bg-surface-container-low rounded-xl p-3.5 flex items-center justify-between gap-3 border border-white/5"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-9 h-9 rounded-lg ${file.bgColor} flex items-center justify-center ${file.color} shrink-0`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-on-surface truncate">{file.name}</div>
                          <div className="font-mono text-xs text-outline">
                            {file.size} • {file.status}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-secondary" />
                        <button className="text-outline hover:text-error transition-colors p-1" title="Remove">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Controls & Dispatch */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-surface-container-low/70 rounded-2xl p-5 border border-white/5">
              <div className="flex flex-col gap-4">
                {/* Target Handle Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-sm font-heading font-semibold text-on-surface">Recipient Identity</label>
                    <span className="font-mono text-xs text-secondary flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary" /> Verified DHT
                    </span>
                  </div>
                  <div className="flex items-center bg-surface-container-lowest rounded-xl p-1 border border-white/5 focus-within:border-primary/50 transition-colors">
                    <span className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary font-mono text-sm shrink-0">
                      @
                    </span>
                    <input
                      type="text"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value.replace(/^@/, ""))}
                      className="w-full bg-transparent px-3 text-sm font-heading text-on-surface focus:outline-none"
                      placeholder="username..."
                    />
                    <div className="shrink-0 flex items-center pr-2">
                      <span className="w-2 h-2 rounded-full bg-secondary mr-1.5" />
                      <span className="font-mono text-xs text-secondary">ACTIVE</span>
                    </div>
                  </div>
                </div>

                {/* Quick Collaborator Chips */}
                <div>
                  <div className="font-mono text-xs text-outline mb-1.5 uppercase tracking-wider">
                    Frequent Collaborators
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["elena", "marcus.dev", "studio_alex"].map((handle) => (
                      <button
                        key={handle}
                        type="button"
                        onClick={() => setRecipient(handle)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-xs transition-colors ${
                          recipient === handle
                            ? "bg-primary-container/30 text-primary border border-primary/40"
                            : "bg-surface-container-highest text-on-surface-variant hover:text-on-surface border border-white/5"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                        @{handle}
                      </button>
                    ))}
                  </div>
                </div>

                {/* TTL Slider */}
                <div className="bg-surface-container-lowest/80 rounded-xl p-3.5 border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-on-surface flex items-center gap-1.5 font-medium">
                      <Timer className="w-3.5 h-3.5 text-outline" /> Self-Destruct TTL
                    </span>
                    <span className="font-mono text-xs text-secondary font-medium">
                      Expires in {ttlHours} hours
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="72"
                    value={ttlHours}
                    onChange={(e) => setTtlHours(Number(e.target.value))}
                    className="w-full h-1.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between font-mono text-[10px] text-outline mt-1">
                    <span>1 hour</span>
                    <span>24 hours</span>
                    <span>72 hours</span>
                  </div>
                </div>

                {/* Security Matrix */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-on-surface-variant">
                    <span className="flex items-center gap-1.5">
                      <Fingerprint className="w-3.5 h-3.5 text-primary" /> Recipient Handshake
                    </span>
                    <span className="font-mono text-on-surface">ED25519 Signed</span>
                  </div>
                  <div className="flex items-center justify-between text-on-surface-variant">
                    <span className="flex items-center gap-1.5">
                      <Bell className="w-3.5 h-3.5 text-secondary" /> Desktop Push Ping
                    </span>
                    <span className="font-mono text-secondary">Immediate</span>
                  </div>
                </div>
              </div>

              {/* Main Action Trigger */}
              <div className="mt-4 flex flex-col gap-2">
                {demoDone && !user.isLoggedIn ? (
                  <Link
                    href={`/signup?handle=${encodeURIComponent(recipient)}`}
                    className="w-full bg-secondary text-surface font-heading text-sm font-semibold py-3 px-6 rounded-full transition-all flex items-center justify-center gap-2 shadow-lg hover:brightness-110"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Demo Complete! Claim Handle to Send Real Files →</span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={handleSendSimulate}
                    disabled={isSending}
                    className="w-full bg-primary-container hover:bg-primary text-on-primary-container hover:text-on-primary font-heading text-sm font-semibold py-3 px-6 rounded-full transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    {isSending ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Streaming to @{recipient}...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>
                          {user.isLoggedIn
                            ? `Open Dashboard to Send to @${recipient}`
                            : `Send Instantly to @${recipient}`}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
                <div className="text-center font-mono text-[10px] text-outline">
                  Direct encrypted tunnel • No cloud storage copy preserved
                </div>
              </div>
            </div>
          </div>

          {/* Telemetry Bar */}
          <div className="mt-6 pt-4 border-t border-white/5">
            <div className="flex items-center justify-between mb-1.5 text-xs">
              <div className="flex items-center gap-2">
                <RefreshCw className={`w-3.5 h-3.5 text-secondary ${isSending ? "animate-spin" : ""}`} />
                <span className="font-heading font-medium text-on-surface">P2P Multi-channel Pipe #8912-B</span>
                <span className="font-mono text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                  QUIC + WebRTC
                </span>
              </div>
              <div className="font-mono text-secondary">
                1.18 GB/s • ETA {isSending ? "2.1s" : "Ready"}
              </div>
            </div>
            <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-primary via-primary-container to-secondary h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
