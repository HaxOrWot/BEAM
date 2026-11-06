"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight } from "lucide-react";

export const CtaSection: React.FC = () => {
  const router = useRouter();
  const [handle, setHandle] = useState("");

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = handle.replace(/^@/, "").trim();
    if (clean) {
      router.push(`/signup?handle=${encodeURIComponent(clean)}`);
    } else {
      router.push("/signup");
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-16">
      <div className="relative bg-gradient-to-br from-surface-container-high via-surface-container to-surface-container-lowest rounded-3xl p-8 sm:p-14 border border-white/10 shadow-2xl overflow-hidden text-center flex flex-col items-center">
        {/* Ambient glow */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-primary-container/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 bg-surface-container-highest px-3.5 py-1 rounded-full border border-white/5 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            <span className="font-mono text-xs text-secondary uppercase tracking-wider font-medium">
              Identity Reservations Open
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-on-surface tracking-tight leading-tight">
            Claim your unique{" "}
            <span className="text-primary-fixed">@username</span> before someone else does.
          </h2>

          <p className="text-sm sm:text-base text-on-surface-variant mt-3 max-w-lg leading-relaxed">
            Reserve your handle now. Send and receive gigabytes of production media without ever typing an email or creating a link again.
          </p>

          <form onSubmit={handleClaimSubmit} className="mt-8 flex flex-col sm:flex-row items-center gap-2 w-full max-w-md">
            <div className="relative w-full flex items-center bg-surface-container-lowest rounded-full px-3 py-1.5 border border-white/10 focus-within:border-primary">
              <span className="font-mono text-sm text-outline pl-2">@</span>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ""))}
                placeholder="yourhandle"
                className="w-full bg-transparent px-2 py-1.5 text-sm font-mono text-on-surface placeholder:text-outline focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto shrink-0 bg-primary-container hover:bg-primary text-on-primary-container hover:text-on-primary font-heading font-semibold text-sm px-6 py-3 rounded-full transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Claim Handle</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="font-mono text-[10px] text-outline mt-3">
            Instant cryptographically verified key generation • Non-custodial
          </div>
        </div>
      </div>
    </section>
  );
};
