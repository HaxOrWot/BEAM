"use client";

import React, { useState } from "react";

export const ActiveStreamsCard: React.FC = () => {
  const [stream1Running, setStream1Running] = useState(true);
  const [stream2Running, setStream2Running] = useState(true);

  // 48 chunks for stream 1
  const s1Chunks = Array.from({ length: 48 }, (_, i) => {
    if (i < 40) return "verified"; // white
    if (i < 43) return "gold"; // in-flight gold
    return "pending"; // dark
  });

  // 48 chunks for stream 2
  const s2Chunks = Array.from({ length: 48 }, (_, i) => {
    if (i < 42) return "verified"; // white
    if (i < 45) return "gold"; // in-flight
    return "pending";
  });

  return (
    <div className="bg-surface-container-lowest p-space-lg border border-outline-variant flex flex-col gap-space-md">
      <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-[18px] text-primary">swap_vert</span>
          <span className="font-headline-sm text-headline-sm uppercase tracking-wider text-primary font-medium">
            ACTIVE CONCURRENT STREAM SESSIONS (2)
          </span>
        </div>
        <span className="font-label-caps text-label-caps uppercase text-outline">
          TCP CONGESTION CONTROL: BBR v3
        </span>
      </div>

      <div className="flex flex-col gap-space-lg">
        {/* Stream 1 */}
        <div className="bg-surface-container-low p-space-md border border-outline-variant flex flex-col gap-space-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-xs">
            <div className="flex items-center gap-space-sm">
              <span className="font-headline-sm text-headline-sm text-primary font-medium truncate">
                archive_linux_kernel_v6.8.tar.gz
              </span>
              <span className="font-label-caps text-label-caps uppercase px-space-xs py-0.5 bg-surface-container-high text-primary shrink-0">
                OUTBOUND TX
              </span>
            </div>

            <div className="flex items-center gap-space-md">
              <span
                className="font-headline-lg text-headline-lg font-medium"
                style={{ color: "rgb(223, 189, 105)" }}
              >
                428.4 <span className="font-telemetry-sm text-telemetry-sm text-primary">MB/s</span>
              </span>

              <button
                onClick={() => setStream1Running(!stream1Running)}
                className="px-space-sm py-1 bg-surface-container border border-outline-variant hover:bg-surface-container-high text-primary font-label-caps text-label-caps uppercase"
              >
                {stream1Running ? "PAUSE" : "RESUME"}
              </button>
            </div>
          </div>

          {/* Telemetry info */}
          <div className="flex flex-wrap items-center justify-between gap-space-sm font-telemetry-sm text-telemetry-sm text-outline">
            <span>CHUNKS: 4,281 / 5,120 (83.6%)</span>
            <span>ETA: 14s &bull; REMAINING: 839 MB</span>
            <span className="text-primary">PEER: 192.88.99.1:9042</span>
          </div>

          {/* 48-packet chunk block strip */}
          <div className="flex gap-[2px] w-full bg-surface-container-lowest p-1 border border-outline-variant">
            {s1Chunks.map((c, i) => (
              <div
                key={i}
                className={`h-3 flex-1 ${
                  c === "verified"
                    ? "bg-primary"
                    : c === "gold"
                    ? "animate-pulse"
                    : "bg-surface-container-high/40"
                }`}
                style={c === "gold" ? { backgroundColor: "#DFBD69" } : {}}
              />
            ))}
          </div>
        </div>

        {/* Stream 2 */}
        <div className="bg-surface-container-low p-space-md border border-outline-variant flex flex-col gap-space-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-xs">
            <div className="flex items-center gap-space-sm">
              <span className="font-headline-sm text-headline-sm text-primary font-medium truncate">
                render_seq_8k_master.exr
              </span>
              <span className="font-label-caps text-label-caps uppercase px-space-xs py-0.5 bg-surface-container-high text-primary shrink-0">
                INBOUND RX
              </span>
            </div>

            <div className="flex items-center gap-space-md">
              <span className="font-headline-lg text-headline-lg text-primary font-medium">
                890.1 <span className="font-telemetry-sm text-telemetry-sm text-primary">MB/s</span>
              </span>

              <button
                onClick={() => setStream2Running(!stream2Running)}
                className="px-space-sm py-1 bg-surface-container border border-outline-variant hover:bg-surface-container-high text-primary font-label-caps text-label-caps uppercase"
              >
                {stream2Running ? "PAUSE" : "RESUME"}
              </button>
            </div>
          </div>

          {/* Telemetry info */}
          <div className="flex flex-wrap items-center justify-between gap-space-sm font-telemetry-sm text-telemetry-sm text-outline">
            <span>CHUNKS: 11,402 / 12,800 (89.1%)</span>
            <span>ETA: 8s &bull; REMAINING: 1,398 MB</span>
            <span className="text-primary">PEER: 10.0.4.12:9042</span>
          </div>

          {/* 48-packet chunk block strip */}
          <div className="flex gap-[2px] w-full bg-surface-container-lowest p-1 border border-outline-variant">
            {s2Chunks.map((c, i) => (
              <div
                key={i}
                className={`h-3 flex-1 ${
                  c === "verified"
                    ? "bg-primary"
                    : c === "gold"
                    ? "animate-pulse"
                    : "bg-surface-container-high/40"
                }`}
                style={c === "gold" ? { backgroundColor: "#DFBD69" } : {}}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
