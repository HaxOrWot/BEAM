"use client";

import React from "react";
import { ProgressBar } from "../ui/ProgressBar";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { MOCK_TRANSFERS } from "@/lib/mock-data";
import { Pause, CheckCircle2 } from "lucide-react";

export const TransferList: React.FC = () => {
  return (
    <div className="bg-surface-low border border-surface-high p-4 mb-6">
      <div className="flex items-center justify-between pb-3 border-b border-surface-high mb-4">
        <h3 className="font-mono text-xs font-semibold text-primary uppercase tracking-wider">
          Active In-Flight Streams ({MOCK_TRANSFERS.length})
        </h3>
        <span className="font-mono text-[10px] text-outline">
          AGGREGATE: 8.09 Gbps
        </span>
      </div>

      <div className="space-y-4">
        {MOCK_TRANSFERS.map((xfer) => (
          <div
            key={xfer.id}
            className="p-3 bg-surface-lowest border border-surface-high hover:border-outline/50 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div>
                <div className="font-mono text-xs font-medium text-primary">
                  {xfer.fileName}
                </div>
                <div className="font-mono text-[10px] text-outline mt-0.5">
                  Peer: {xfer.peerAlias} &bull; Chunks: {xfer.chunksCompleted} / {xfer.chunksTotal} ({xfer.fileSize})
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge
                  variant={xfer.status === "COMPLETED" ? "active" : "sync"}
                  size="sm"
                >
                  {xfer.status}
                </Badge>
                {xfer.status === "TRANSFERRING" ? (
                  <Button variant="ghost" size="sm" onClick={() => alert(`Paused ${xfer.id}`)}>
                    <Pause size={10} />
                  </Button>
                ) : (
                  <CheckCircle2 size={14} className="text-primary" />
                )}
              </div>
            </div>

            <ProgressBar
              progress={xfer.progress}
              label={`Throughput: ${xfer.speed}`}
              speed={`${xfer.progress}%`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
