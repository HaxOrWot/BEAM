import React from "react";

export const StarkKeyMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-space-lg gap-x-space-xl py-space-lg bg-surface-container-lowest border border-outline-variant/30 px-space-lg">
      <div className="flex flex-col gap-1 border-r border-outline-variant/30 pr-space-md">
        <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider">
          TOTAL BYTES TRANSFERRED
        </span>
        <div className="flex items-baseline gap-space-xs">
          <span
            className="font-metric-xl text-metric-xl font-medium tracking-tight"
            style={{ color: "rgb(223, 189, 105)" }}
          >
            418.2
          </span>
          <span className="font-telemetry-sm text-telemetry-sm text-outline">GB</span>
        </div>
        <span className="font-telemetry-sm text-telemetry-sm text-outline">ZERO CONTEXT SWITCHES</span>
      </div>

      <div className="flex flex-col gap-1 border-r border-outline-variant/30 pr-space-md">
        <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider">
          PACKET RETRANSMIT RATE
        </span>
        <div className="flex items-baseline gap-space-xs">
          <span className="font-metric-xl text-metric-xl text-primary font-medium tracking-tight">0.000</span>
          <span className="font-telemetry-sm text-telemetry-sm text-outline">%</span>
        </div>
        <span className="font-telemetry-sm text-telemetry-sm text-primary font-mono text-[10px]">LINE CONVERGED</span>
      </div>

      <div className="flex flex-col gap-1 border-r border-outline-variant/30 pr-space-md">
        <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider">
          ACTIVE RUNNING STREAMS
        </span>
        <div className="flex items-baseline gap-space-xs">
          <span className="font-metric-xl text-metric-xl text-primary font-medium tracking-tight">3</span>
          <span className="font-telemetry-sm text-telemetry-sm text-outline">SOCKETS</span>
        </div>
        <span className="font-telemetry-sm text-telemetry-sm text-outline">128 IO_URING DEPTH</span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider">
          BBR RTT PACING
        </span>
        <div className="flex items-baseline gap-space-xs">
          <span className="font-metric-xl text-metric-xl text-primary font-medium tracking-tight">0.28</span>
          <span className="font-telemetry-sm text-telemetry-sm text-outline">ms</span>
        </div>
        <span className="font-telemetry-sm text-telemetry-sm text-primary font-mono text-[10px]">JITTER: &plusmn;0.02ms</span>
      </div>
    </div>
  );
};
