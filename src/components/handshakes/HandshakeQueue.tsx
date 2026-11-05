"use client";

import React, { useState } from "react";

interface HandshakeReq {
  id: string;
  peer: string;
  ip: string;
  cipher: string;
  curve: string;
  status: "PENDING_AUTH" | "APPROVED" | "REJECTED";
  timestamp: string;
  fingerprint: string;
}

const INITIAL_REQUESTS: HandshakeReq[] = [
  {
    id: "req-9102",
    peer: "EQUINIX-TY8-PEER",
    ip: "203.0.113.88:9042",
    cipher: "CHACHA20-POLY1305",
    curve: "CURVE25519 (Ed25519)",
    status: "PENDING_AUTH",
    timestamp: "0.14s AGO",
    fingerprint: "SHA256: 8F7B:2C90:E345:89D8:9FFA:C013:2104:99AA",
  },
  {
    id: "req-9103",
    peer: "AWS-US-EAST-REVERSE-PROXY",
    ip: "198.51.100.14:9042",
    cipher: "TLS_AES_256_GCM_SHA384",
    curve: "X25519",
    status: "PENDING_AUTH",
    timestamp: "1.02s AGO",
    fingerprint: "SHA256: C190:4412:9A8F:001A:BB32:7721:55E0:1109",
  },
];

export const HandshakeQueue: React.FC = () => {
  const [requests, setRequests] = useState<HandshakeReq[]>(INITIAL_REQUESTS);

  const handleApprove = (id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "APPROVED" } : r))
    );
  };

  const handleReject = (id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "REJECTED" } : r))
    );
  };

  return (
    <div className="flex flex-col gap-space-md">
      <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/30">
        <div className="flex items-center gap-space-xs">
          <span className="w-1.5 h-1.5 bg-primary" />
          <span className="font-label-caps text-label-caps uppercase text-primary tracking-wider font-semibold">
            LIVE INGRESS HANDSHAKE QUEUE
          </span>
        </div>
        <span className="font-telemetry-sm text-telemetry-sm text-outline">
          AUTO-TIMEOUT: 30s
        </span>
      </div>

      <div className="flex flex-col gap-space-md">
        {requests.map((r) => (
          <div
            key={r.id}
            className="p-space-lg bg-surface-container-lowest border border-outline-variant/30 flex flex-col gap-space-md hover:bg-surface-container-low transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-xs border-b border-outline-variant/30">
              <div className="flex items-center gap-space-sm">
                <span className="font-headline-sm text-headline-sm text-primary font-medium tracking-tight">
                  {r.peer}
                </span>
                <span className="font-label-caps text-label-caps border border-outline-variant/30 px-space-xs py-0.5 text-outline">
                  {r.ip}
                </span>
              </div>
              <span className="font-telemetry-sm text-telemetry-sm text-outline font-mono">
                {r.timestamp}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm font-telemetry-sm text-telemetry-sm">
              <div className="flex justify-between border-b border-outline-variant/20 pb-1">
                <span className="text-outline">CIPHER SUITE</span>
                <span className="text-primary font-mono">{r.cipher}</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/20 pb-1">
                <span className="text-outline">KEY EXCHANGE</span>
                <span className="text-on-surface font-mono">{r.curve}</span>
              </div>
              <div className="md:col-span-2 flex flex-col gap-1">
                <span className="text-outline font-label-caps text-label-caps">PEER FINGERPRINT:</span>
                <span className="text-primary font-mono text-[11px] select-all break-all bg-surface-container-low p-1.5 border border-outline-variant/30">
                  {r.fingerprint}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-space-xs">
              <span className={`font-label-caps text-label-caps uppercase ${
                r.status === "APPROVED"
                  ? "text-primary"
                  : r.status === "REJECTED"
                  ? "text-red-400"
                  : "text-outline"
              }`}>
                STATUS: {r.status}
              </span>

              {r.status === "PENDING_AUTH" && (
                <div className="flex items-center gap-space-xs">
                  <button
                    onClick={() => handleReject(r.id)}
                    className="px-space-md py-1 border border-outline-variant/30 hover:border-red-500 text-outline hover:text-red-400 font-label-caps text-label-caps uppercase transition-colors"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleApprove(r.id)}
                    className="px-space-md py-1 bg-primary text-on-primary hover:bg-gold-warm font-label-caps text-label-caps uppercase font-semibold transition-all shadow-[0_0_8px_rgba(212,175,55,0.25)]"
                  >
                    Approve Ingress
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
