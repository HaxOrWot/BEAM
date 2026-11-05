import React from "react";

export const SignInHeader: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md pb-space-md border-b border-outline-variant">
      <div className="flex flex-col gap-space-xs">
        <div className="flex items-center gap-space-xs">
          <span className="w-1.5 h-1.5 bg-primary shadow-[0_0_6px_rgba(212,175,55,0.4)]" />
          <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">
            [ P2P SOCKET INGRESS / AUTHENTICATION ]
          </span>
          <span className="font-label-caps text-label-caps text-outline px-space-xs py-0.5 bg-surface-container border border-outline-variant">
            PORT 9042 // DIRECT
          </span>
        </div>
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight font-medium uppercase">
          Sign In to PROTO/TCP
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
          Secure node session ingress via Enterprise Single Sign-On (Google / GitHub), direct Ed25519 cryptographic key, or TPM 2.0 enclave attestation.
        </p>
      </div>

      <div className="flex items-center gap-space-md font-telemetry-sm text-telemetry-sm text-outline border border-outline-variant bg-surface-container-lowest px-space-md py-space-sm self-start md:self-auto">
        <div className="flex flex-col">
          <span className="font-label-caps text-label-caps text-outline uppercase">NODE CLUSTER</span>
          <span className="text-primary font-mono text-[11px]">EU-NORTH-VAULT // 0x48A</span>
        </div>
        <div className="w-px h-6 bg-outline-variant" />
        <div className="flex flex-col">
          <span className="font-label-caps text-label-caps text-outline uppercase">SECURITY TIER</span>
          <span className="text-primary font-medium font-mono text-[11px]">LEVEL 4 HIGH-ASSURANCE</span>
        </div>
      </div>
    </div>
  );
};
