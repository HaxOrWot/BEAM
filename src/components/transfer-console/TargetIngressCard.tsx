"use client";

import React, { useState, useEffect } from "react";
import { useP2P } from "@/context/P2PContext";

export const TargetIngressCard: React.FC = () => {
  const { connectToPeer, connectionStatus, activePeer } = useP2P();
  const [targetUsername, setTargetUsername] = useState("");
  const [peerStatus, setPeerStatus] = useState<"idle" | "searching" | "online" | "offline">("idle");
  const [peerCallsign, setPeerCallsign] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);

  // Debounced peer lookup
  useEffect(() => {
    const clean = targetUsername.trim().toLowerCase().replace(/^@+/, "");
    if (!clean) {
      setPeerStatus("idle");
      setPeerCallsign(null);
      return;
    }

    setPeerStatus("searching");
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/presence/lookup?target=${encodeURIComponent(clean)}`);
        const data = await res.json();
        if (data.found && data.online) {
          setPeerStatus("online");
          setPeerCallsign(data.callsign);
        } else {
          setPeerStatus("offline");
          setPeerCallsign(null);
        }
      } catch (e) {
        setPeerStatus("offline");
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [targetUsername]);

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = targetUsername.trim().toLowerCase().replace(/^@+/, "");
    if (!clean) {
      alert("Please enter a target node username.");
      return;
    }

    setConnecting(true);
    const success = await connectToPeer(clean);
    setConnecting(false);
    if (!success) {
      alert(`Could not establish direct handshake with @${clean}. Ensure the recipient has opened the site.`);
    }
  };

  const isConnected = Boolean(connectionStatus === "CONNECTED" && activePeer);

  return (
    <div className="bg-surface-container-lowest p-space-lg border border-outline-variant flex flex-col gap-space-md">
      <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-[18px] text-primary">lan</span>
          <span className="font-headline-sm text-headline-sm uppercase text-primary tracking-wider font-medium">
            TARGET NODE INGRESS &amp; DIRECT SOCKET PIPE
          </span>
        </div>
        <span className="font-label-caps text-label-caps uppercase text-outline">
          {isConnected ? `ACTIVE P2P TUNNEL: @${activePeer}` : "DISCOVER PEER BY USERNAME"}
        </span>
      </div>

      <form onSubmit={handleConnect} className="grid grid-cols-1 md:grid-cols-4 gap-space-md items-end">
        {/* Username Destination Field */}
        <div className="flex flex-col gap-space-xs md:col-span-3">
          <div className="flex items-center justify-between">
            <label className="font-label-caps text-label-caps uppercase text-outline">
              DESTINATION NODE USERNAME / CALLSIGN
            </label>
            {peerStatus === "searching" && (
              <span className="font-telemetry-sm text-telemetry-sm text-gold-light animate-pulse">
                QUERYING PRESENCE DIRECTORY...
              </span>
            )}
            {peerStatus === "online" && (
              <span className="font-telemetry-sm text-telemetry-sm text-primary flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                PEER ONLINE [{peerCallsign}] // READY FOR STREAM
              </span>
            )}
            {peerStatus === "offline" && (
              <span className="font-telemetry-sm text-telemetry-sm text-outline">
                PEER OFFLINE OR UNREGISTERED
              </span>
            )}
          </div>

          <div className="flex items-center bg-surface-container-low border border-outline-variant px-space-sm h-11 focus-within:border-primary">
            <span className="font-telemetry-sm text-telemetry-sm text-primary pr-space-xs font-bold">@</span>
            <input
              type="text"
              value={targetUsername}
              onChange={(e) => setTargetUsername(e.target.value)}
              className="bg-transparent font-telemetry-md text-telemetry-md text-primary w-full outline-none"
              placeholder="e.g. bob, operator-alpha, sec-lead"
            />
          </div>
        </div>

        {/* Action Button */}
        <div>
          <button
            type="submit"
            disabled={connecting || isConnected}
            className={`w-full h-11 font-headline-sm text-headline-sm uppercase tracking-wider flex items-center justify-center gap-space-xs transition-opacity font-semibold ${
              isConnected
                ? "bg-surface-container text-primary border border-primary cursor-default"
                : "hover:opacity-95"
            }`}
            style={{
              background: isConnected
                ? undefined
                : "linear-gradient(135deg, rgb(223, 189, 105) 0%, rgb(197, 160, 89) 100%)",
              color: isConnected ? undefined : "rgb(19, 19, 19)",
              border: isConnected ? undefined : "1px solid rgb(243, 229, 171)",
              boxShadow: isConnected ? undefined : "rgba(212, 175, 55, 0.25) 0px 0px 16px",
            }}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isConnected ? "check_circle" : "sync_alt"}
            </span>
            <span>
              {connecting
                ? "NEGOTIATING..."
                : isConnected
                ? "PIPE ESTABLISHED"
                : "ESTABLISH DIRECT PIPE"}
            </span>
          </button>
        </div>
      </form>

      {/* Connection Guarantee Strip */}
      <div className="flex flex-wrap items-center justify-between pt-space-xs text-on-surface-variant text-body-sm font-mono border-t border-outline-variant/40">
        <div className="flex items-center gap-space-md">
          <span className="flex items-center gap-1 text-primary">
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            DIRECT WEBRTC SCTP DATACHANNEL (ZERO-RELAY)
          </span>
          <span className="text-outline">&bull;</span>
          <span className="text-on-surface-variant">HARDWARE DTLS 1.3 ENCRYPTED</span>
        </div>
        <span className="text-outline text-xs">
          BACKPRESSURE CAP: 1024 KiB // LOSS TOLERANT
        </span>
      </div>
    </div>
  );
};
