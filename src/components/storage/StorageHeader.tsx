"use client";

import React from "react";

export const StorageHeader: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md py-space-md mb-space-md border-b border-outline-variant/30">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-space-sm">
          <span className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-widest text-[11px]">
            DMA STORAGE SUBSYSTEM
          </span>
          <span className="inline-block w-1 h-1 rounded-full bg-primary" />
          <span className="font-telemetry-sm text-telemetry-sm text-primary tracking-wider font-mono text-[11px]">
            ZERO-COPY KERNEL RING
          </span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-medium text-[28px] uppercase">
          Buffer &amp; Storage Allocation
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-space-xs">
        <button
          onClick={() => alert("DMA throughput benchmark complete: 3.42 GB/s line rate.")}
          className="px-space-md py-1.5 border border-outline-variant/30 hover:border-primary text-primary font-label-caps text-label-caps uppercase transition-colors flex items-center gap-space-xs tracking-wider text-[10px]"
        >
          <span className="w-1 h-1 rounded-full bg-primary" />
          <span>Test Speed</span>
        </button>

        <button
          onClick={() => alert("Temporary memory buffers purged cleanly.")}
          className="px-space-md py-1.5 border border-outline-variant/30 hover:border-outline text-outline hover:text-primary font-label-caps text-label-caps uppercase transition-colors flex items-center gap-space-xs tracking-wider text-[10px]"
        >
          <span className="material-symbols-outlined text-[13px]">cleaning_services</span>
          <span>Purge Temp</span>
        </button>

        <button
          onClick={() => alert("Kernel ring buffer snapshot exported to dump.bin")}
          className="px-space-md py-1.5 bg-primary text-black hover:bg-neutral-200 transition-colors font-label-caps text-label-caps uppercase font-semibold tracking-wider text-[10px] flex items-center gap-space-xs"
        >
          <span className="material-symbols-outlined text-[13px]">terminal</span>
          <span>Export Dump</span>
        </button>
      </div>
    </div>
  );
};
