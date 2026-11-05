import React from "react";
import { StreamStatsBar } from "@/components/streams/StreamStatsBar";
import { StagingTargetBar } from "@/components/streams/StagingTargetBar";
import { SpectrogramChart } from "@/components/streams/SpectrogramChart";
import { ActivePipelineTable } from "@/components/streams/ActivePipelineTable";
import { StreamCommandBar } from "@/components/streams/StreamCommandBar";

export default function StreamsPage() {
  return (
    <div className="w-full min-h-screen px-margin py-space-lg flex flex-col gap-space-lg">
      <StreamStatsBar />
      <StagingTargetBar />
      <SpectrogramChart />
      <ActivePipelineTable />
      <StreamCommandBar />
    </div>
  );
}
