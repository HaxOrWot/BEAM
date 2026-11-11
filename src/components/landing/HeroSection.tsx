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
  Activity,
  Shield,
  Video,
  Image as ImageIcon,
  FileText,
  Folder,
} from "lucide-react";

export const HeroSection: React.FC = () => {
  const router = useRouter();
  const { user } = useBeamStore();
  const [recipient, setRecipient] = useState("elena");
  const [ttlHours, setTtlHours] = useState(24);
  const [isSending, setIsSending] = useState(false);
  const [demoDone, setDemoDone] = useState(false);
  const [progress, setProgress] = useState(75);
  const [hoveredFile, setHoveredFile] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

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
    {
      id: "f3",
      name: "final_render_comp_04.exr",
      size: "850 MB",
      status: "Ready to stream",
      icon: Video,
      color: "text-tertiary",
      bgColor: "bg-tertiary/10",
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
    <section className="relative w-full max-w-7xl mx-auto px-6 pt-10 pb-24 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-primary-container/20 via-secondary-container/10 to-transparent blur-[120px] pointer-events-none -z-10" />

      {/* Animated particles overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-primary to-secondary opacity-10 animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 12}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Header */}
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto relative z-10">
        {/* Live Velocity Badge */}
        <div className="inline-flex items-center gap-2 bg-surface-container-high px-5 py-2 rounded-full border border-white/10 mb-8 animate-fade-in">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary" />
          </span>
          <span className="font-mono text-xs text-secondary uppercase tracking-widest font-semibold">
            Protocol v5.0 Live
          </span>
          <span className="text-outline text-xs">•</span>
          <span className="text-xs text-on-surface-variant">Zero links. Zero intermediaries.</span>
        </div>

        {/* Title */}
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-on-surface leading-tight animate-fade-in">
          Share files directly to any{" "}
          <span className="bg-gradient-to-r from-primary via-primary-container to-secondary bg-clip-text text-transparent bg-300% animate-gradient-x">
            @username
          </span>
          <br className="sm:hidden" /> instantly.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-on-surface-variant mt-5 max-w-2xl leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
          End-to-end encrypted, zero link clutter, and sub-second P2P routing. Just specify an identity handle and drop your payload.
        </p>

        {/* Micro stats ticker */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8 text-on-surface-variant font-mono text-xs">
          <div className="flex items-center gap-1.5 bg-surface-container px-3 py-1.5 rounded-full border border-white/5 animate-fade-in">
            <Zap className="w-4 h-4 text-secondary" />
            <span>Up to 100 GB Free</span>
          </div>
          <div className="flex items-center gap-1.5 bg-surface-container px-3 py-1.5 rounded-full border border-white/5 animate-fade-in">
            <Lock className="w-4 h-4 text-primary" />
            <span>AES-256-GCM Ephemeral</span>
          </div>
          <div className="flex items-center gap-1.5 bg-surface-container px-3 py-1.5 rounded-full border border-white/5 animate-fade-in">
            <Gauge className="w-4 h-4 text-tertiary" />
            <span>~1.2 GB/s Mesh Velocity</span>
          </div>
        </div>
      </div>

      {/* Interactive Transfer Pod (Landing Page Demo) */}
      <div className="mt-16 max-w-5xl mx-auto relative z-10 animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <div className="relative bg-surface-container/90 backdrop-blur-3xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl overflow-hidden glass-panel-hover hover:shadow-primary/20 transition-all duration-300">
          {/* Sheen line */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Animated corners */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/30 rounded-tl-3xl" />
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-secondary/30 rounded-tr-3xl" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-primary/30 rounded-bl-3xl" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-secondary/30 rounded-br-3xl" />

          {/* Pod Header */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-error/70 inline-block" />
                <span className="w-3 h-3 rounded-full bg-secondary-container/70 inline-block" />
                <span className="w-3 h-3 rounded-full bg-primary/70 inline-block" />
              </div>
              <span className="font-mono text-xs text-outline ml-4">// interactive_transfer_pod.beam</span>
            </div>
            <div className="flex items-center gap-2 bg-surface-container-lowest px-4 py-2 rounded-full border border-white/5 animate-float">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="font-mono text-xs text-secondary font-medium">MESH NODE ACTIVE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Dropzone & File Queue */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div 
                className={`group relative bg-surface-container-low/90 rounded-2xl p-8 flex flex-col items-center justify-center text-center border-2 border-dashed transition-all cursor-pointer hover:bg-primary/5 ${
                  dragActive ? "border-primary bg-primary/10" : "border-white/15"
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragActive(false);
                  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    console.log("Files dropped:", e.dataTransfer.files);
                  }
                }}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-container/20 to-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <div className="font-heading text-xl font-semibold text-on-surface relative z-10">
                  Drop files to beam
                </div>
                <p className="text-xs text-on-surface-variant max-w-xs mt-2 relative z-10">
                  Drag assets directly or click to browse local memory. Payloads stream point-to-point.
                </p>
                <div className="flex items-center gap-3 mt-6 relative z-10">
                  <span className="font-mono text-xs bg-surface-container-highest px-3 py-1.5 rounded-full text-primary-fixed border border-primary/20">
                    Max 100 GB payload
                  </span>
                  <span className="font-mono text-xs bg-surface-container-highest px-3 py-1.5 rounded-full text-secondary-fixed border border-secondary/20">
                    Folder drag enabled
                  </span>
                </div>
              </div>

              <input 
                type="file" 
                multiple 
                ref={fileInputRef}
                className="hidden" 
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    console.log("Files selected:", e.target.files);
                  }
                }}
              />

              {/* Payload Queue */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between px-2">
                  <span className="font-mono text-xs text-outline uppercase tracking-wider">Payload Queue ({mockQueue.length})</span>
                  <span className="font-mono text-xs text-on-surface-variant">{(1.4 + 4.8 + 0.85).toFixed(1)} GB total</span>
                </div>

                {mockQueue.map((file, idx) => {
                  const Icon = file.icon;
                  return (
                    <div
                      key={file.id}
                      className="group relative bg-surface-container-low rounded-2xl p-4 flex items-center justify-between gap-4 border border-white/5 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                      onMouseEnter={() => setHoveredFile(file.id)}
                      onMouseLeave={() => setHoveredFile(null)}
                    >
                      <div className="flex items-center gap-4 min-w-0 flex-1">
                        <div className={`w-12 h-12 rounded-2xl ${file.bgColor} flex items-center justify-center ${file.color} shrink-0 transition-all group-hover:scale-110`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-on-surface truncate">{file.name}</div>
                          <div className="font-mono text-xs text-outline">
                            {file.size} • {file.status}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-secondary" />
                        <button className="text-outline hover:text-error transition-colors p-1.5 hover:bg-error/10 rounded-lg" title="Remove">
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Controls & Dispatch */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-surface-container-low/70 rounded-2xl p-6 border border-white/5 glass-panel-hover transition-all duration-300">
              <div className="flex flex-col gap-6">
                {/* Target Handle Input */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="font-heading text-sm font-semibold text-on-surface">Recipient Identity</label>
                    <span className="font-mono text-xs text-secondary flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary" /> Verified DHT
                    </span>
                  </div>
                  <div className="relative group flex items-center bg-surface-container-lowest rounded-2xl p-3 border border-white/5 focus-within:border-primary/50 focus-within:shadow-lg focus-within:shadow-primary/20 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-on-primary font-mono text-lg shrink-0 shadow-md">
                      @
                    </div>
                    <input
                      type="text"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value.replace(/^@/, ""))}
                      className="w-full bg-transparent px-3 text-sm font-heading text-on-surface focus:outline-none transition-colors"
                      placeholder="username..."
                    />
                    <div className="absolute right-3">
                      <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Quick Collaborator Chips */}
                <div>
                  <div className="font-mono text-xs text-outline mb-3 uppercase tracking-wider">
                    Frequent Collaborators
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["elena", "marcus.dev", "studio_alex"].map((handle) => (
                      <button
                        key={handle}
                        type="button"
                        onClick={() => setRecipient(handle)}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs transition-all ${
                          recipient === handle
                            ? "bg-primary-container/30 text-primary border border-primary/40 shadow-md shadow-primary/20"
                            : "bg-surface-container-highest text-on-surface-variant hover:text-on-surface hover:bg-surface-container border border-white/5"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                        @{handle}
                      </button>
                    ))}
                  </div>
                </div>

                {/* TTL Slider */}
                <div className="bg-surface-container-lowest/80 rounded-2xl p-5 border border-white/5 glass-panel">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-heading text-sm font-semibold text-on-surface flex items-center gap-2">
                      <Timer className="w-4 h-4 text-outline" /> Self-Destruct TTL
                    </span>
                    <span className="font-mono text-xs text-secondary font-medium bg-secondary/10 px-3 py-1 rounded-full">
                      {ttlHours} hours
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="72"
                    value={ttlHours}
                    onChange={(e) => setTtlHours(Number(e.target.value))}
                    className="w-full h-3 bg-surface-container-highest rounded-2xl appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between font-mono text-[10px] text-outline mt-2">
                    <span>1h</span>
                    <span>24h</span>
                    <span>72h</span>
                  </div>
                  <div className="flex items-center gap-2 mt-3 text-xs text-on-surface-variant">
                    <Shield className="w-3 h-3 text-secondary" />
                    <span>Auto-purge after expiration</span>
                  </div>
                </div>

                {/* Security Matrix */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-xl border border-white/5">
                    <span className="flex items-center gap-2">
                      <Fingerprint className="w-4 h-4 text-primary" /> Recipient Handshake
                    </span>
                    <span className="font-mono text-xs text-on-surface bg-primary/10 px-3 py-1 rounded-lg">ED25519 Signed</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-xl border border-white/5">
                    <span className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-secondary" /> Desktop Push Ping
                    </span>
                    <span className="font-mono text-xs text-secondary bg-secondary/10 px-3 py-1 rounded-lg">Immediate</span>
                  </div>
                </div>
              </div>

              {/* Main Action Trigger */}
              <div className="mt-8 flex flex-col gap-4">
                {demoDone && !user.isLoggedIn ? (
                  <Link
                    href={`/signup?handle=${encodeURIComponent(recipient)}`}
                    className="w-full bg-gradient-to-r from-secondary-container to-secondary text-on-secondary hover:shadow-lg hover:shadow-secondary/30 font-heading text-sm font-semibold py-4 px-8 rounded-2xl transition-all flex items-center justify-center gap-3 animate-fade-in"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Demo Complete! Claim Handle to Send Real Files →</span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={handleSendSimulate}
                    disabled={isSending}
                    className="w-full bg-gradient-to-r from-primary-container via-primary to-secondary hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed font-heading text-sm font-semibold py-4 px-8 rounded-2xl transition-all flex items-center justify-center gap-3 animate-gradient-x"
                  >
                    {isSending ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>Streaming to @{recipient}...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>
                          {user.isLoggedIn
                            ? `Open Dashboard to Send to @${recipient}`
                            : `Send Instantly to @${recipient}`}
                        </span>
                        <ArrowRight className="w-5 h-5" />
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
          <div className="mt-8 pt-6 border-t border-white/5">
            <div className="flex items-center justify-between mb-3 text-xs">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full bg-secondary animate-pulse ${isSending ? "animate-spin" : ""}`} />
                <span className="font-heading font-medium text-on-surface">P2P Multi-channel Pipe #8912-B</span>
                <span className="font-mono text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-lg">
                  QUIC + WebRTC
                </span>
              </div>
              <div className="font-mono text-secondary">
                {isSending ? "1.18 GB/s" : "100 MB/s"} • {isSending ? "2.1s" : "Ready"}
              </div>
            </div>
            <div className="w-full bg-surface-container-highest h-3 rounded-full overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-primary via-primary-container to-secondary h-full rounded-full transition-all duration-300 animate-gradient-x"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 font-mono text-[10px] text-outline">
              <span>Upload Progress</span>
              <span>{progress}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: "0.6s" }}>
        {[
          { icon: Shield, title: "End-to-End Encrypted", desc: "AES-256-GCM with ephemeral keys" },
          { icon: Activity, title: "Sub-Second Routing", desc: "Real-time mesh network across 12+ regions" },
          { icon: Zap, title: "Zero Storage", desc: "Files vanish after delivery, no cloud copy" },
        ].map((feature, i) => (
          <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-surface-container-low border border-white/5 hover:border-primary/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <feature.icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading text-sm font-semibold text-on-surface mb-1">{feature.title}</h3>
              <p className="text-xs text-on-surface-variant">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Import for hidden input reference
const fileInputRef: { current: HTMLInputElement | null } = { current: null };
