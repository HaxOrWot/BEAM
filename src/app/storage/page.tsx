import React from "react";
import { BufferAllocation } from "@/components/storage/BufferAllocation";
import { StorageVolumes } from "@/components/storage/StorageVolumes";

export default function StoragePage() {
  return (
    <div className="px-margin py-space-lg flex flex-col gap-space-xl">
      <div className="bg-surface-container-lowest p-space-xl border border-outline-variant flex flex-col gap-space-xs shadow-xl">
        <span className="font-label-caps text-label-caps uppercase text-outline tracking-widest">
          DMA MEMORY // HARDWARE PASSTHROUGH
        </span>
        <h1 className="font-display-lg text-display-lg uppercase tracking-tight text-primary font-semibold">
          BUFFER &amp; STORAGE ALLOCATION
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
          POSIX shared memory rings, Linux kernel hugepages pools, and direct NVMe partition mounting for zero-copy streaming.
        </p>
      </div>

      <BufferAllocation />
      <StorageVolumes />
    </div>
  );
}
