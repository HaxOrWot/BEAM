"use client";

import React from "react";

interface ChunkInspectModalProps {
  streamName: string;
  onClose: () => void;
}

export const ChunkInspectModal: React.FC<ChunkInspectModalProps> = ({ streamName, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-space-lg">
      <div className="bg-surface-container-low max-w-3xl w-full p-space-xl flex flex-col gap-space-lg shadow-xl border border-outline-variant">
        <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant">
          <div className="flex items-center gap-space-sm">
            <span className="font-headline-sm text-headline-sm text-primary uppercase font-semibold">
              INSPECT CHUNK TREE
            </span>
            <span className="font-label-caps text-label-caps bg-surface-container px-space-xs py-0.5 text-outline">
              BLAKE3 4MB SLICES
            </span>
          </div>
          <button onClick={onClose} className="text-outline hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="font-mono text-xs text-primary truncate">
          STREAM: {streamName}
        </div>

        {/* 64 Chunk Blocks Grid */}
        <div className="grid grid-cols-8 gap-1 p-space-md bg-surface-container-lowest font-mono text-[10px] border border-outline-variant">
          {Array.from({ length: 64 }).map((_, i) => {
            const isDone = i < 48;
            const isCurrent = i === 48;
            return (
              <div
                key={i}
                className={`p-1.5 text-center transition-colors ${
                  isDone
                    ? "bg-primary text-on-primary font-semibold"
                    : isCurrent
                    ? "bg-primary/40 text-primary animate-pulse"
                    : "bg-surface-container text-outline"
                }`}
              >
                #{String(i + 1).padStart(3, "0")}
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-space-xs font-telemetry-sm text-telemetry-sm text-outline border-t border-outline-variant">
          <span>TREE STATUS: 48/64 VALIDATED</span>
          <button
            onClick={onClose}
            className="px-space-md py-1 bg-surface-container hover:bg-surface-container-high text-primary font-label-caps text-label-caps uppercase border border-outline-variant"
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
};
