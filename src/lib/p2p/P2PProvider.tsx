"use client";

import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from "react";
import { BeamP2PEngine, FileManifest, P2PProgressCallback } from "./engine";
import { useBeamStore } from "@/lib/store";

export interface P2PTransferStatus {
  isStreaming: boolean;
  fileId: string;
  fileName: string;
  bytesTransferred: number;
  totalBytes: number;
  percent: number;
  speedMBs: number;
  direction: "sending" | "receiving" | "idle";
  peerHandle: string;
}

interface P2PContextType {
  status: P2PTransferStatus;
  receivedBlobs: Record<string, Blob>;
  sendFiles: (recipientHandle: string, files: File[]) => Promise<boolean>;
  getReceivedBlob: (fileName: string) => Blob | undefined;
}

const P2PContext = createContext<P2PContextType>({
  status: {
    isStreaming: false,
    fileId: "",
    fileName: "",
    bytesTransferred: 0,
    totalBytes: 0,
    percent: 0,
    speedMBs: 0,
    direction: "idle",
    peerHandle: "",
  },
  receivedBlobs: {},
  sendFiles: async () => false,
  getReceivedBlob: () => undefined,
});

export const P2PProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useBeamStore();
  const engineRef = useRef<BeamP2PEngine | null>(null);
  const [receivedBlobs, setReceivedBlobs] = useState<Record<string, Blob>>({});
  const [status, setStatus] = useState<P2PTransferStatus>({
    isStreaming: false,
    fileId: "",
    fileName: "",
    bytesTransferred: 0,
    totalBytes: 0,
    percent: 0,
    speedMBs: 0,
    direction: "idle",
    peerHandle: "",
  });

  // Initialize engine when logged in
  useEffect(() => {
    if (!user.isLoggedIn || !user.handle) {
      if (engineRef.current) {
        engineRef.current.destroy();
        engineRef.current = null;
      }
      return;
    }

    const engine = new BeamP2PEngine(user.handle);
    engineRef.current = engine;

    engine.setCallbacks({
      onProgress: (p) => {
        setStatus((prev) => ({
          ...prev,
          isStreaming: p.percent < 100,
          fileId: p.fileId,
          fileName: p.fileName,
          bytesTransferred: p.bytesTransferred,
          totalBytes: p.totalBytes,
          percent: p.percent,
          speedMBs: p.speedMBs,
        }));
      },
      onFileReceived: ({ manifest, blob }) => {
        setReceivedBlobs((prev) => ({
          ...prev,
          [manifest.name]: blob,
        }));
        setStatus((prev) => ({
          ...prev,
          isStreaming: false,
          percent: 100,
          direction: "idle",
        }));
      },
    });

    engine.initSignaling();

    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, [user.isLoggedIn, user.handle]);

  const sendFiles = useCallback(
    async (recipientHandle: string, files: File[]): Promise<boolean> => {
      if (!engineRef.current) return false;
      const cleanTarget = recipientHandle.replace(/^@/, "").trim();

      setStatus({
        isStreaming: true,
        fileId: "",
        fileName: files[0]?.name || "Payload",
        bytesTransferred: 0,
        totalBytes: files.reduce((acc, f) => acc + f.size, 0),
        percent: 0,
        speedMBs: 0,
        direction: "sending",
        peerHandle: cleanTarget,
      });

      try {
        const success = await engineRef.current.sendFilesToPeer(cleanTarget, files);
        setStatus((prev) => ({ ...prev, isStreaming: false, percent: 100, direction: "idle" }));
        return success;
      } catch (err) {
        console.error("WebRTC send error:", err);
        setStatus((prev) => ({ ...prev, isStreaming: false, direction: "idle" }));
        return false;
      }
    },
    []
  );

  const getReceivedBlob = useCallback(
    (fileName: string) => receivedBlobs[fileName],
    [receivedBlobs]
  );

  return (
    <P2PContext.Provider value={{ status, receivedBlobs, sendFiles, getReceivedBlob }}>
      {children}
    </P2PContext.Provider>
  );
};

export function useBeamP2P() {
  return useContext(P2PContext);
}
