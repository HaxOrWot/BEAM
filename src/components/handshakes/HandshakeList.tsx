import React from "react";
import { Badge } from "../ui/Badge";
import { ShieldCheck, Check, Clock } from "lucide-react";

export const HandshakeList: React.FC = () => {
  const handshakes = [
    { id: "hs-101", peer: "mesh-us-east-core1", cipher: "TLS_AES_256_GCM_SHA384", time: "01:47:02", state: "AUTHORIZED", rtt: "0.12 ms" },
    { id: "hs-102", peer: "mesh-eu-central-edge", cipher: "CHACHA20_POLY1305_SHA256", time: "01:46:44", state: "AUTHORIZED", rtt: "0.18 ms" },
    { id: "hs-103", peer: "mesh-ap-northeast-gw", cipher: "ECDHE_ED25519", time: "01:46:12", state: "NEGOTIATING", rtt: "0.29 ms" },
  ];

  return (
    <div className="bg-surface-low border border-surface-high p-4 mb-6">
      <div className="font-mono text-xs font-semibold text-primary uppercase tracking-wider mb-3">
        Cryptographic Socket Handshakes
      </div>

      <div className="space-y-2.5">
        {handshakes.map((h) => (
          <div
            key={h.id}
            className="p-3 bg-surface-lowest border border-surface-high flex flex-col sm:flex-row sm:items-center justify-between gap-2"
          >
            <div className="flex items-center gap-3">
              {h.state === "AUTHORIZED" ? (
                <ShieldCheck size={16} className="text-primary" />
              ) : (
                <Clock size={16} className="text-secondary animate-pulse" />
              )}
              <div>
                <div className="font-mono text-xs font-medium text-primary">
                  {h.peer}
                </div>
                <div className="font-mono text-[10px] text-outline">
                  Session: {h.id} &bull; Cipher: {h.cipher} &bull; {h.time}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-outline font-mono-num">{h.rtt}</span>
              <Badge variant={h.state === "AUTHORIZED" ? "active" : "sync"} size="sm">
                {h.state}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
