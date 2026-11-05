import React from "react";
import { HeroBanner } from "@/components/transfer-console/HeroBanner";
import { TargetIngressCard } from "@/components/transfer-console/TargetIngressCard";
import { DropzoneCard } from "@/components/transfer-console/DropzoneCard";
import { AggregateSpeedHud } from "@/components/transfer-console/AggregateSpeedHud";
import { ActiveStreamsCard } from "@/components/transfer-console/ActiveStreamsCard";

export default function TransfersPage() {
  return (
    <div className="px-margin py-space-lg flex flex-col gap-space-xl">
      <HeroBanner />
      <TargetIngressCard />
      <DropzoneCard />
      <AggregateSpeedHud />
      <ActiveStreamsCard />
    </div>
  );
}
