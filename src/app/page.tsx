import React from "react";
import { LandingHero } from "@/components/landing/LandingHero";
import { PipelineSpecs } from "@/components/landing/PipelineSpecs";
import { WirePropagationTest } from "@/components/landing/WirePropagationTest";
import { TechnicalFeatures } from "@/components/landing/TechnicalFeatures";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      <LandingHero />
      <PipelineSpecs />
      <WirePropagationTest />
      <TechnicalFeatures />
    </div>
  );
}
