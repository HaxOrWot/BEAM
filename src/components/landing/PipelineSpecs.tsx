import React from "react";

export const PipelineSpecs: React.FC = () => {
  return (
    <section id="specs" className="w-full px-margin py-space-xl border-t border-surface-container-high bg-surface-container-lowest">
      <div className="flex flex-col gap-space-lg">
        {/* Section Header */}
        <div className="flex items-end justify-between border-b border-surface-container-high pb-space-md">
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps uppercase text-outline">
              ENGINEERING DISCIPLINE
            </span>
            <h2 className="font-headline-lg text-headline-lg text-primary uppercase font-medium">
              Kernel-Grade Pipeline Specifications
            </h2>
          </div>
          <span className="hidden md:inline-block font-telemetry-sm text-telemetry-sm text-outline">
            ZERO CONTEXT SWITCHES
          </span>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {/* Pillar 1 */}
          <div className="flex flex-col gap-space-sm p-space-lg bg-surface-container-low border border-surface-container-high">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-label-caps uppercase text-outline">
                01 // TRANSPORT LAYER
              </span>
              <span className="material-symbols-outlined text-primary text-[20px]">
                sync_alt
              </span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-primary font-medium">
              Kernel Bypass BBR v3
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Direct socket-to-socket pipeline eliminating userspace context switching penalties. Uses raw packet ring buffers (`AF_XDP`) for line-rate byte transmission.
            </p>
            <div className="mt-space-xs pt-space-xs border-t border-surface-container-highest flex flex-col gap-1 font-telemetry-sm text-telemetry-sm text-outline">
              <div className="flex justify-between">
                <span>ALGO</span>
                <span className="text-on-surface">BBRv3 / IO_URING</span>
              </div>
              <div className="flex justify-between">
                <span>ZERO-COPY</span>
                <span className="text-primary font-medium">SPLICE(2) / VMSPLICE</span>
              </div>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="flex flex-col gap-space-sm p-space-lg bg-surface-container-low border border-surface-container-high">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-label-caps uppercase text-outline">
                02 // INTEGRITY ENGINE
              </span>
              <span className="material-symbols-outlined text-primary text-[20px]">
                verified
              </span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-primary font-medium">
              Streaming BLAKE3 Checksums
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Real-time cryptographic manifest computation running concurrently with socket transmission. Tree hashing ensures corrupt chunks are isolated and re-requested in microsecond loops.
            </p>
            <div className="mt-space-xs pt-space-xs border-t border-surface-container-highest flex flex-col gap-1 font-telemetry-sm text-telemetry-sm text-outline">
              <div className="flex justify-between">
                <span>DIGEST</span>
                <span className="text-on-surface">BLAKE3 256-BIT</span>
              </div>
              <div className="flex justify-between">
                <span>PARALLEL SIMD</span>
                <span className="text-primary font-medium">AVX-512 / NEON</span>
              </div>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="flex flex-col gap-space-sm p-space-lg bg-surface-container-low border border-surface-container-high">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-label-caps uppercase text-outline">
                03 // CIPHER PROTOCOL
              </span>
              <span className="material-symbols-outlined text-primary text-[20px]">
                shield
              </span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-primary font-medium">
              Ephemeral TLS 1.3 Handshake
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Mutual peer authentication utilizing ephemeral key pairs with hardware token attestation. Zero pre-shared secrets exposed over network transit wires.
            </p>
            <div className="mt-space-xs pt-space-xs border-t border-surface-container-highest flex flex-col gap-1 font-telemetry-sm text-telemetry-sm text-outline">
              <div className="flex justify-between">
                <span>CURVE</span>
                <span className="text-on-surface">X25519 / ED25519</span>
              </div>
              <div className="flex justify-between">
                <span>CIPHER</span>
                <span className="text-primary font-medium">CHACHA20-POLY1305</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
