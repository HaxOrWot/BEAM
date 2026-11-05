import React from "react";
import { TransferControls } from "@/components/transfers/TransferControls";
import { TransferList } from "@/components/transfers/TransferList";
import { ChunkMap } from "@/components/transfers/ChunkMap";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MetricBox } from "@/components/ui/MetricBox";

export default function TransfersPage() {
  return (
    <div>
      <SectionHeader
        title="DMA Transfer Console"
        tag="KERNEL SOCKET BUS"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <MetricBox label="CURRENT DMA SPEED" value="8.09" unit="Gbps" delta="+0.45 Gbps" />
        <MetricBox label="ALLOCATED CHUNKS" value="256" unit="BLOCKS" delta="8.42 GB Payload" />
        <MetricBox label="VERIFIED SHA-256" value="100.0" unit="%" delta="0 Corruption Drops" />
      </div>

      <TransferControls />
      <TransferList />
      <ChunkMap />
    </div>
  );
}
