"use client";

import React, { useState } from "react";
import { ChunkInspectModal } from "./ChunkInspectModal";
import { useP2P } from "@/context/P2PContext";

export const ActivePipelineTable: React.FC = () => {
  const { activeInboundStream, activeOutboundStream } = useP2P();
  const [modalOpen, setModalOpen] = useState(false);

  const streams = [activeInboundStream, activeOutboundStream].filter(Boolean);

  return (
    <div className="bg-surface-container-lowest p-space-lg border border-outline-variant flex flex-col gap-space-md">
      <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-[18px] text-primary">download</span>
          <span className="font-headline-sm text-headline-sm uppercase text-primary tracking-wider font-semibold">
            ACTIVE INGRESS/EGRESS PIPELINES ({streams.length})
          </span>
        </div>
        <span className="font-label-caps text-label-caps uppercase text-outline">
          ZERO-COPY DMA RING ALLOCATOR
        </span>
      </div>

      {streams.length === 0 ? (
        <div className="p-8 text-center text-outline font-mono text-xs border border-dashed border-outline-variant">
          AWAITING INCOMING RAW TCP / WEBRTC STREAMS. NO TRANSACTIONS ACTIVE.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-outline-variant text-outline uppercase font-label-caps text-[10px]">
                <th className="p-2">STREAM NAME</th>
                <th className="p-2">DIRECTION</th>
                <th className="p-2">PEER NODE</th>
                <th className="p-2">SPEED</th>
                <th className="p-2">TRANSFERRED</th>
                <th className="p-2">PROGRESS</th>
                <th className="p-2 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {streams.map((stream) => (
                <tr key={stream!.id} className="border-b border-outline-variant/40 hover:bg-surface-container-low transition-colors">
                  <td className="p-2 text-primary font-semibold truncate max-w-xs">{stream!.name}</td>
                  <td className="p-2 uppercase text-outline">{stream!.direction}</td>
                  <td className="p-2 text-primary font-semibold">@{stream!.peer}</td>
                  <td className="p-2 text-gold-light font-bold">{stream!.speedMBps.toFixed(1)} MB/s</td>
                  <td className="p-2 text-on-surface">
                    {(stream!.transferredBytes / (1024 * 1024)).toFixed(1)} / {(stream!.totalBytes / (1024 * 1024)).toFixed(1)} MB
                  </td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-surface-container-high h-2">
                        <div
                          className="bg-primary h-2"
                          style={{ width: `${stream!.progressPercent}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-outline">{stream!.progressPercent}%</span>
                    </div>
                  </td>
                  <td className="p-2 text-right">
                    <button
                      onClick={() => setModalOpen(true)}
                      className="px-2 py-1 bg-surface-container border border-outline-variant text-primary hover:bg-surface-container-high uppercase text-[10px]"
                    >
                      INSPECT CHUNKS
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && streams[0] && (
        <ChunkInspectModal
          streamName={streams[0].name}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};
