import React, { Suspense } from "react";
import { SignUpCard } from "@/components/auth/SignUpCard";

export default function SignUpPage() {
  return (
    <div
      className="w-full min-h-[calc(100vh-160px)] flex items-center justify-center px-6 py-12"
      suppressHydrationWarning
    >
      <Suspense fallback={<div className="text-sm font-mono text-outline">Loading registration pod...</div>}>
        <SignUpCard />
      </Suspense>
    </div>
  );
}
