"use client";

import React, { useState } from "react";
import { useP2P } from "@/context/P2PContext";
import { useRouter } from "next/navigation";

export const PeerMeshView: React.FC = () => {
  const router = useRouter();
  const { activePeers, identity, connectToPeer } = useP2P();
  const [algo, setAlgo] = useState<"BBR" | "CUBIC">("BBR");
  const [scanning, setScanning] = useState(false);

  // Other peers excluding local node
  const otherPeers = activePeers.filter((p) => p.username !== identity.username);

  const handleConnectAndTransfer = async (username: string) => {
    await connectToPeer(username);
    router.push("/transfers");
  };

  return (
    <div className="flex flex-col gap-space-xl">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-surface-container-lowest p-space-xl border border-outline-variant flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg shadow-xl">
        <div className="relative z-10 flex flex-col gap-space-xs max-w-2xl">
          <div className="flex items-center gap-space-sm mb-space-xs">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-widest">
              PEER TOPOLOGY // PRESENCE HUB
            </span>
          </div>
          <h1 className="font-display-lg text-display-lg uppercase tracking-tight text-primary font-semibold">
            ACTIVE MESH PEERS &amp; TOPOLOGY
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Real-time peer directory powered by zero-relay WebRTC presence signaling. Connect directly to any active node by username for wire-speed binary streaming.
          </p>
        </div>

        {/* Action Triggers */}
        <div className="relative z-10 flex flex-wrap items-center gap-space-xs">
          <button
            onClick={() => {
              setScanning(true);
              setTimeout(() => {
                setScanning(false);
              }, 600);
            }}
            className="px-space-md py-2 bg-surface-container border border-outline-variant hover:bg-surface-container-high text-primary font-headline-sm text-headline-sm uppercase tracking-wider flex items-center gap-space-xs transition-colors"
          >
            <span className={`material-symbols-outlined text-[16px] ${scanning ? "animate-spin" : ""}`}>
              {scanning ? "refresh" : "radar"}
            </span>
            <span>{scanning ? "SCANNING PRESENCE HUB..." : "Refresh Active Peers"}</span>
          </button>
        </div>
      </div>

      {/* Local Node Inspector HUD Card */}
      <div className="bg-surface-container-lowest p-space-lg border border-outline-variant flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-md">
          <div className="p-space-sm bg-surface-container border border-outline-variant text-primary">
            <span className="material-symbols-outlined text-[24px]">troubleshoot</span>
          </div>
          <div>
            <div className="font-label-caps text-label-caps uppercase text-outline">
              LOCAL HOST NODE
            </div>
            <div className="font-headline-sm text-headline-sm text-primary uppercase font-medium">
              @{identity.username} ({identity.callsign})
            </div>
            <div className="font-telemetry-sm text-telemetry-sm text-on-surface-variant mt-0.5">
              Auth: {identity.authProvider.toUpperCase()} &bull; Key: {identity.publicKeyHex.substring(0, 24)}... &bull; Status: ONLINE
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
            BBR v3 (PACING)
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

      {/* Peer Cards Grid */}
      <div className="flex flex-col gap-space-md">
        <div className="flex items-center justify-between border-b border-outline-variant pb-2">
          <span className="font-label-caps text-label-caps uppercase text-primary font-semibold">
            ONLINE NETWORK PEERS ({otherPeers.length})
          </span>
          <span className="font-telemetry-sm text-telemetry-sm text-outline">
            Open in another tab/window or share link to peer
          </span>
        </div>

        {otherPeers.length === 0 ? (
          <div className="p-12 bg-surface-container-low border border-dashed border-outline-variant text-center flex flex-col items-center justify-center gap-3">
            <span className="material-symbols-outlined text-outline text-[36px]">hub</span>
            <div className="font-headline-sm text-headline-sm text-primary uppercase">
              NO REMOTE PEERS DISCOVERED YET
            </div>
            <p className="font-body-sm text-xs text-on-surface-variant max-w-md">
              To test direct peer-to-peer file sharing, open this website in another browser window or tab. The second session will automatically register and appear right here!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            {otherPeers.map((peer) => (
              <div
                key={peer.username}
                className="p-space-md bg-surface-container-low border border-outline-variant flex flex-col justify-between gap-space-md hover:border-outline transition-colors"
                style={{
                  borderColor: "rgba(212, 175, 55, 0.4)",
                  boxShadow: "rgba(212, 175, 55, 0.05) 0px 0px 14px inset",
                }}
              >
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-headline-sm text-headline-sm text-primary font-medium">
                      @{peer.username}
                    </span>
                    <span
                      className="font-label-caps text-label-caps uppercase px-space-xs py-0.5 border"
                      style={{
                        color: "#DFBD69",
                        borderColor: "rgba(212, 175, 55, 0.4)",
                        backgroundColor: "rgba(212, 175, 55, 0.08)",
                      }}
                    >
                      {peer.callsign}
                    </span>
                  </div>

                  <div className="font-telemetry-sm text-telemetry-sm text-outline">
                    Auth: <span className="text-primary font-medium uppercase">{peer.authProvider}</span> &bull; Status: <span className="text-primary font-semibold">ONLINE</span>
                  </div>
                  <div className="font-mono text-xs text-on-surface-variant truncate">
                    PUBKEY: {peer.publicKey.substring(0, 32)}...
                  </div>
                </div>

                <div className="flex items-center justify-between pt-space-xs border-t border-outline-variant">
                  <span className="font-telemetry-sm text-telemetry-sm text-primary">
                    Transport: WebRTC SCTP
                  </span>
                  <button
                    onClick={() => handleConnectAndTransfer(peer.username)}
                    className="px-space-md py-1 border font-label-caps text-label-caps uppercase font-semibold transition-all hover:opacity-90"
                    style={{
                      backgroundColor: "#DFBD69",
                      color: "#131313",
                      borderColor: "#F3E5AB",
                    }}
                  >
                    Connect &amp; Transfer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
