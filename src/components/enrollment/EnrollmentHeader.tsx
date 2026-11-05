import React from "react";

export const EnrollmentHeader: React.FC = () => {
  return (
    <div className="flex flex-col gap-space-lg mb-space-lg">
      {/* Top Meta Context / Badge Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm pb-space-lg border-b border-outline-variant">
        <div className="flex items-center gap-space-sm">
          <span className="w-1.5 h-1.5 bg-primary shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
          <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">
            [ PROTO/TCP // SECURE ONBOARDING GATEWAY ]
          </span>
          <span className="font-telemetry-sm text-telemetry-sm text-outline px-space-xs py-0.5 bg-surface-container">
            SEC-LVL 4 REGISTER
          </span>
        </div>
        <div className="flex items-center gap-space-md font-telemetry-sm text-telemetry-sm text-outline">
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 bg-primary" />
            TLS 1.3 // ZERO-KNOWLEDGE
          </span>
          <span className="text-on-surface-variant font-label-caps text-label-caps tracking-wider">
            HSM CLUSTER // ONLINE
          </span>
        </div>
      </div>

      {/* Editorial Header Block */}
      <div className="max-w-3xl">
        <p className="font-label-caps text-label-caps text-primary mb-space-xs tracking-[0.2em] uppercase">
          ONBOARDING &amp; PROVISIONING // SPEC 84-REV3
        </p>
        <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight font-semibold mb-space-sm uppercase">
          Create Account &amp; Provision Node
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          Register your operator credentials and cryptographically bind an Ed25519 identity directly to your local enclave.
        </p>
      </div>
    </div>
  );
};
