import React from "react";

export const DaemonTerminalLog: React.FC = () => {
  return (
    <div className="bg-surface-container-low border border-outline-variant/30 p-space-md flex flex-col gap-space-xs font-mono text-[11px]">
      <div className="flex items-center justify-between pb-1 border-b border-outline-variant/30 text-outline uppercase font-label-caps text-label-caps">
        <span>DAEMON STDOUT/STDERR SINK</span>
        <span className="text-primary font-mono text-[10px]">TAIL -N 4</span>
      </div>
      <div className="text-outline flex flex-col gap-1 select-text pt-1">
        <div>[2026-04-18T09:12:44Z] kernel_splice: mapped fd=7 ring=64MB status=OK</div>
        <div>[2026-04-18T09:12:45Z] blake3_tree: chunk_digest matched hash=0x8F9C... verified</div>
        <div>[2026-04-18T09:12:46Z] bbrv3_pacing: cwnd=412 pkts pacing_rate=1.42GB/s rtt=0.28ms</div>
        <div className="text-primary">[2026-04-18T09:12:47Z] dma_commit: flushed 1024 extents to NVMe block #0x9FF1A</div>
      </div>
    </div>
  );
};
