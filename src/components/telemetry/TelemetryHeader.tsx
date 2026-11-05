import React from "react";

export const TelemetryHeader: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-lg pb-space-md border-b border-outline-variant/30">
      <div className="flex flex-col gap-space-xs">
        <div className="flex items-center gap-space-sm font-label-caps text-label-caps uppercase text-outline tracking-wider">
          <span className="inline-block w-1.5 h-1.5 bg-primary" />
          <span>KERNEL SOCKET LOGS // PIPELINE AUDIT</span>
        </div>
        <div className="font-display-lg text-display-lg text-primary tracking-tight font-semibold uppercase">
          TELEMETRY &amp; AUDIT ARCHIVE
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-space-xs font-mono">
        <div className="flex items-center gap-space-xs bg-surface-container-high px-space-md py-space-xs text-on-surface border border-outline-variant/30">
          <span className="w-1.5 h-1.5 bg-primary animate-pulse" />
          <span className="font-label-caps text-label-caps uppercase text-primary">DAEMON: STREAMING (fd=7)</span>
        </div>
        <div className="bg-surface-container px-space-md py-space-xs font-telemetry-sm text-telemetry-sm text-outline border border-outline-variant/30">
          EPOCH: <span className="text-on-surface font-label-caps">1747578</span>
        </div>
        <div className="bg-surface-container px-space-md py-space-xs font-telemetry-sm text-telemetry-sm text-outline border border-outline-variant/30">
          RING_BUF: <span className="text-primary font-label-caps">99.4% CLEAR</span>
        </div>
      </div>
    </div>
  );
};
