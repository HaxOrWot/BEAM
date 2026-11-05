"use client";

import React, { useState } from "react";

export const IngressFirewallRules: React.FC = () => {
  const [strictPfs, setStrictPfs] = useState(true);
  const [rejectNonAttested, setRejectNonAttested] = useState(true);
  const [zeroCopyDma, setZeroCopyDma] = useState(true);
  const [whitelistOnly, setWhitelistOnly] = useState(false);

  return (
    <div className="flex flex-col gap-space-md bg-surface-container-low border border-outline-variant/30 p-space-lg">
      <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/30">
        <span className="font-headline-sm text-headline-sm text-primary uppercase font-semibold">
          INGRESS GATEWAY RULES
        </span>
        <span className="font-telemetry-sm text-telemetry-sm text-outline font-mono">eBPF FILTER</span>
      </div>

      <div className="flex flex-col gap-space-sm">
        <label className="flex items-start justify-between p-space-sm bg-surface-container-lowest border border-outline-variant/30 cursor-pointer">
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface uppercase font-semibold">
              STRICT EPHEMERAL PFS
            </span>
            <span className="font-telemetry-sm text-telemetry-sm text-outline leading-tight">
              Enforce TLS 1.3 rotating pre-shared key ratchets.
            </span>
          </div>
          <input
            type="checkbox"
            checked={strictPfs}
            onChange={(e) => setStrictPfs(e.target.checked)}
            className="accent-primary mt-1"
          />
        </label>

        <label className="flex items-start justify-between p-space-sm bg-surface-container-lowest border border-outline-variant/30 cursor-pointer">
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface uppercase font-semibold">
              REJECT NON-ATTESTED NODES
            </span>
            <span className="font-telemetry-sm text-telemetry-sm text-outline leading-tight">
              Drop SYN frames lacking valid FIDO2/TPM attestation proofs.
            </span>
          </div>
          <input
            type="checkbox"
            checked={rejectNonAttested}
            onChange={(e) => setRejectNonAttested(e.target.checked)}
            className="accent-primary mt-1"
          />
        </label>

        <label className="flex items-start justify-between p-space-sm bg-surface-container-lowest border border-outline-variant/30 cursor-pointer">
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface uppercase font-semibold">
              ENFORCE ZERO-COPY DMA
            </span>
            <span className="font-telemetry-sm text-telemetry-sm text-outline leading-tight">
              Bypass userspace buffers via direct kernel ring splicing.
            </span>
          </div>
          <input
            type="checkbox"
            checked={zeroCopyDma}
            onChange={(e) => setZeroCopyDma(e.target.checked)}
            className="accent-primary mt-1"
          />
        </label>

        <label className="flex items-start justify-between p-space-sm bg-surface-container-lowest border border-outline-variant/30 cursor-pointer">
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface uppercase font-semibold">
              AUTO-APPROVE ENROLLED WHITELIST
            </span>
            <span className="font-telemetry-sm text-telemetry-sm text-outline leading-tight">
              Skip gatekeeper prompts for pre-signed peer identities.
            </span>
          </div>
          <input
            type="checkbox"
            checked={whitelistOnly}
            onChange={(e) => setWhitelistOnly(e.target.checked)}
            className="accent-primary mt-1"
          />
        </label>
      </div>

      <div className="pt-space-xs border-t border-outline-variant/30 flex justify-between items-center text-[11px] font-mono text-outline">
        <span>POLICY COMPILATION:</span>
        <span className="text-primary font-medium">BPF_BYTECODE_APPLIED</span>
      </div>
    </div>
  );
};
