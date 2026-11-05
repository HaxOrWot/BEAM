"use client";

import React, { useState } from "react";
import { ChunkInspectModal } from "./ChunkInspectModal";

interface StreamItem {
  id: string;
  name: string;
  peer: string;
  cid: string;
  totalSize: string;
  written: string;
  speed: string;
  eta: string;
  progress: number;
  digest: string;
}

const INBOUND_STREAMS: StreamItem[] = [
  {
    id: "st1",
    name: "model_weights_llama3_70b.safetensors",
    peer: "192.168.1.45:9042",
    cid: "SOCK_FD_31",
    totalSize: "140.8 GB",
    written: "109.8 GB",
    speed: "840.4 MB/s",
    eta: "14s (78%)",
    progress: 78,
    digest: "BLAKE3: 0x9AF8...E23A",
  },
  {
    id: "st2",
    name: "genomics_sequencing_chr22.bam",
    peer: "192.88.99.1:9042",
    cid: "SOCK_FD_44",
    totalSize: "42.0 GB",
    written: "18.9 GB",
    speed: "410.2 MB/s",
    eta: "56s (45%)",
    progress: 45,
    digest: "BLAKE3: 0xC112...884F",
  },
  {
    id: "st3",
    name: "kernel_core_dump_raw_mem.dmp",
    peer: "10.0.4.12:9042",
    cid: "SOCK_FD_52",
    totalSize: "8.4 GB",
    written: "7.9 GB",
    speed: "120.0 MB/s",
    eta: "4s (94%)",
    progress: 94,
    digest: "BLAKE3: 0xFA40...1911",
  },
];

export const ActivePipelineTable: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStream, setSelectedStream] = useState<StreamItem>(INBOUND_STREAMS[0]);

  return (
    <div className="flex flex-col gap-space-md">
      <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/30">
        <div className="flex items-center gap-space-sm">
          <span className="font-headline-sm text-headline-sm text-primary uppercase tracking-tight font-semibold">
            ACTIVE INBOUND PIPELINE
          </span>
          <span className="font-label-caps text-label-caps text-on-surface-variant border border-outline-variant/30 px-space-xs py-0.5">
            3 DESCRIPTORS OPEN
          </span>
        </div>
        <span className="font-telemetry-sm text-telemetry-sm text-outline">
          IO_URING DEPTH: <strong className="text-primary font-medium font-mono">128 SQEs</strong>
        </span>
      </div>

      <div className="border border-outline-variant/30 bg-surface-container-lowest divide-y divide-outline-variant/30">
        {INBOUND_STREAMS.map((s) => (
          <div key={s.id} className="p-space-lg flex flex-col gap-space-md hover:bg-surface-container-low transition-colors">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md">
              <div className="flex flex-col gap-space-xs min-w-0">
                <div className="flex flex-wrap items-center gap-space-sm">
                  <span className="w-1.5 h-1.5 bg-primary" />
                  <span className="font-headline-sm text-headline-sm text-primary font-medium tracking-tight truncate">
                    {s.name}
                  </span>
                  <span className="font-label-caps text-label-caps border border-outline-variant/30 px-space-xs py-0.5 text-outline uppercase">
                    Direct I/O
                  </span>
                  <span className="font-label-caps text-label-caps border border-outline-variant/30 px-space-xs py-0.5 text-outline uppercase">
                    io_uring
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-space-md font-telemetry-sm text-telemetry-sm text-outline">
                  <span>PEER: <strong className="text-primary font-mono">{s.peer}</strong></span>
                  <span>&bull;</span>
                  <span>CID: <strong className="text-primary font-mono">{s.cid}</strong></span>
                  <span>&bull;</span>
                  <span>TOTAL: {s.totalSize}</span>
                  <span>&bull;</span>
                  <span>WRITTEN: {s.written}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-space-lg">
                <div className="flex flex-col items-start xl:items-end">
                  <div className="flex items-baseline gap-space-xs">
                    <span className="font-metric-xl text-metric-xl text-primary font-medium tracking-tight">
                      {s.speed}
                    </span>
                  </div>
                  <span className="font-telemetry-sm text-telemetry-sm text-outline">
                    ETA: <strong className="text-primary font-normal">{s.eta}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-space-xs">
                  <button
                    onClick={() => {
                      setSelectedStream(s);
                      setModalOpen(true);
                    }}
                    className="px-space-md py-1 border border-outline-variant/30 hover:border-primary text-on-surface hover:text-primary font-label-caps text-label-caps uppercase transition-colors"
                  >
                    Inspect
                  </button>
                  <button
                    onClick={() => alert(`Throttling requested for: ${s.name}`)}
                    className="px-space-md py-1 border border-outline-variant/30 hover:border-primary text-on-surface hover:text-primary font-label-caps text-label-caps uppercase transition-colors"
                  >
                    Throttle
                  </button>
                  <button
                    onClick={() => alert(`Stream abort signal sent for: ${s.name}`)}
                    className="px-space-md py-1 border border-outline-variant/30 hover:border-red-500 text-outline hover:text-red-400 font-label-caps text-label-caps uppercase transition-colors"
                  >
                    Abort
                  </button>
                </div>
              </div>
            </div>

            {/* Segmented Progress Bar */}
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between font-label-caps text-label-caps text-outline">
                <span>BYTE CHUNK DISK COMMIT (4MB BLOCKS)</span>
                <span className="text-primary font-mono">{s.digest}</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container-high overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${s.progress}%`, backgroundColor: "#DFBD69" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <ChunkInspectModal streamName={selectedStream.name} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
};
