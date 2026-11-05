import React from "react";

export const ChunkMap: React.FC = () => {
  // 64 simulated packet chunks: 0=pending, 1=in-transit, 2=verified
  const chunks = Array.from({ length: 64 }, (_, i) => {
    if (i < 46) return 2; // verified
    if (i < 52) return 1; // in-transit
    return 0; // pending
  });

  return (
    <div className="bg-surface-lowest border border-surface-high p-4">
      <div className="flex items-center justify-between pb-2 border-b border-surface-high mb-3">
        <span className="font-mono text-xs font-semibold text-primary uppercase tracking-wider">
          Direct Memory Chunk Allocator
        </span>
        <div className="flex items-center gap-3 font-mono text-[10px]">
          <span className="flex items-center gap-1 text-primary">
            <span className="w-2 h-2 bg-primary inline-block" /> Verified (46)
          </span>
          <span className="flex items-center gap-1 text-secondary">
            <span className="w-2 h-2 bg-secondary inline-block animate-pulse" /> In-Transit (6)
          </span>
          <span className="flex items-center gap-1 text-outline">
            <span className="w-2 h-2 bg-surface-high inline-block" /> Pending (12)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-8 sm:grid-cols-16 gap-1 p-2 bg-surface-low border border-surface-high/60">
        {chunks.map((state, idx) => (
          <div
            key={idx}
            className={`h-4 border transition-colors ${
              state === 2
                ? "bg-primary border-primary"
                : state === 1
                ? "bg-secondary border-secondary animate-pulse"
                : "bg-surface-lowest border-surface-high"
            }`}
            title={`Chunk #${idx + 1}: ${state === 2 ? "Verified" : state === 1 ? "Streaming" : "Awaiting"}`}
          />
        ))}
      </div>
      <div className="font-mono text-[10px] text-outline mt-2 flex justify-between">
        <span>BASE_OFFSET: 0x0000_0000</span>
        <span>BLOCK_SIZE: 32 MiB</span>
        <span>TOTAL_ALLOCATED: 2048 MiB</span>
      </div>
    </div>
  );
};
