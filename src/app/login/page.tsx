import React, { Suspense } from "react";
import { SignInCard } from "@/components/auth/SignInCard";

export default function LoginPage() {
  return (
    <div
      className="w-full min-h-[calc(100vh-160px)] flex items-center justify-center px-6 py-12"
      suppressHydrationWarning
    >
      <Suspense fallback={<div className="font-mono text-xs text-outline">Loading sign in...</div>}>
        <SignInCard />
      </Suspense>
    </div>
  );
}
