"use client";

import React, { useState } from "react";

export const TargetIngressCard: React.FC = () => {
  const [targetIp, setTargetIp] = useState("192.88.99.1");
  const [targetPort, setTargetPort] = useState("9042");
  const [mode, setMode] = useState<"dma" | "tls">("dma");
  const [connecting, setConnecting] = useState(false);

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      alert(`SYN-ACK Handshake Established with ${targetIp}:${targetPort} (Mode: ${mode.toUpperCase()})`);
    }, 900);
  };

  return (
    <div className="bg-surface-container-lowest p-space-lg border border-outline-variant flex flex-col gap-space-md">
      <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-[18px] text-primary">lan</span>
          <span className="font-headline-sm text-headline-sm uppercase text-primary tracking-wider font-medium">
            TARGET SOCKET INGRESS
          </span>
        </div>
        <span className="font-label-caps text-label-caps uppercase text-outline">
          EPHEMERAL TUNNEL PORT ASSIGNMENT
        </span>
      </div>

      <form onSubmit={handleConnect} className="grid grid-cols-1 md:grid-cols-4 gap-space-md items-end">
        {/* IP Field */}
        <div className="flex flex-col gap-space-xs md:col-span-2">
          <label className="font-label-caps text-label-caps uppercase text-outline">
            DESTINATION IP ADDRESS (IPv4 / IPv6)
          </label>
          <div className="flex items-center bg-surface-container-low border border-outline-variant px-space-sm h-11">
            <span className="font-telemetry-sm text-telemetry-sm text-outline pr-space-xs">IP:</span>
            <input
              type="text"
              value={targetIp}
              onChange={(e) => setTargetIp(e.target.value)}
              className="bg-transparent font-telemetry-md text-telemetry-md text-primary w-full outline-none"
              placeholder="0.0.0.0"
            />
          </div>
        </div>

        {/* Port Field */}
        <div className="flex flex-col gap-space-xs">
          <label className="font-label-caps text-label-caps uppercase text-outline">
            REMOTE PORT
          </label>
          <div className="flex items-center bg-surface-container-low border border-outline-variant px-space-sm h-11">
            <span className="font-telemetry-sm text-telemetry-sm text-outline pr-space-xs">PORT:</span>
            <input
              type="text"
              value={targetPort}
              onChange={(e) => setTargetPort(e.target.value)}
              className="bg-transparent font-telemetry-md text-telemetry-md text-primary w-full outline-none"
              placeholder="9042"
            />
          </div>
        </div>

        {/* Gold Handshake Button */}
        <div>
          <button
            type="submit"
            disabled={connecting}
            className="w-full h-11 font-headline-sm text-headline-sm uppercase tracking-wider flex items-center justify-center gap-space-xs transition-opacity hover:opacity-95 font-semibold"
            style={{
              background: "linear-gradient(135deg, rgb(223, 189, 105) 0%, rgb(197, 160, 89) 100%)",
              color: "rgb(19, 19, 19)",
              border: "1px solid rgb(243, 229, 171)",
              boxShadow: "rgba(212, 175, 55, 0.25) 0px 0px 16px",
            }}
          >
            <span className="material-symbols-outlined text-[18px]">sync_alt</span>
            <span>{connecting ? "NEGOTIATING..." : "INITIATE HANDSHAKE"}</span>
          </button>
        </div>
      </form>

      {/* Protocol Options */}
      <div className="flex flex-wrap items-center gap-space-lg pt-space-xs text-on-surface-variant text-body-sm font-mono">
        <label className="flex items-center gap-space-xs cursor-pointer">
          <input
            type="radio"
            name="proto-mode"
            checked={mode === "dma"}
            onChange={() => setMode("dma")}
            className="accent-primary"
          />
          <span className="text-on-surface font-medium">KERNEL_BYPASS_DMA (ZERO-COPY)</span>
        </label>
        <label className="flex items-center gap-space-xs cursor-pointer">
          <input
            type="radio"
            name="proto-mode"
            checked={mode === "tls"}
            onChange={() => setMode("tls")}
            className="accent-primary"
          />
          <span className="text-on-surface-variant">ENCRYPTED_TLS_1.3_STREAM</span>
        </label>
      </div>
    </div>
  );
};
