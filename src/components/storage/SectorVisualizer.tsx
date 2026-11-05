import React from "react";

export const SectorVisualizer: React.FC = () => {
  return (
    <div className="border border-outline-variant/30 bg-surface-container-lowest p-space-md flex flex-col gap-space-sm mt-space-md">
      <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/30">
        <span className="font-label-caps text-label-caps uppercase text-outline tracking-wider">
          NVMe FLASH SECTOR ALLOCATION MAP (4MB EXTENTS)
        </span>
        <span className="font-telemetry-sm text-telemetry-sm text-primary font-mono text-[10px]">
          1,024 EXTENTS MONITORED
        </span>
      </div>

      <div className="grid grid-cols-16 sm:grid-cols-32 gap-1 p-2 bg-surface-container-low">
        {Array.from({ length: 96 }).map((_, i) => {
          const isWriting = i >= 35 && i <= 39;
          const isAllocated = i < 35;
          return (
            <div
              key={i}
              className={`h-3 w-full transition-colors ${
                isWriting
                  ? "bg-primary animate-pulse"
                  : isAllocated
                  ? "bg-primary/40"
                  : "bg-surface-container-highest/40"
              }`}
              title={`Sector #${i + 1}`}
            />
          );
        })}
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-outline pt-1">
        <div className="flex items-center gap-space-md">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-primary/40 inline-block" /> COMMITTED
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-primary inline-block animate-pulse" /> DMA WRITING
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-surface-container-highest/40 inline-block" /> UNALLOCATED
          </span>
        </div>
        <span className="text-primary">TRIM ENFORCED</span>
      </div>
    </div>
  );
};
