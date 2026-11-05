"use client";

import React from "react";
import { Badge } from "../ui/Badge";
import { useP2P } from "@/context/P2PContext";
import { ShieldCheck, ArrowDownLeft } from "lucide-react";

export const StreamIngressList: React.FC = () => {
  const { connectionStatus, activePeer, activeInboundStream } = useP2P();

  return (
    <div className="bg-surface-low border border-surface-high p-4 mb-6">
      <div className="flex items-center justify-between pb-3 border-b border-surface-high mb-3">
        <div className="font-mono text-xs font-semibold text-primary uppercase tracking-wider">
          Ingress Stream Connections ({connectionStatus === "CONNECTED" ? "1" : "0"})
        </div>
        <span className="font-mono text-[10px] text-outline">WEBRTC DTLS 1.3 &bull; SYN_FLOOD_PROTECT: ON</span>
      </div>

      <div className="space-y-3">
        {connectionStatus === "CONNECTED" && activePeer ? (
          <div className="p-3 bg-surface-lowest border border-surface-high flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-outline/50 transition-colors">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-surface-high/30 border border-surface-high text-primary mt-0.5">
                <ArrowDownLeft size={14} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-primary font-medium">SOCK_WEBRTC_SCTP</span>
                  <Badge variant="active" size="sm">
                    ESTABLISHED
                  </Badge>
                </div>
                <div className="font-mono text-[11px] text-outline mt-1">
                  Remote Peer: <span className="text-on-surface font-semibold">@{activePeer}</span> &bull; Mode: DIRECT P2P
                </div>
                <div className="font-mono text-[10px] text-on-surface-variant flex items-center gap-1 mt-0.5">
                  <ShieldCheck size={11} className="text-primary" /> DTLS_1.3_AES_256_GCM
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-0 border-surface-high pt-2 sm:pt-0">
              <div className="font-mono text-xs font-medium text-primary">
                {activeInboundStream ? `${activeInboundStream.speedMBps.toFixed(1)} MB/s` : "0.0 MB/s (IDLE)"}
              </div>
              <div className="font-mono text-[10px] text-outline">
                RTT: 4.2 ms (P2P Direct)
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center text-outline font-mono text-xs">
            No active socket pipes established. Connect to a peer in the console to initiate raw stream ingress.
          </div>
        )}
      </div>
    </div>
  );
};
