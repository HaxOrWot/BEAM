"use client";

import React from "react";

export const StreamCommandBar: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between border border-outline-variant/30 bg-surface-container-lowest p-space-md gap-space-md">
      <div className="flex flex-wrap items-center gap-space-sm">
        <button
          onClick={() => alert("Ring buffer flushed cleanly to NVMe pool.")}
          className="px-space-md py-1.5 font-label-caps text-label-caps uppercase transition-colors flex items-center gap-space-xs tracking-wider"
          style={{
            border: "1px solid rgb(197, 160, 89)",
            color: "rgb(223, 189, 105)",
            background: "rgba(212, 175, 55, 0.08)",
          }}
        >
          <span className="material-symbols-outlined text-[14px]">cleaning_services</span>
          <span>Flush Ring Buffer</span>
        </button>

        <button
          onClick={() => alert("All ingress TCP descriptors paused.")}
          className="px-space-md py-1.5 border border-outline-variant/30 hover:border-primary text-primary font-label-caps text-label-caps uppercase transition-colors flex items-center gap-space-xs tracking-wider"
        >
          <span className="material-symbols-outlined text-[14px]">pause_circle</span>
          <span>Pause Ingress</span>
        </button>

        <button
          onClick={() => alert("Audit log exported to /tmp/proto_rx_audit.json")}
          className="px-space-md py-1.5 border border-outline-variant/30 hover:border-primary text-primary font-label-caps text-label-caps uppercase transition-colors flex items-center gap-space-xs tracking-wider"
        >
          <span className="material-symbols-outlined text-[14px]">file_download</span>
          <span>Export RX Logs</span>
        </button>
      </div>

      <div className="font-telemetry-sm text-telemetry-sm text-outline">
        EPOCH TIME: <span className="text-primary font-mono font-medium">1747582301</span>
      </div>
    </div>
  );
};
