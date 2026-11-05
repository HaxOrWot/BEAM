import React from "react";
import { TerminalLog } from "@/components/diagnostics/TerminalLog";
import { DiagnosticTools } from "@/components/diagnostics/DiagnosticTools";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MetricBox } from "@/components/ui/MetricBox";

export default function DiagnosticsPage() {
  return (
    <div>
      <SectionHeader
        title="Kernel Diagnostics & Socket Logs"
        tag="SYSTEM DEBUGGER"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <MetricBox label="KERNEL SOCKET STATUS" value="HEALTHY" unit="" delta="No dropped packets" />
        <MetricBox label="DMA INTERRUPT RATE" value="12.4" unit="k/sec" delta="MSI-X Affinity Locked" />
        <MetricBox label="BUFFER INTEGRITY" value="100.0" unit="%" delta="CRC32 Checksum Valid" />
      </div>

      <TerminalLog />
      <DiagnosticTools />
    </div>
  );
}
