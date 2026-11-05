"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { KeyRound, ShieldCheck, ArrowLeft, Radio } from "lucide-react";

export default function VerifyPage() {
  const [touching, setTouching] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleTouch = () => {
    setTouching(true);
    setTimeout(() => {
      setTouching(false);
      setVerified(true);
    }, 1500);
  };

  return (
    <div>
      <div className="mb-4">
        <Link href="/auth" className="font-mono text-xs text-outline hover:text-primary flex items-center gap-1">
          <ArrowLeft size={12} /> Back to Node Auth
        </Link>
      </div>

      <SectionHeader
        title="Two-Factor & FIDO2 Key Verification"
        tag="HARDWARE CTAP2"
      />

      <div className="max-w-md mx-auto bg-surface-low border border-surface-high p-6 my-8 text-center">
        <div className="w-12 h-12 mx-auto mb-4 border border-surface-high bg-surface-lowest flex items-center justify-center text-primary">
          <KeyRound size={20} className={touching ? "animate-bounce" : ""} />
        </div>

        <h3 className="font-mono text-sm font-semibold text-primary uppercase tracking-wider mb-2">
          Insert or Touch Security Key
        </h3>
        <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">
          PROTO-TCP requires physical user presence verification for elevated socket control and ring buffer reallocation.
        </p>

        {verified ? (
          <div className="p-3 bg-surface-highest border border-primary text-primary font-mono text-xs flex items-center justify-center gap-2 mb-4">
            <ShieldCheck size={16} /> CTAP2 Attestation Approved. Redirecting...
          </div>
        ) : (
          <Button
            variant="primary"
            size="lg"
            className="w-full mb-4"
            disabled={touching}
            onClick={handleTouch}
          >
            <Radio size={14} className={touching ? "animate-pulse" : ""} />
            {touching ? "Awaiting Hardware Touch..." : "Simulate WebAuthn Touch"}
          </Button>
        )}

        <div className="font-mono text-[10px] text-outline">
          USB-A &bull; USB-C &bull; NFC &bull; FIDO2 L2 Security Standard
        </div>
      </div>
    </div>
  );
}
