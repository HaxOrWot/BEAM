import React from "react";
import { StorageHeader } from "@/components/storage/StorageHeader";
import { StorageMetricsGrid } from "@/components/storage/StorageMetricsGrid";
import { StagedPayloadsTable } from "@/components/storage/StagedPayloadsTable";
import { SectorVisualizer } from "@/components/storage/SectorVisualizer";
import { KernelTunablesPanel } from "@/components/storage/KernelTunablesPanel";

export default function StoragePage() {
  return (
    <div className="w-full min-h-screen px-margin py-space-lg flex flex-col gap-space-lg">
      <StorageHeader />
      <StorageMetricsGrid />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        <div className="lg:col-span-8 flex flex-col gap-space-lg">
          <StagedPayloadsTable />
          <SectorVisualizer />
        </div>
        <div className="lg:col-span-4">
          <KernelTunablesPanel />
        </div>
      </div>
    </div>
  );
}
