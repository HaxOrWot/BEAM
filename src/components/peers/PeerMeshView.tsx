"use client";

import React, { useState } from "react";

interface PeerItem {
  id: string;
  name: string;
  category: "lan" | "wan" | "overlay";
  ip: string;
  port: number;
  rtt: string;
  protocol: string;
  media: string;
  speed: string;
  status: "ONLINE" | "SYNCING";
  gold?: boolean;
}

const PEER_DATA: PeerItem[] = [
  {
    id: "p1",
    name: "ALPHA-RELAY-NYC",
    category: "wan",
    ip: "192.88.99.1",
    port: 9042,
    rtt: "4.2 ms",
    protocol: "TLS 1.3 / CHACHA20",
    media: "FIBER WAN",
    speed: "428.4 MB/s",
    status: "ONLINE",
    gold: true,
  },
  {
    id: "p2",
    name: "LOCAL-WORKSTATION",
    category: "lan",
    ip: "10.0.4.12",
    port: 9042,
    rtt: "0.8 ms",
    protocol: "DIRECT TCP STREAM",
    media: "10GbE SFP+",
    speed: "890.1 MB/s",
    status: "ONLINE",
    gold: true,
  },
  {
    id: "p3",
    name: "TOKYO-EDGE-01",
    category: "wan",
    ip: "203.0.113.88",
    port: 9042,
    rtt: "38.4 ms",
    protocol: "TLS 1.3 / AES-256",
    media: "TRANS-PACIFIC",
    speed: "112.0 MB/s",
    status: "ONLINE",
  },
  {
    id: "p4",
    name: "BACKUP-VAULT-DOCK",
    category: "overlay",
    ip: "127.0.0.1",
    port: 9042,
    rtt: "0.02 ms",
    protocol: "UNIX IPC / SHARED DMA",
    media: "LOOPBACK SHM",
    speed: "1,420 MB/s",
    status: "ONLINE",
  },
];

