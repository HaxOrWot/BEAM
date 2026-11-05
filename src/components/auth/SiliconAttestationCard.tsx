import React from "react";

export const SiliconAttestationCard: React.FC = () => {
  return (
    <div className="flex flex-col gap-gutter">
      <div className="border border-outline-variant bg-surface-container-low p-space-md flex flex-col gap-space-md">
        <div className="flex items-center justify-between border-b border-outline-variant pb-space-sm">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[16px] text-primary">memory</span>
            <span className="font-label-caps text-label-caps text-on-surface uppercase">
              SILICON ATTESTATION
            </span>
          </div>
          <span className="font-label-caps text-label-caps text-primary px-1.5 py-0.5 bg-surface-container border border-outline-variant">
            ONLINE
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-telemetry-sm text-telemetry-sm text-outline">CHIPSET ENCLAVE</span>
          <span className="font-telemetry-sm text-telemetry-sm text-on-surface font-mono">APPLE SECURE ENCLAVE T2+</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-telemetry-sm text-telemetry-sm text-outline">TPM VENDOR ID</span>
          <span className="font-telemetry-sm text-telemetry-sm text-on-surface font-mono">0x1014 // IBM_HW</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-telemetry-sm text-telemetry-sm text-outline">PCR-0 DIGEST</span>
          <span className="font-telemetry-sm text-telemetry-sm text-primary font-mono truncate max-w-[140px]" title="7fa6c888910bba13">
            7fa6c888910bba13...
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-telemetry-sm text-telemetry-sm text-outline">ENTROPY LEVEL</span>
          <span className="font-telemetry-sm text-telemetry-sm text-primary font-mono">99.98% QUANTUM TRUE</span>
        </div>

        <div className="w-full bg-surface-container-highest h-1 overflow-hidden mt-1">
          <div className="bg-primary h-full w-[88%]" />
        </div>
      </div>

      <div className="border border-outline-variant bg-surface-container-low p-space-md flex flex-col gap-space-sm">
        <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
          PEER HANDSHAKE PROTOCOL
        </span>
        <div className="space-y-2 pt-1 font-telemetry-sm text-telemetry-sm text-outline">
          <div className="flex items-center justify-between">
            <span>TLS CIPHER</span>
            <span className="text-on-surface font-mono">CHACHA20-POLY1305</span>
          </div>
          <div className="flex items-center justify-between">
            <span>CURVE</span>
            <span className="text-on-surface font-mono">ED25519 / X25519</span>
          </div>
          <div className="flex items-center justify-between">
            <span>ZERO-COPY DMA</span>
            <span className="text-primary font-mono">ENABLED</span>
          </div>
        </div>
      </div>
    </div>
  );
};
