import React from "react";

export const HeroBanner: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-surface-container-lowest p-space-xl shadow-xl flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg border border-outline-variant">
      {/* Background radial gold glow */}
      <div
        className="absolute -right-16 -top-16 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(223, 189, 105, 0.15) 0%, rgba(19, 19, 19, 0) 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col gap-space-xs max-w-3xl">
        <div className="flex items-center gap-space-sm mb-space-xs flex-wrap">
          <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-primary animate-ping" />
          <span className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-widest">
            TLS 1.3 // CHACHA20-POLY1305 PIPELINE
          </span>
          <span
            className="px-space-xs py-0.5 font-label-caps text-label-caps uppercase"
            style={{
              color: "rgb(223, 189, 105)",
              border: "1px solid rgba(223, 189, 105, 0.4)",
              backgroundColor: "rgba(223, 189, 105, 0.08)",
            }}
          >
            KERNEL BYPASS ON
          </span>
        </div>

        <h1 className="font-display-lg text-display-lg uppercase tracking-tight text-on-surface font-semibold">
          DIRECT TCP SOCKET SHARING
        </h1>

        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
          Zero-relay raw TCP/IP chunk streaming over encrypted TLS 1.3 socket pairs. Direct peer buffer synchronization bypassing intermediary cloud relays.
        </p>
      </div>

      {/* Telemetry quick metrics strip */}
      <div className="relative z-10 flex items-center gap-space-md bg-surface-container-low p-space-md border border-outline-variant">
        <div className="flex flex-col">
          <span className="font-label-caps text-label-caps uppercase text-outline">MTU FRAME</span>
          <span className="font-telemetry-md text-telemetry-md text-primary font-medium">9000 Jumbo</span>
        </div>
        <div className="w-px h-8 bg-surface-container-highest" />
        <div className="flex flex-col">
          <span className="font-label-caps text-label-caps uppercase text-outline">CONGESTION CTRL</span>
          <span className="font-telemetry-md text-telemetry-md text-primary font-medium">BBR v3 (TCP)</span>
        </div>
        <div className="w-px h-8 bg-surface-container-highest" />
        <div className="flex flex-col">
          <span className="font-label-caps text-label-caps uppercase text-outline">SYS LATENCY</span>
          <span className="font-telemetry-md text-telemetry-md text-primary font-medium">0.42 ms</span>
        </div>
      </div>
    </div>
  );
};
