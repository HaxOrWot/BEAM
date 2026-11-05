import React from "react";

export const StorageMetricsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-xl border-b border-outline-variant/30 pb-space-lg">
      {/* Card 1 */}
      <div className="flex flex-col justify-between py-space-xs pr-space-md border-r border-outline-variant/30">
        <div>
          <div className="flex items-center justify-between mb-space-xs">
            <span className="font-label-caps text-label-caps text-outline tracking-widest uppercase text-[10px]">
              KERNEL RING BUFFER
            </span>
            <span className="font-telemetry-sm text-telemetry-sm text-primary font-mono text-[10px]">ZERO MEMCPY</span>
          </div>
          <div className="flex items-baseline gap-space-xs">
            <span className="font-metric-xl text-metric-xl text-primary font-medium tracking-tight">64.0</span>
            <span className="font-telemetry-sm text-telemetry-sm text-outline">MB PINNED</span>
          </div>
        </div>
        <div className="mt-space-sm">
          <div className="h-1 w-full bg-surface-container-high overflow-hidden">
            <div className="h-full bg-primary" style={{ width: "42%", backgroundColor: "#DFBD69" }} />
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono text-outline mt-1">
            <span>RING UTILIZATION</span>
            <span className="text-primary font-medium">42.1%</span>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="flex flex-col justify-between py-space-xs pr-space-md border-r border-outline-variant/30">
        <div>
          <div className="flex items-center justify-between mb-space-xs">
            <span className="font-label-caps text-label-caps text-outline tracking-widest uppercase text-[10px]">
              NVMe DIRECT I/O STAGING
            </span>
            <span className="font-telemetry-sm text-telemetry-sm text-outline font-mono text-[10px]">O_DIRECT</span>
          </div>
          <div className="flex items-baseline gap-space-xs">
            <span className="font-metric-xl text-metric-xl text-primary font-medium tracking-tight">1.84</span>
            <span className="font-telemetry-sm text-telemetry-sm text-outline">TB STAGED</span>
          </div>
        </div>
        <div className="mt-space-sm">
          <div className="h-1 w-full bg-surface-container-high overflow-hidden">
            <div className="h-full bg-primary" style={{ width: "68%", backgroundColor: "#DFBD69" }} />
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono text-outline mt-1">
            <span>PARTITION CAPACITY</span>
            <span className="text-primary font-medium">68.4% (3.82 TB CAP)</span>
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="flex flex-col justify-between py-space-xs pr-space-md border-r border-outline-variant/30">
        <div>
          <div className="flex items-center justify-between mb-space-xs">
            <span className="font-label-caps text-label-caps text-outline tracking-widest uppercase text-[10px]">
              WRITE THROUGHPUT
            </span>
            <span className="font-telemetry-sm text-telemetry-sm text-primary font-mono text-[10px]">PCIE GEN4</span>
          </div>
          <div className="flex items-baseline gap-space-xs">
            <span className="font-metric-xl text-metric-xl text-primary font-medium tracking-tight">2.41</span>
            <span className="font-telemetry-sm text-telemetry-sm text-outline">GB/s SUSTAINED</span>
          </div>
        </div>
        <div className="mt-space-sm">
          <div className="h-1 w-full bg-surface-container-high overflow-hidden">
            <div className="h-full bg-primary" style={{ width: "85%", backgroundColor: "#DFBD69" }} />
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono text-outline mt-1">
            <span>IOPS RATE</span>
            <span className="text-primary font-medium">580k IOPS</span>
          </div>
        </div>
      </div>

      {/* Card 4 */}
      <div className="flex flex-col justify-between py-space-xs">
        <div>
          <div className="flex items-center justify-between mb-space-xs">
            <span className="font-label-caps text-label-caps text-outline tracking-widest uppercase text-[10px]">
              VERIFICATION ENGINE
            </span>
            <span className="font-telemetry-sm text-telemetry-sm text-primary font-mono text-[10px]">BLAKE3-SIMD</span>
          </div>
          <div className="flex items-baseline gap-space-xs">
            <span className="font-metric-xl text-metric-xl text-primary font-medium tracking-tight">100.0</span>
            <span className="font-telemetry-sm text-telemetry-sm text-outline">% INTEGRITY</span>
          </div>
        </div>
        <div className="mt-space-sm">
          <div className="h-1 w-full bg-surface-container-high overflow-hidden">
            <div className="h-full bg-primary" style={{ width: "100%", backgroundColor: "#DFBD69" }} />
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono text-outline mt-1">
            <span>MERKLE ROOT TREE</span>
            <span className="text-primary font-medium">VALIDATED</span>
          </div>
        </div>
      </div>
    </div>
  );
};
