"use client";

import React from "react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { useP2P } from "@/context/P2PContext";
import { Shield, Copy } from "lucide-react";

export const KeyList: React.FC = () => {
  const { identity } = useP2P();

  const userKeys = [
    {
      id: "key-primary",
      label: `MASTER IDENTITY (${identity.username.toUpperCase()})`,
      algorithm: "ED25519 / CURVE25519",
      fingerprint: identity.publicKeyHex,
      status: "ACTIVE" as const,
      createdDate: new Date(identity.createdAt).toISOString().split("T")[0],
    },
    {
      id: "key-ephemeral",
      label: "EPHEMERAL X25519 RATIO SESSION",
      algorithm: "X25519 ECDH",
      fingerprint: `0x${identity.callsign}_SESSION_KEY_ACTIVE`,
      status: "ACTIVE" as const,
      createdDate: new Date().toISOString().split("T")[0],
    },
  ];

  return (
    <div className="bg-surface-low border border-surface-high p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-surface-high gap-2 mb-4">
        <div>
          <h3 className="font-mono text-xs font-semibold text-primary uppercase tracking-wider">
            Cryptographic Key Ring
          </h3>
          <p className="text-[11px] text-outline mt-0.5">
            Hardware-backed and Web Crypto attestation keys for node @{identity.username}.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {userKeys.map((key) => (
          <div
            key={key.id}
            className="p-3 bg-surface-lowest border border-surface-high flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-outline/50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-surface-high/30 border border-surface-high text-primary mt-0.5">
                <Shield size={14} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-medium text-primary">
                    {key.label}
                  </span>
                  <Badge variant="active" size="sm">
                    {key.status}
                  </Badge>
                </div>
                <div className="font-mono text-[11px] text-outline mt-1 font-mono-num break-all">
                  Fingerprint: {key.fingerprint}
                </div>
                <div className="font-mono text-[10px] text-on-surface-variant mt-0.5">
                  Algorithm: <span className="text-primary">{key.algorithm}</span> &bull; Enrolled: {key.createdDate}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  navigator.clipboard?.writeText(key.fingerprint);
                  alert("Copied fingerprint to clipboard");
                }}
              >
                <Copy size={11} /> Copy
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
