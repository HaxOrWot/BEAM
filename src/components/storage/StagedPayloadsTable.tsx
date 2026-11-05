"use client";

import React from "react";

export const StagedPayloadsTable: React.FC = () => {
  const payloads = [
    {
      name: "raw_telemetry_dump_apr24.zst",
      size: "18.4 GB",
      mount: "/mnt/nvme-fast-pool/inbox/proto-rx",
      status: "WRITING",
      speed: "1.12 GB/s",
      progress: 64,
    },
    {
      name: "deep_weights_safetensors.bin",
      size: "84.2 GB",
      mount: "/mnt/nvme-fast-pool/inbox/proto-rx",
      status: "COMPLETED",
      speed: "--",
      progress: 100,
    },
    {
      name: "crypto_audit_epoch_174.tar",
      size: "4.1 GB",
      mount: "/mnt/nvme-fast-pool/inbox/proto-rx",
      status: "QUEUED",
      speed: "--",
      progress: 0,
    },
  ];

  return (
    <div className="flex flex-col gap-space-md">
      <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/30">
        <span className="font-headline-sm text-headline-sm text-primary uppercase font-semibold">
          STAGED INGRESS PAYLOADS
        </span>
        <span className="font-telemetry-sm text-telemetry-sm text-outline font-mono">3 ITEMS IN STAGING</span>
      </div>

      <div className="border border-outline-variant/30 bg-surface-container-lowest divide-y divide-outline-variant/30">
        {payloads.map((p, idx) => (
          <div key={idx} className="p-space-md flex flex-col gap-space-xs hover:bg-surface-container-low transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
              <span className="font-telemetry-md text-telemetry-md text-primary font-medium font-mono truncate">
                {p.name}
              </span>
              <div className="flex items-center gap-space-sm font-mono text-xs">
                <span className="text-outline">{p.size}</span>
                <span className={`px-space-xs py-0.5 text-[10px] uppercase font-semibold ${
                  p.status === "COMPLETED"
                    ? "bg-primary text-black"
                    : p.status === "WRITING"
                    ? "border border-primary text-primary"
                    : "bg-surface-container text-outline"
                }`}>
                  {p.status}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-outline">
              <span className="truncate">{p.mount}</span>
              {p.speed !== "--" && <span className="text-primary font-medium">{p.speed}</span>}
            </div>

            <div className="h-1 w-full bg-surface-container-high overflow-hidden mt-1">
              <div
                className="h-full bg-primary"
                style={{ width: `${p.progress}%`, backgroundColor: "#DFBD69" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
