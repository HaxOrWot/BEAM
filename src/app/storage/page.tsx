import React from "react";
import { BufferAllocation } from "@/components/storage/BufferAllocation";
import { StorageVolumes } from "@/components/storage/StorageVolumes";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MetricBox } from "@/components/ui/MetricBox";

export default function StoragePage() {
  return (
    <div>
      <SectionHeader
        title="Buffer & Storage Allocation"
        tag="DMA MEMORY BUS"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <MetricBox label="TOTAL HUGEPAGE RAM" value="4.00" unit="GB" delta="2MB Pages" />
        <MetricBox label="NVME DIRECT WRITE SPEED" value="4.2" unit="GB/s" delta="Zero-Copy Direct I/O" />
        <MetricBox label="BUFFER CACHE HIT RATIO" value="99.4" unit="%" delta="Optimal cache warmth" />
      </div>

      <BufferAllocation />
      <StorageVolumes />
    </div>
  );
}
