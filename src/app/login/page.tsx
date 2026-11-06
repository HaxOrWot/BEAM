import React from "react";
import { SignInCard } from "@/components/auth/SignInCard";

export default function LoginPage() {
  return (
    <div className="w-full min-h-[calc(100vh-160px)] flex items-center justify-center px-6 py-12">
      <SignInCard />
    </div>
  );
}
