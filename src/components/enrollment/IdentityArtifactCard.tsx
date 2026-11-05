"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const IdentityArtifactCard: React.FC = () => {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [confirmed, setConfirmed] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [pubKey, setPubKey] = useState(
    "proto_pk_live_8F14E3bA61D328C2aE9B075908C361D4C82bEbE94576C7Da882D3960EFb24D0A"
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(pubKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmed) return;
    setSubmitting(true);
    setTimeout(() => {
      router.push("/auth/success");
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-space-lg">
      <div className="bg-surface-container-low p-space-lg shadow-xl relative overflow-hidden border border-outline-variant">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-between pb-space-sm mb-space-md border-b border-outline-variant">
          <div className="flex items-center gap-space-xs">
            <span className="w-1.5 h-1.5 bg-primary" />
            <h2 className="font-label-caps text-label-caps text-on-surface uppercase tracking-widest font-semibold">
              MASTER PUBLIC FINGERPRINT
            </h2>
          </div>
          <span className="font-label-caps text-label-caps text-primary">ED25519</span>
        </div>

        {/* Public Key Fingerprint Hash Box */}
        <div className="bg-surface-container-lowest p-space-md mb-space-md border border-outline-variant">
          <div className="flex items-center justify-between font-label-caps text-label-caps text-outline mb-space-xs">
            <span>CANONICAL PUBLIC KEY (.PUB)</span>
            <span className="text-primary font-mono text-[10px]">0xAF4E::CURVE</span>
          </div>
          <div className="font-telemetry-md text-telemetry-md text-primary select-all break-all leading-snug tracking-tight font-mono">
            {pubKey}
          </div>
          <div className="mt-space-md flex items-center justify-between pt-space-xs border-t border-outline-variant/40">
            <span className="font-telemetry-sm text-telemetry-sm text-outline">CRC32: #84BD9A20</span>
            <button
              type="button"
              onClick={handleCopy}
              className="px-space-md py-1 bg-surface-container hover:bg-surface-container-high transition-colors text-primary font-label-caps text-label-caps uppercase flex items-center gap-1 border border-outline-variant"
            >
              <span className="material-symbols-outlined text-[14px]">
                {copied ? "done" : "content_copy"}
              </span>
              <span>{copied ? "COPIED" : "COPY .PUB"}</span>
            </button>
          </div>
        </div>

        {/* Matrix Visualization */}
        <div className="p-space-md bg-surface-container-lowest border border-outline-variant mb-space-md flex flex-col gap-2">
          <div className="flex justify-between items-center text-[10px] font-mono text-outline">
            <span>OUT-OF-BAND AIRGAP VERIFICATION</span>
            <span className="text-primary">SHA256: 9FA8...E301</span>
          </div>
          <div className="h-16 w-full bg-surface-container flex items-center justify-center p-2">
            <div className="grid grid-cols-12 gap-1 w-full h-full">
              {Array.from({ length: 36 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-full ${
                    (i * 7) % 3 === 0
                      ? "bg-primary"
                      : (i * 5) % 2 === 0
                      ? "bg-surface-container-highest"
                      : "bg-surface-container-low"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Affirmation Checkbox */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
          <label className="flex items-start gap-space-sm cursor-pointer select-none">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-0.5 accent-primary"
            />
            <span className="font-body-sm text-body-sm text-on-surface-variant leading-tight">
              I confirm that I have recorded and backed up my node identity keys to cold physical storage.
            </span>
          </label>

          <button
            type="submit"
            disabled={submitting || !confirmed}
            className="w-full py-space-md bg-primary text-black font-headline-sm text-headline-sm uppercase tracking-wider font-semibold hover:bg-neutral-200 transition-colors shadow-md flex items-center justify-center gap-space-xs disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span>{submitting ? "INITIALIZING ENCLAVE..." : "GENERATE KEYPAIR & COMPLETE NODE ENROLLMENT"}</span>
          </button>
        </form>

        <div className="mt-space-md text-center">
          <Link
            href="/auth"
            className="font-label-caps text-label-caps uppercase text-outline hover:text-primary transition-colors"
          >
            Already hold an authorized node identity? <span className="text-primary underline">Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
