import React from "react";
import { TelemetryHeader } from "@/components/telemetry/TelemetryHeader";
import { StarkKeyMetrics } from "@/components/telemetry/StarkKeyMetrics";
import { BandwidthWaveform } from "@/components/telemetry/BandwidthWaveform";
import { TransferArchiveTable } from "@/components/telemetry/TransferArchiveTable";
import { DaemonTerminalLog } from "@/components/telemetry/DaemonTerminalLog";

export default function TelemetryPage() {
  return (
    <div className="w-full min-h-screen px-margin py-space-xl flex flex-col gap-space-lg max-w-[1600px] mx-auto">
      <TelemetryHeader />
      <StarkKeyMetrics />
      <BandwidthWaveform />
      <TransferArchiveTable />
      <DaemonTerminalLog />
    </div>
  );
}
