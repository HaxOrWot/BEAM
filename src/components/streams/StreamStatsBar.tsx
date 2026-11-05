import React from "react";

export const StreamStatsBar: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 border border-outline-variant/30 bg-surface-container-lowest divide-x divide-outline-variant/30">
      {/* Stat 1 */}
      <div className="flex flex-col gap-space-xs p-space-lg" style={{ borderBottom: "2px solid rgb(212, 175, 55)" }}>
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">RX INGRESS</span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        </div>
        <div className="flex items-baseline gap-space-xs my-space-xs">
          <span
            className="font-metric-xl text-metric-xl font-medium tracking-tight"
            style={{ color: "rgb(223, 189, 105)", textShadow: "rgba(223, 189, 105, 0.45) 0px 0px 16px" }}
          >
            1.37
          </span>
          <span className="font-telemetry-sm text-telemetry-sm text-on-surface-variant">GB/s</span>
        </div>
        <div className="flex items-center justify-between font-telemetry-sm text-telemetry-sm text-outline">
          <span>PEAK: 1.84 GB/s</span>
          <span className="text-primary font-mono text-[10px]">LINE RATE: 98%</span>
        </div>
      </div>

      {/* Stat 2 */}
      <div className="flex flex-col gap-space-xs p-space-lg">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">ACTIVE INBOUND</span>
          <span className="font-telemetry-sm text-telemetry-sm text-outline font-mono">TCP / QUIC</span>
        </div>
        <div className="flex items-baseline gap-space-xs my-space-xs">
          <span className="font-metric-xl text-metric-xl text-primary font-medium tracking-tight">3</span>
          <span className="font-telemetry-sm text-telemetry-sm text-on-surface-variant">SOCKS</span>
        </div>
        <div className="flex items-center justify-between font-telemetry-sm text-telemetry-sm text-outline">
          <span>BUFFERS: PINNED</span>
          <span className="text-primary font-mono text-[10px]">ZERO MEMCPY</span>
        </div>
      </div>

      {/* Stat 3 */}
      <div className="flex flex-col gap-space-xs p-space-lg">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">INTEGRITY DIGEST</span>
          <span className="material-symbols-outlined text-primary text-[14px]">verified</span>
        </div>
        <div className="flex items-baseline gap-space-xs my-space-xs">
          <span className="font-metric-xl text-metric-xl text-primary font-medium tracking-tight">100%</span>
        </div>
        <div className="flex items-center justify-between font-telemetry-sm text-telemetry-sm text-outline">
          <span>BLAKE3 MERKLE</span>
          <span className="text-primary font-mono text-[10px]">0 PACKET RETRIES</span>
        </div>
      </div>

      {/* Stat 4 */}
      <div className="flex flex-col gap-space-xs p-space-lg">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">PAGE RING CACHE</span>
          <span className="font-telemetry-sm text-telemetry-sm text-outline font-mono">SLIDING 64MB</span>
        </div>
        <div className="flex items-baseline gap-space-xs my-space-xs">
          <span className="font-metric-xl text-metric-xl text-primary font-medium tracking-tight">28.4</span>
          <span className="font-telemetry-sm text-telemetry-sm text-on-surface-variant">MB USED</span>
        </div>
        <div className="flex items-center justify-between font-telemetry-sm text-telemetry-sm text-outline">
          <span>SATURATION: 44.3%</span>
          <span className="text-primary font-mono text-[10px]">NO SPILLOVER</span>
        </div>
      </div>
    </div>
  );
};
