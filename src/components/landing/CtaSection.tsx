"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Zap, ShieldCheck, Check } from "lucide-react";

export const CtaSection: React.FC = () => {
  const router = useRouter();
  const [handle, setHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = handle.replace(/^@/, "").trim();
    if (clean) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          router.push(`/signup?handle=${encodeURIComponent(clean)}`);
        }, 1500);
      }, 800);
    } else {
      router.push("/signup");
    }
  };

  const features = [
    { icon: Zap, text: "Sub-second P2P transfers" },
    { icon: ShieldCheck, text: "AES-256 end-to-end encryption" },
    { icon: Check, text: "Zero storage intermediaries" },
    { icon: Check, text: "Configurable security policies" },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-20">
      <div className="relative bg-gradient-to-br from-surface-container-high via-surface-container to-surface-container-lowest rounded-3xl p-8 sm:p-14 border border-white/10 shadow-2xl overflow-hidden text-center flex flex-col items-center">
        {/* Ambient glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary-container/20 rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-secondary/15 rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: "2s" }} />

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-surface-container-highest px-4 py-2 rounded-full border border-white/5 mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
            <span className="font-mono text-xs text-secondary uppercase tracking-wider font-medium">
              Identity Reservations Open
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-on-surface tracking-tight leading-tight mb-4">
            Claim your unique{" "}
            <span className="bg-gradient-to-r from-primary via-tertiary to-secondary bg-clip-text text-transparent bg-300% animate-gradient-x">
              @username
            </span>
            <br className="sm:hidden" /> before someone else does.
          </h2>

          <p className="text-sm sm:text-base text-on-surface-variant mt-4 max-w-lg leading-relaxed">
            Reserve your handle now. Send and receive gigabytes of production media without ever typing an email or creating a link again.
          </p>

          {/* Feature highlights */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 mb-10">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-2 bg-surface-container px-3 py-2 rounded-full border border-white/5">
                <feature.icon className="w-4 h-4 text-secondary" />
                <span className="font-mono text-xs text-on-surface-variant">{feature.text}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleClaimSubmit} className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full max-w-md animate-fade-in">
            <div className="relative w-full flex items-center bg-surface-container-lowest rounded-full px-4 py-3 border border-white/10 focus-within:border-primary focus-within:shadow-lg focus-within:shadow-primary/20 transition-all">
              <span className="font-mono text-sm text-outline pl-3">@</span>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ""))}
                placeholder="yourhandle"
                className="w-full bg-transparent px-3 py-2.5 text-sm font-mono text-on-surface placeholder:text-outline focus:outline-none"
              />
              {success && <Check className="w-5 h-5 text-secondary absolute right-3" />}
            </div>
            <button
              type="submit"
              disabled={loading || success}
              className={`w-full sm:w-auto shrink-0 bg-gradient-to-r from-primary-container via-primary to-secondary hover:shadow-xl hover:shadow-primary/30 disabled:opacity-70 disabled:cursor-not-allowed font-heading font-semibold text-sm px-8 py-3.5 rounded-full transition-all flex items-center justify-center gap-3 animate-gradient-x ${
                success ? "opacity-100" : ""
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-on-primary-container border-t-transparent rounded-full animate-spin" />
                  <span>Reserving...</span>
                </>
              ) : success ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Reserved!</span>
                </>
              ) : (
                <>
                  <span>Claim Handle</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="font-mono text-[10px] text-outline mt-6 flex items-center gap-2">
            <ShieldCheck className="w-3 h-3" />
            <span>Instant cryptographically verified key generation • Non-custodial</span>
          </div>
        </div>
      </div>

      {/* Bottom Social Proof */}
      <div className="mt-16 text-center">
        <p className="font-mono text-xs text-outline uppercase tracking-widest mb-6">
          Trusted by teams at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 opacity-50">
          {["ACME CORP", "GLOBEX", "SOYLENT", "INNOUT", "BRAINWARE"].map((company) => (
            <span key={company} className="font-heading text-xl font-bold text-on-surface">
              {company}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
