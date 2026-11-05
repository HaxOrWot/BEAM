"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const LandingHero: React.FC = () => {
  const router = useRouter();
  const [authType, setAuthType] = useState<"ed25519" | "daemon">("ed25519");
  const [credential, setCredential] = useState("ed25519_sk_8f7b2c90a1e34589d89ffac0132");
  const [showPassword, setShowPassword] = useState(false);
  const [fidoAlert, setFidoAlert] = useState<string | null>(null);

  const handleFido = () => {
    setFidoAlert("FIDO2 Security Key Handshake Approved. Redirecting to socket...");
    setTimeout(() => {
      router.push("/transfers");
    }, 1200);
  };

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/transfers");
  };

  return (
    <section id="overview" className="w-full px-margin pt-space-xl pb-space-lg">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
        {/* Left Focus Column (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-space-md">
          {/* Security Tag */}
          <div className="flex items-center gap-space-xs font-label-caps text-label-caps uppercase text-outline">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>SEC: TLS_AES_256_GCM_SHA384</span>
            <span>&bull;</span>
            <span className="text-primary">KERNEL 6.12+ BYPASS</span>
          </div>

          {/* Headline */}
          <h1 className="font-display-lg text-display-lg text-primary tracking-tight font-semibold max-w-2xl uppercase">
            Zero-Relay TCP/IP File Transfers.
          </h1>

          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
            Direct socket-to-socket streaming at wire speed. Bypassing cloud intermediaries, storage buckets, and rate limits with end-to-end cryptographic integrity.
          </p>

          {/* Live Socket Stream Benchmark Micro-Widget */}
          <div className="mt-space-md bg-surface-container-low p-space-lg border border-surface-container-high flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[18px]">speed</span>
                <span className="font-label-caps text-label-caps uppercase text-on-surface font-medium">
                  SYNTHETIC LOOPBACK BENCHMARK
                </span>
              </div>
              <div className="flex items-center gap-space-xs font-telemetry-sm text-telemetry-sm text-outline">
                <span>LATENCY:</span>
                <span className="font-medium font-mono" style={{ color: "rgb(223, 189, 105)" }}>
                  0.14 ms
                </span>
              </div>
            </div>

            {/* Segmented Progress & Packet Rail */}
            <div className="flex flex-col gap-space-xs">
              <div className="h-2 w-full bg-surface-container-highest flex gap-0.5">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="h-full bg-primary flex-1" />
                ))}
                <div className="h-full bg-surface-variant flex-1 animate-pulse" />
                <div className="h-full bg-surface-container flex-1" />
                <div className="h-full bg-surface-container flex-1" />
              </div>
              <div className="flex justify-between font-telemetry-sm text-telemetry-sm text-outline">
                <span>BUFFER: 64MB SLIDING RING</span>
                <span className="text-on-surface font-medium">9.82 Gbps / 10 Gbps (98.2%)</span>
              </div>
            </div>

            {/* Live Network Oscilloscope Sparkline */}
            <div className="h-14 w-full bg-surface-container-lowest p-1.5 flex items-end">
              <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 300 40">
                <defs>
                  <linearGradient id="goldLineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#C5A059" />
                    <stop offset="50%" stopColor="#DFBD69" />
                    <stop offset="100%" stopColor="#F3E5AB" />
                  </linearGradient>
                  <linearGradient id="goldAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#DFBD69" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#DFBD69" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 35 L20 32 L40 34 L60 20 L80 18 L100 22 L120 12 L140 14 L160 8 L180 9 L200 6 L220 7 L240 5 L260 6 L280 4 L300 4"
                  stroke="url(#goldLineGrad)"
                  strokeLinecap="square"
                  strokeWidth="1.5"
                />
                <path
                  d="M0 35 L20 32 L40 34 L60 20 L80 18 L100 22 L120 12 L140 14 L160 8 L180 9 L200 6 L220 7 L240 5 L260 6 L280 4 L300 4 L300 40 L0 40 Z"
                  fill="url(#goldAreaGrad)"
                />
              </svg>
            </div>
          </div>

          {/* Wire Infrastructure Architectural Imagery from Stitch */}
          <div className="relative w-full h-44 overflow-hidden mt-space-sm bg-surface-container-lowest border border-surface-container-high group">
            <div
              className="w-full h-full bg-cover bg-center grayscale contrast-125 opacity-70 group-hover:opacity-90 transition-opacity duration-300"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAtdiDakKlFmXrZCv4QY6GFPgMUhbsDi6w-H_XKegDLz_nQeVXq-jOGDPJ8p75J3GC7-WSBJDjnpiEXNym12rIZynb298TO7Gd7Qws-Q3sg3FXyyUW2o9OTq5MnoEOsAA0l8wGf39H4fh-2M9VQmLmUxiS88k9GoAEUS_VQ-ZzrsZ9qUPG_w0G1IhIGMZ9t-myZlJduGvsDSQD29wSQv2a9YSWswDJjJeBkSo-Z88z9')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent" />
            <div className="absolute bottom-space-md left-space-md flex items-center gap-space-md">
              <span className="font-label-caps text-label-caps uppercase bg-surface/90 text-primary px-space-xs py-0.5 border border-surface-container-high">
                TOPOLOGY: POINT-TO-POINT
              </span>
              <span className="font-telemetry-sm text-telemetry-sm text-on-surface-variant font-mono">
                HOST: AWS-US-EAST-1A &lt;-&gt; EQUINIX-TY8
              </span>
            </div>
          </div>
        </div>

        {/* Right Focus Column: Authentication & Socket Card (5 Cols) */}
        <div className="lg:col-span-5 bg-surface-container-low p-space-xl border border-surface-container-high flex flex-col gap-space-lg relative shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-label-caps text-label-caps uppercase text-outline">
                SOCKET AUTHENTICATION
              </span>
              <span className="font-headline-sm text-headline-sm text-primary font-medium">
                Node Handshake
              </span>
            </div>
            <span className="font-telemetry-sm text-telemetry-sm px-space-xs py-0.5 bg-surface-container text-on-surface border border-surface-container-high font-mono">
              PORT 9042
            </span>
          </div>

          {/* Auth Tabs Segment */}
          <div className="grid grid-cols-2 bg-surface-container-lowest p-1 gap-1 border border-surface-container-high">
            <button
              type="button"
              onClick={() => {
                setAuthType("ed25519");
                setCredential("ed25519_sk_8f7b2c90a1e34589d89ffac0132");
              }}
              className={`py-space-xs text-center font-label-caps text-label-caps uppercase transition-colors ${
                authType === "ed25519"
                  ? "bg-primary text-on-primary font-semibold"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Ed25519 Key
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthType("daemon");
                setCredential("/var/run/prototcp/daemon.sock");
              }}
              className={`py-space-xs text-center font-label-caps text-label-caps uppercase transition-colors ${
                authType === "daemon"
                  ? "bg-primary text-on-primary font-semibold"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Daemon IPC
            </button>
          </div>

          {/* Authentication Form */}
          <form onSubmit={handleConnect} className="flex flex-col gap-space-md">
            <div className="flex flex-col gap-space-xs">
              <div className="flex justify-between items-center">
                <label className="font-label-caps text-label-caps uppercase text-outline">
                  {authType === "ed25519" ? "SIGNING PRIVATE KEY (BASE64)" : "DAEMON IPC SOCKET PATH"}
                </label>
                <span className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                  {authType === "ed25519" ? "CURVE25519" : "UNIX_DOMAIN_DOCK"}
                </span>
              </div>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant px-space-md py-space-sm font-telemetry-sm text-telemetry-sm text-primary focus:border-primary outline-none transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-space-sm text-outline hover:text-primary transition-colors flex items-center"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {/* Daemon Token Field */}
            {authType === "daemon" && (
              <div className="flex flex-col gap-space-xs">
                <div className="flex justify-between items-center">
                  <label className="font-label-caps text-label-caps uppercase text-outline">
                    AUTHORIZATION TOKEN
                  </label>
                  <span className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                    BEARER
                  </span>
                </div>
                <input
                  type="text"
                  defaultValue="tk_live_99a812bf001a"
                  className="w-full bg-surface-container-lowest border border-outline-variant px-space-md py-space-sm font-telemetry-sm text-telemetry-sm text-primary focus:border-primary outline-none transition-colors"
                />
              </div>
            )}

            {/* Connect Submit Button */}
            <button
              type="submit"
              className="w-full py-space-sm bg-primary text-on-primary font-headline-sm text-headline-sm uppercase tracking-wider font-semibold hover:bg-surface-tint transition-colors shadow-sm flex items-center justify-center gap-space-xs"
            >
              <span className="material-symbols-outlined text-[18px]">lock_open</span>
              <span>Enter Streaming Node Session</span>
            </button>
          </form>

          {/* FIDO2 Trigger Button */}
          <div className="flex flex-col gap-space-xs pt-space-xs border-t border-surface-container-highest">
            <button
              type="button"
              onClick={handleFido}
              className="w-full py-space-xs border border-outline-variant text-on-surface hover:text-primary hover:border-primary font-label-caps text-label-caps uppercase tracking-wider transition-colors flex items-center justify-center gap-space-xs bg-surface-container"
            >
              <span className="material-symbols-outlined text-[16px]">fingerprint</span>
              <span>Authenticate with FIDO2 / Hardware Key</span>
            </button>

            {fidoAlert && (
              <div className="p-space-xs bg-surface-container-high border border-primary text-primary font-telemetry-sm text-telemetry-sm text-center">
                {fidoAlert}
              </div>
            )}
          </div>

          {/* Quick link into Console */}
          <div className="flex items-center justify-between pt-space-xs border-t border-surface-container-highest">
            <span className="font-label-caps text-label-caps text-outline uppercase">
              OR EXPLORE DIRECT CONSOLE:
            </span>
            <Link
              href="/transfers"
              className="font-label-caps text-label-caps uppercase text-primary hover:underline font-semibold flex items-center gap-1"
            >
              <span>Transfer Console</span> &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
