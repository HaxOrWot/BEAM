import React from "react";
import { AuthCard } from "@/components/auth/AuthCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function AuthPage() {
  return (
    <div>
      <SectionHeader
        title="Sign In & Node Authentication"
        tag="ZERO-TRUST DISPATCH"
      />
      <AuthCard />
    </div>
  );
}