export const PeerMeshView: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "lan" | "wan" | "overlay">("all");
  const [selectedPeer, setSelectedPeer] = useState<PeerItem>(PEER_DATA[0]);
  const [algo, setAlgo] = useState<"BBR" | "CUBIC">("BBR");
  const [scanning, setScanning] = useState(false);

  const filtered = filter === "all" ? PEER_DATA : PEER_DATA.filter((p) => p.category === filter);

  return (
    <div className="flex flex-col gap-space-xl">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-surface-container-lowest p-space-xl border border-outline-variant flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg shadow-xl">
        <div className="relative z-10 flex flex-col gap-space-xs max-w-2xl">
          <div className="flex items-center gap-space-sm mb-space-xs">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-widest">
              PEER TOPOLOGY // MESH ENGINE
            </span>
          </div>
          <h1 className="font-display-lg text-display-lg uppercase tracking-tight text-primary font-semibold">
            ACTIVE MESH PEERS &amp; TOPOLOGY
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Zero-relay peer-to-peer raw TCP interconnect. Direct socket communication over LAN, WAN, and ZeroTier overlays with hardware pacing.
          </p>
        </div>

        {/* Action Triggers */}
        <div className="relative z-10 flex flex-wrap items-center gap-space-xs">
          <button
            onClick={() => {
              setScanning(true);
              setTimeout(() => {
                setScanning(false);
                alert("mDNS Discovery Scan Complete: 1 candidate node detected (192.168.1.189:9042)");
              }, 1200);
            }}
            className="px-space-md py-2 bg-surface-container border border-outline-variant hover:bg-surface-container-high text-primary font-headline-sm text-headline-sm uppercase tracking-wider flex items-center gap-space-xs transition-colors"
          >
            <span className={`material-symbols-outlined text-[16px] ${scanning ? "animate-spin" : ""}`}>
              {scanning ? "refresh" : "radar"}
            </span>
            <span>{scanning ? "SCANNING SUBNET..." : "Discover LAN Nodes (mDNS)"}</span>
          </button>

          <button
            onClick={() => {
              const ip = prompt("Enter Target Node IP:Port", "192.168.1.200:9042");
              if (ip) alert(`Dispatched TCP SYN Handshake to ${ip}`);
            }}
            className="px-space-md py-2 bg-surface-container border border-outline-variant hover:bg-surface-container-high text-primary font-headline-sm text-headline-sm uppercase tracking-wider flex items-center gap-space-xs transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">add_link</span>
            <span>Connect Static IP</span>
          </button>

          <button
            onClick={() => alert("ICMP / TCP Ping Suite Executed: All peers responding with nominal jitter.")}
            className="px-space-md py-2 font-headline-sm text-headline-sm uppercase tracking-wider flex items-center gap-space-xs transition-opacity font-semibold"
            style={{
              background: "linear-gradient(135deg, rgb(223, 189, 105) 0%, rgb(197, 160, 89) 100%)",
              color: "rgb(19, 19, 19)",
              border: "1px solid rgb(243, 229, 171)",
            }}
          >
            <span className="material-symbols-outlined text-[16px]">speed</span>
            <span>Run Ping Test</span>
          </button>
        </div>
      </div>

      {/* Socket Inspector HUD Card */}
      <div className="bg-surface-container-lowest p-space-lg border border-outline-variant flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-md">
          <div className="p-space-sm bg-surface-container border border-outline-variant text-primary">
            <span className="material-symbols-outlined text-[24px]">troubleshoot</span>
          </div>
          <div>
            <div className="font-label-caps text-label-caps uppercase text-outline">
              ACTIVE INSPECTOR TARGET
            </div>
            <div className="font-headline-sm text-headline-sm text-primary uppercase font-medium">
              {selectedPeer.name} ({selectedPeer.ip}:{selectedPeer.port})
            </div>
            <div className="font-telemetry-sm text-telemetry-sm text-on-surface-variant mt-0.5">
              Protocol: {selectedPeer.protocol} &bull; RTT: {selectedPeer.rtt} &bull; Wire Speed: {selectedPeer.speed}
            </div>
          </div>
        </div>

        {/* Congestion Control Toggle Switch */}
        <div className="flex items-center gap-space-xs bg-surface-container-low p-1 border border-outline-variant">
          <button
            onClick={() => setAlgo("BBR")}
            className={`px-space-md py-1 font-label-caps text-label-caps uppercase transition-colors ${
              algo === "BBR" ? "bg-primary text-black font-semibold" : "text-outline hover:text-primary"
            }`}
          >
            BBR v3 (MODEL-BASED)
          </button>
          <button
            onClick={() => setAlgo("CUBIC")}
            className={`px-space-md py-1 font-label-caps text-label-caps uppercase transition-colors ${
              algo === "CUBIC" ? "bg-primary text-black font-semibold" : "text-outline hover:text-primary"
            }`}
          >
            CUBIC (LOSS-BASED)
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-space-xs border-b border-outline-variant pb-space-xs">
        {(["all", "lan", "wan", "overlay"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-space-md py-1.5 font-label-caps text-label-caps uppercase tracking-wider transition-colors ${
              filter === tab
                ? "bg-primary text-black font-semibold"
                : "text-on-surface-variant hover:text-primary hover:bg-surface-container"
            }`}
          >
            {tab === "all" ? "All Peers (4)" : `${tab.toUpperCase()} (${PEER_DATA.filter((p) => p.category === tab).length})`}
          </button>
        ))}
      </div>

      {/* Peer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
        {filtered.map((peer) => (
          <div
            key={peer.id}
            className="p-space-md bg-surface-container-low border border-outline-variant flex flex-col justify-between gap-space-md hover:border-outline transition-colors"
            style={
              peer.gold
                ? {
                    borderColor: "rgba(212, 175, 55, 0.4)",
                    boxShadow: "rgba(212, 175, 55, 0.05) 0px 0px 14px inset",
                  }
                : {}
            }
          >
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <span className="font-headline-sm text-headline-sm text-primary font-medium">
                  {peer.name}
                </span>
                <span
                  className="font-label-caps text-label-caps uppercase px-space-xs py-0.5 border"
                  style={
                    peer.gold
                      ? {
                          color: "#DFBD69",
                          borderColor: "rgba(212, 175, 55, 0.4)",
                          backgroundColor: "rgba(212, 175, 55, 0.08)",
                        }
                      : { borderColor: "#444748", color: "#e5e2e1" }
                  }
                >
                  {peer.media}
                </span>
              </div>

              <div className="font-telemetry-sm text-telemetry-sm text-outline">
                {peer.ip}:{peer.port} &bull; Latency: <span className="text-primary font-medium">{peer.rtt}</span>
              </div>
              <div className="font-label-caps text-label-caps text-on-surface-variant uppercase mt-1">
                {peer.protocol}
              </div>
            </div>

            <div className="flex items-center justify-between pt-space-xs border-t border-outline-variant">
              <span className="font-telemetry-sm text-telemetry-sm text-primary">
                Throughput: {peer.speed}
              </span>
              <div className="flex items-center gap-space-xs">
                <button
                  onClick={() => setSelectedPeer(peer)}
                  className="px-space-sm py-1 bg-surface-container border border-outline-variant hover:bg-surface-container-high text-primary font-label-caps text-label-caps uppercase"
                >
                  Inspect
                </button>
                <button
                  onClick={() => alert(`Streaming test chunk to ${peer.name}`)}
                  className="px-space-sm py-1 border font-label-caps text-label-caps uppercase font-semibold"
                  style={{
                    backgroundColor: "#DFBD69",
                    color: "#131313",
                    borderColor: "#F3E5AB",
                  }}
                >
                  Push Payload
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
