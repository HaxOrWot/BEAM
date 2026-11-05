import React from "react";

export const EnrollmentTelemetryDeck: React.FC = () => {
  return (
    <div className="mt-space-xl p-space-md bg-surface-container-low border border-outline-variant flex flex-wrap items-center justify-between gap-space-md">
      <div className="flex items-center gap-space-lg">
        <div className="flex items-center gap-space-xs font-telemetry-sm text-telemetry-sm text-outline">
          <span className="w-1.5 h-1.5 bg-primary inline-block" />
          <span>SYSTEM_ENTROPY_POOL: 100% HEALTHY</span>
        </div>
        <div className="hidden md:flex items-center gap-space-xs font-telemetry-sm text-telemetry-sm text-outline">
          <span>LATENCY: 0.8ms</span>
        </div>
        <div className="hidden sm:flex items-center gap-space-xs font-telemetry-sm text-telemetry-sm text-outline">
          <span>CURVE25519 SCALAR MULT: CONSTANT-TIME</span>
        </div>
      </div>
      <div className="font-label-caps text-label-caps text-primary tracking-widest uppercase">
        PROTO/TCP CRYPTO ENGINE 0x9FF2 // READY
      </div>
    </div>
  );
};
