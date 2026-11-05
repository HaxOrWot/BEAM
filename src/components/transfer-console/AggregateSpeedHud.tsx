"use client";

import React from "react";
import { useP2P } from "@/context/P2PContext";

export const AggregateSpeedHud: React.FC = () => {
  const { activeOutboundStream, activeInboundStream, activePeer } = useP2P();

  const txSpeed = activeOutboundStream ? activeOutboundStream.speedMBps : 0;
  const rxSpeed = activeInboundStream ? activeInboundStream.speedMBps : 0;
  const aggregate = Math.round((txSpeed + rxSpeed) * 10) / 10;
  const aggregateGbps = Math.round(((aggregate * 8) / 1024) * 100) / 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-space-md">
      {/* Big Gold Metric */}
      <div className="md:col-span-2 bg-surface-container-lowest p-space-lg border border-outline-variant flex flex-col justify-between">
        <span className="font-label-caps text-label-caps uppercase text-outline">
          AGGREGATE HARDWARE WIRE THROUGHPUT
        </span>
        <div className="flex items-baseline gap-space-xs my-space-xs">
          <span
            className="font-metric-xl text-metric-xl font-medium tracking-tight"
            style={{
              color: "rgb(223, 189, 105)",
              textShadow: "rgba(223, 189, 105, 0.35) 0px 0px 16px",
            }}
          >
            {aggregate.toFixed(1)}
          </span>
          <span className="font-headline-sm text-headline-sm text-primary uppercase">
            MB/s
          </span>
        </div>
        <div className="flex items-center gap-space-md font-telemetry-sm text-telemetry-sm text-outline">
          <span>{aggregateGbps} Gbps WIRE RATE</span>
          <span>&bull;</span>
          <span className="text-primary font-semibold">
            {activePeer ? `CONNECTED TO @${activePeer}` : "AWAITING ACTIVE P2P TRANSMISSION"}
          </span>
        </div>
      </div>

      {/* Outbound */}
      <div className="bg-surface-container-lowest p-space-lg border border-outline-variant flex flex-col justify-between">
        <span className="font-label-caps text-label-caps uppercase text-outline">
          OUTBOUND TX STREAM
        </span>
        <div className="flex items-baseline gap-space-xs my-space-xs">
          <span
            className="font-headline-lg text-headline-lg font-medium"
            style={{ color: "rgb(223, 189, 105)" }}
          >
            {txSpeed.toFixed(1)}
          </span>
          <span className="font-telemetry-sm text-telemetry-sm text-primary">MB/s</span>
        </div>
        <span className="font-telemetry-sm text-telemetry-sm text-outline">
          {activeOutboundStream ? `@${activeOutboundStream.peer} TX` : "NO OUTBOUND FLOW"}
        </span>
      </div>

      {/* Inbound */}
      <div className="bg-surface-container-lowest p-space-lg border border-outline-variant flex flex-col justify-between">
        <span className="font-label-caps text-label-caps uppercase text-outline">
          INBOUND RX STREAM
        </span>
        <div className="flex items-baseline gap-space-xs my-space-xs">
          <span className="font-headline-lg text-headline-lg font-medium text-primary">
            {rxSpeed.toFixed(1)}
          </span>
          <span className="font-telemetry-sm text-telemetry-sm text-primary">MB/s</span>
        </div>
        <span className="font-telemetry-sm text-telemetry-sm text-outline">
          {activeInboundStream ? `@${activeInboundStream.peer} RX` : "NO INBOUND FLOW"}
        </span>
      </div>
    </div>
  );
};
