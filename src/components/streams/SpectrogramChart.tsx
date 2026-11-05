import React from "react";

export const SpectrogramChart: React.FC = () => {
  return (
    <div className="border border-outline-variant/30 bg-surface-container-lowest p-space-lg flex flex-col gap-space-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-outline-variant/30 pb-space-sm">
        <div className="flex items-center gap-space-md">
          <span className="font-headline-sm text-headline-sm text-primary uppercase tracking-tight font-semibold">
            INGRESS SPECTROGRAM &amp; PACING HISTOGRAM
          </span>
          <span className="font-label-caps text-label-caps text-on-surface-variant border border-outline-variant/30 px-space-xs py-0.5">
            WINDOW: T-60s
          </span>
        </div>
        <div className="flex items-center gap-space-lg font-telemetry-sm text-telemetry-sm text-outline mt-space-xs sm:mt-0">
          <div className="flex items-center gap-space-xs">
            <span className="w-1.5 h-1.5 bg-primary" />
            <span>STREAM 1: 840 MB/s</span>
          </div>
          <div className="flex items-center gap-space-xs">
            <span className="w-1.5 h-1.5" style={{ backgroundColor: "#DFBD69" }} />
            <span>STREAM 2: 410 MB/s</span>
          </div>
          <div className="flex items-center gap-space-xs">
            <span className="w-1.5 h-1.5 bg-outline" />
            <span>STREAM 3: 120 MB/s</span>
          </div>
        </div>
      </div>

      <div className="h-32 w-full bg-surface-container-low p-2 flex items-end relative overflow-hidden">
        <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 500 80">
          <defs>
            <linearGradient id="streamGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#DFBD69" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#DFBD69" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path
            d="M0 65 Q 50 60, 100 45 T 200 35 T 300 20 T 400 15 T 500 10 L 500 80 L 0 80 Z"
            fill="url(#streamGrad)"
          />
          <path
            d="M0 65 Q 50 60, 100 45 T 200 35 T 300 20 T 400 15 T 500 10"
            stroke="#DFBD69"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
};
