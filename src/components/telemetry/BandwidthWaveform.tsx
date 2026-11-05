import React from "react";

export const BandwidthWaveform: React.FC = () => {
  return (
    <div className="flex flex-col gap-space-sm bg-surface-container-low p-space-lg border border-outline-variant/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-md">
          <span className="font-label-caps text-label-caps uppercase text-primary tracking-wider font-semibold">
            THROUGHPUT OSCILLATION SPECTRUM
          </span>
          <span className="font-telemetry-sm text-telemetry-sm text-outline hidden sm:inline">
            WINDOW: 120s // INTERVAL: 10ms
          </span>
        </div>
        <div className="flex items-center gap-space-sm font-telemetry-sm text-telemetry-sm">
          <span className="text-outline">PEAK: 1.84 GB/s</span>
          <span className="text-outline">&bull;</span>
          <span className="text-primary font-mono">CURRENT: 1.37 GB/s</span>
        </div>
      </div>

      <div className="h-28 w-full bg-surface-container-lowest p-2 relative overflow-hidden flex items-end">
        <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 600 60">
          <defs>
            <linearGradient id="telemetryLineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#C5A059" />
              <stop offset="50%" stopColor="#DFBD69" />
              <stop offset="100%" stopColor="#F3E5AB" />
            </linearGradient>
            <linearGradient id="telemetryAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#DFBD69" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#DFBD69" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path
            d="M0 50 L40 45 L80 48 L120 30 L160 25 L200 32 L240 18 L280 22 L320 12 L360 14 L400 8 L440 10 L480 6 L520 8 L560 5 L600 5 L600 60 L0 60 Z"
            fill="url(#telemetryAreaGrad)"
          />
          <path
            d="M0 50 L40 45 L80 48 L120 30 L160 25 L200 32 L240 18 L280 22 L320 12 L360 14 L400 8 L440 10 L480 6 L520 8 L560 5 L600 5"
            stroke="url(#telemetryLineGrad)"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </div>
  );
};
