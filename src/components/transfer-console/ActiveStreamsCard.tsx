"use client";

import React from "react";
import { useP2P } from "@/context/P2PContext";
import { ActiveStreamState } from "@/lib/p2p/webrtc";

const StreamRow: React.FC<{ stream: ActiveStreamState }> = ({ stream }) => {
  // Map progress % across 48 discrete visual blocks
  const completedBlocks = Math.floor((stream.progressPercent / 100) * 48);

  return (
    <div className="bg-surface-container-low p-space-md border border-outline-variant flex flex-col gap-space-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-xs">
        <div className="flex items-center gap-space-sm truncate max-w-md">
          <span className="font-headline-sm text-headline-sm text-primary font-medium truncate">
            {stream.name}
          </span>
          <span
            className={`font-label-caps text-label-caps uppercase px-space-xs py-0.5 shrink-0 ${
              stream.direction === "outbound"
                ? "bg-surface-container-high text-primary"
                : "bg-primary/20 text-primary border border-primary/40"
            }`}
          >
            {stream.direction === "outbound" ? "OUTBOUND TX" : "INBOUND RX"}
          </span>
        </div>

        <div className="flex items-center gap-space-md">
          <span
            className="font-headline-lg text-headline-lg font-medium"
            style={{ color: "rgb(223, 189, 105)" }}
          >
            {stream.speedMBps.toFixed(1)}{" "}
            <span className="font-telemetry-sm text-telemetry-sm text-primary">MB/s</span>
          </span>

          <span className="font-label-caps text-label-caps uppercase px-2 py-1 bg-surface-container text-primary font-mono text-xs">
            {stream.status === "completed" ? "COMPLETED" : `${stream.progressPercent}%`}
          </span>
        </div>
      </div>

      {/* Telemetry info */}
      <div className="flex flex-wrap items-center justify-between gap-space-sm font-telemetry-sm text-telemetry-sm text-outline">
        <span>
          CHUNKS: {stream.currentChunk.toLocaleString()} / {stream.totalChunks.toLocaleString()} (
          {stream.progressPercent}%)
        </span>
        <span>
          {stream.status === "completed"
            ? "ALL CHUNKS VERIFIED"
            : `ETA: ${stream.etaSeconds}s &bull; TRANSFERRED: ${(
                stream.transferredBytes /
                (1024 * 1024)
              ).toFixed(1)} / ${(stream.totalBytes / (1024 * 1024)).toFixed(1)} MB`}
        </span>
        <span className="text-primary font-semibold">PEER: @{stream.peer}</span>
      </div>

      {/* 48-packet chunk block strip */}
      <div className="flex gap-[2px] w-full bg-surface-container-lowest p-1 border border-outline-variant">
        {Array.from({ length: 48 }).map((_, i) => {
          const isDone = i < completedBlocks;
          const isCurrent = i === completedBlocks && stream.status === "transferring";
          return (
            <div
              key={i}
              className={`h-3 flex-1 ${
                isDone
                  ? "bg-primary"
                  : isCurrent
                  ? "animate-pulse"
                  : "bg-surface-container-high/40"
              }`}
              style={isCurrent ? { backgroundColor: "#DFBD69" } : {}}
            />
          );
        })}
      </div>
    </div>
  );
};

export const ActiveStreamsCard: React.FC = () => {
  const { activeOutboundStream, activeInboundStream, connectionStatus, activePeer } = useP2P();

  const streams = [activeOutboundStream, activeInboundStream].filter(Boolean) as ActiveStreamState[];

  return (
    <div className="bg-surface-container-lowest p-space-lg border border-outline-variant flex flex-col gap-space-md">
      <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-[18px] text-primary">swap_vert</span>
          <span className="font-headline-sm text-headline-sm uppercase tracking-wider text-primary font-medium">
            ACTIVE CONCURRENT STREAM SESSIONS ({streams.length})
          </span>
        </div>
        <span className="font-label-caps text-label-caps uppercase text-outline">
          {connectionStatus === "CONNECTED"
            ? `P2P SOCKET OPEN -> @${activePeer}`
            : "SCTP DATACHANNEL AWAITING PEER"}
        </span>
      </div>

      {streams.length === 0 ? (
        <div className="p-space-lg bg-surface-container-low/50 border border-dashed border-outline-variant text-center flex flex-col items-center justify-center gap-2">
          <span className="material-symbols-outlined text-outline text-[32px]">sync_disabled</span>
          <span className="font-headline-sm text-headline-sm text-outline uppercase">
            NO ACTIVE STREAMS IN FLIGHT
          </span>
          <p className="font-body-sm text-xs text-on-surface-variant max-w-md">
            Connect to a peer username above and drop a file into the staging zone to stream payload chunks at wire rate.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-space-lg">
          {streams.map((stream) => (
            <StreamRow key={stream.id} stream={stream} />
          ))}
        </div>
      )}
    </div>
  );
};
