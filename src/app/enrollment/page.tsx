import React from "react";
import { EnrollmentHeader } from "@/components/enrollment/EnrollmentHeader";
import { StepPipeline } from "@/components/enrollment/StepPipeline";
import { OperatorForm } from "@/components/enrollment/OperatorForm";
import { IdentityArtifactCard } from "@/components/enrollment/IdentityArtifactCard";
import { EnrollmentTelemetryDeck } from "@/components/enrollment/EnrollmentTelemetryDeck";

export default function EnrollmentPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-margin py-space-xl flex flex-col">
      <EnrollmentHeader />
      <StepPipeline />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        <div className="lg:col-span-7">
          <OperatorForm />
        </div>
        <div className="lg:col-span-5">
          <IdentityArtifactCard />
        </div>
      </div>
      <EnrollmentTelemetryDeck />
    </div>
  );
}
