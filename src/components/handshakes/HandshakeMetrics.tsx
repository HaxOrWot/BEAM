import React from "react";

export const HandshakeMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-outline-variant/30 mb-space-xl divide-y sm:divide-y-0 sm:divide-x divide-outline-variant/30 bg-surface-container-lowest">
      {/* Metric 1 */}
      <div className="p-space-md flex flex-col justify-between hover:bg-surface-container-low transition-colors">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-wider">
            PENDING HANDSHAKES
          </span>
          <span className="w-1.5 h-1.5 bg-primary animate-pulse" />
        </div>
        <div className="mt-space-md flex items-baseline justify-between">
          <span
            className="font-metric-xl text-metric-xl font-medium tracking-tight"
            style={{ color: "rgb(223, 189, 105)" }}
          >
            4
          </span>
          <span className="font-telemetry-sm text-telemetry-sm text-outline font-mono">QUEUE: POOL_OK</span>
        </div>
      </div>

      {/* Metric 2 */}
      <div className="p-space-md flex flex-col justify-between hover:bg-surface-container-low transition-colors">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-wider">
            ACTIVE VERIFIED SOCKS
          </span>
          <span className="font-telemetry-sm text-telemetry-sm text-primary font-mono text-[10px]">100% HEALTH</span>
        </div>
        <div className="mt-space-md flex items-baseline justify-between">
          <span className="font-metric-xl text-metric-xl text-primary font-medium tracking-tight">12</span>
          <span className="font-telemetry-sm text-telemetry-sm text-outline font-mono">ESTABLISHED</span>
        </div>
      </div>

      {/* Metric 3 */}
      <div className="p-space-md flex flex-col justify-between hover:bg-surface-container-low transition-colors">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-wider">
            REJECTED REPLAYS
          </span>
          <span className="material-symbols-outlined text-outline text-[14px]">block</span>
        </div>
        <div className="mt-space-md flex items-baseline justify-between">
          <span className="font-metric-xl text-metric-xl text-primary font-medium tracking-tight">0</span>
          <span className="font-telemetry-sm text-telemetry-sm text-outline font-mono">EPOCH: 0.00%</span>
        </div>
      </div>

      {/* Metric 4 */}
      <div className="p-space-md flex flex-col justify-between hover:bg-surface-container-low transition-colors">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-wider">
            MEDIAN HANDSHAKE RTT
          </span>
          <span className="font-telemetry-sm text-telemetry-sm text-outline font-mono">SUB-MS</span>
        </div>
        <div className="mt-space-md flex items-baseline justify-between">
          <span className="font-metric-xl text-metric-xl text-primary font-medium tracking-tight">0.38</span>
          <span className="font-telemetry-sm text-telemetry-sm text-outline font-mono">ms</span>
        </div>
      </div>
    </div>
  );
};
