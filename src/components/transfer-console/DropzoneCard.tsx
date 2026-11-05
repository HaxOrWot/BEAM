"use client";

import React, { useState } from "react";
import { useP2P } from "@/context/P2PContext";
import { DEFAULT_CHUNK_SIZE } from "@/lib/p2p/protocol";

export const DropzoneCard: React.FC = () => {
  const { sendFile, connectionStatus, activePeer } = useP2P();
  const [isDragOver, setIsDragOver] = useState(false);
  const [stagedFile, setStagedFile] = useState<File | null>(null);
  const [transmitting, setTransmitting] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setStagedFile(files[0]);
  };

  const handleSend = async () => {
    if (!stagedFile) return;
    if (connectionStatus !== "CONNECTED" || !activePeer) {
      alert("Please connect to a destination node username in the Target Ingress card above before streaming.");
      return;
    }

    setTransmitting(true);
    await sendFile(stagedFile);
    setTransmitting(false);
  };

  const chunkCount = stagedFile ? Math.ceil(stagedFile.size / DEFAULT_CHUNK_SIZE) : 0;
  const isConnected = Boolean(connectionStatus === "CONNECTED" && activePeer);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragOver(false);
        handleFiles(e.dataTransfer.files);
      }}
      className={`bg-surface-container-lowest p-space-xl border-2 border-dashed transition-all flex flex-col items-center justify-center text-center gap-space-md ${
        isDragOver
          ? "border-primary bg-surface-container-high/40 scale-[1.005]"
          : stagedFile
          ? "border-primary/60 bg-surface-container-low"
          : "border-outline-variant hover:border-outline"
      }`}
    >
      <div className="w-16 h-16 bg-surface-container border border-outline-variant flex items-center justify-center text-primary">
        <span className="material-symbols-outlined text-[36px]">
          {stagedFile ? "draft" : "folder_zip"}
        </span>
      </div>

      {stagedFile ? (
        <div className="flex flex-col items-center gap-2 max-w-lg w-full">
          <span className="font-headline-sm text-headline-sm uppercase text-primary tracking-wider font-semibold truncate max-w-md">
            STAGED: {stagedFile.name}
          </span>
          <div className="flex items-center gap-3 font-telemetry-sm text-telemetry-sm text-outline">
            <span>SIZE: {(stagedFile.size / (1024 * 1024)).toFixed(2)} MB</span>
            <span>&bull;</span>
            <span className="text-primary">{chunkCount.toLocaleString()} CHUNKS (64 KiB)</span>
            <span>&bull;</span>
            <span>TYPE: {stagedFile.type || "BINARY"}</span>
          </div>

          <div className="flex items-center gap-3 pt-3">
            <button
              onClick={handleSend}
              disabled={transmitting || !isConnected}
              className={`px-space-xl py-2.5 font-headline-sm text-headline-sm uppercase tracking-wider font-semibold flex items-center gap-2 transition-all shadow-md ${
                isConnected
                  ? "bg-primary text-on-primary hover:bg-gold-warm cursor-pointer"
                  : "bg-surface-container-highest text-outline cursor-not-allowed border border-outline-variant"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {transmitting ? "hourglass_empty" : "send"}
              </span>
              <span>
                {transmitting
                  ? "STREAMING CHUNKS..."
                  : isConnected
                  ? `TRANSMIT TO @${activePeer}`
                  : "CONNECT TARGET PEER FIRST"}
              </span>
            </button>

            <button
              onClick={() => setStagedFile(null)}
              className="px-space-md py-2.5 bg-surface-container border border-outline-variant hover:bg-surface-container-high text-outline hover:text-primary font-label-caps text-label-caps uppercase transition-colors"
            >
              CLEAR
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-space-xs max-w-lg">
            <span className="font-headline-sm text-headline-sm uppercase text-primary tracking-wider font-semibold">
              DRAG ARCHIVES, BINARIES, OR FOLDERS HERE (DIRECT STREAMING)
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Payload streams directly to the remote peer's memory via WebRTC DataChannel without intermediate server storage.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-space-sm pt-space-xs">
            <label className="cursor-pointer px-space-md py-2 bg-surface-container border border-outline-variant hover:bg-surface-container-high text-primary font-headline-sm text-headline-sm uppercase tracking-wider flex items-center gap-space-xs transition-colors">
              <span className="material-symbols-outlined text-[18px]">hard_drive</span>
              <span>BROWSE LOCAL FILES</span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </label>
          </div>
        </>
      )}
    </div>
  );
};
