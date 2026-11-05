import React from "react";
import { SignInHeader } from "@/components/auth/SignInHeader";
import { SignInForm } from "@/components/auth/SignInForm";
import { SiliconAttestationCard } from "@/components/auth/SiliconAttestationCard";

export default function AuthPage() {
  return (
    <div className="w-full max-w-[1240px] mx-auto px-margin-mobile md:px-margin py-space-lg md:py-space-xl flex flex-col gap-space-lg">
      <SignInHeader />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        <div className="lg:col-span-8">
          <SignInForm />
        </div>
        <div className="lg:col-span-4">
          <SiliconAttestationCard />
        </div>
      </div>
    </div>
  );
}
