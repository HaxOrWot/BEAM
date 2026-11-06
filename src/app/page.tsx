import React from "react";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { ComparisonSection } from "@/components/landing/ComparisonSection";
import { CtaSection } from "@/components/landing/CtaSection";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen" suppressHydrationWarning>
      <HeroSection />
      <FeaturesSection />
      <ComparisonSection />
      <CtaSection />
    </div>
  );
}
