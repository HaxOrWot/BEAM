"use client";

import React from "react";
import { ProgressBar } from "../ui/ProgressBar";
import { Badge } from "../ui/Badge";
import { useP2P } from "@/context/P2PContext";
import { CheckCircle2, Activity } from "lucide-react";

export const TransferList: React.FC = () => {
  const { activeOutboundStream, activeInboundStream } = useP2P();

  const streams = [activeOutboundStream, activeInboundStream].filter(Boolean);

  return (
    <div className="bg-surface-low border border-surface-high p-4 mb-6">
      <div className="flex items-center justify-between pb-3 border-b border-surface-high mb-4">
        <h3 className="font-mono text-xs font-semibold text-primary uppercase tracking-wider">
          Active In-Flight Streams ({streams.length})
        </h3>
        <span className="font-mono text-[10px] text-outline">
          {streams.length > 0 ? "DIRECT WEBRTC SCTP ACTIVE" : "IDLE"}
        </span>
      </div>

      {streams.length === 0 ? (
        <div className="p-6 text-center text-outline font-mono text-xs">
          No streams currently in flight. Connect to a peer and stage a payload above.
        </div>
      ) : (
        <div className="space-y-4">
          {streams.map((xfer) => (
            <div
              key={xfer!.id}
              className="p-3 bg-surface-lowest border border-surface-high hover:border-outline/50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div>
                  <div className="font-mono text-xs font-medium text-primary">
                    {xfer!.name}
                  </div>
                  <div className="font-mono text-[10px] text-outline mt-0.5">
                    Peer: @{xfer!.peer} &bull; Chunks: {xfer!.currentChunk} / {xfer!.totalChunks} (
                    {(xfer!.totalBytes / (1024 * 1024)).toFixed(1)} MB)
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge
                    variant={xfer!.status === "completed" ? "active" : "sync"}
                    size="sm"
                  >
                    {xfer!.status.toUpperCase()}
                  </Badge>
                  {xfer!.status === "completed" ? (
                    <CheckCircle2 size={14} className="text-primary" />
                  ) : (
                    <Activity size={14} className="text-primary animate-pulse" />
                  )}
                </div>
              </div>

              <ProgressBar
                progress={xfer!.progressPercent}
                label={`Throughput: ${xfer!.speedMBps.toFixed(1)} MB/s`}
                speed={`${xfer!.progressPercent}%`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
