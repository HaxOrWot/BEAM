"use client";

import React from "react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { MOCK_SOCKETS } from "@/lib/mock-data";
import { ShieldCheck, ArrowDownLeft } from "lucide-react";

export const StreamIngressList: React.FC = () => {
  return (
    <div className="bg-surface-low border border-surface-high p-4 mb-6">
      <div className="flex items-center justify-between pb-3 border-b border-surface-high mb-3">
        <div className="font-mono text-xs font-semibold text-primary uppercase tracking-wider">
          Ingress Stream Connections ({MOCK_SOCKETS.length})
        </div>
        <span className="font-mono text-[10px] text-outline">PORT 9293 &bull; SYN_FLOOD_PROTECT: ON</span>
      </div>

      <div className="space-y-3">
        {MOCK_SOCKETS.map((sock) => (
          <div
            key={sock.id}
            className="p-3 bg-surface-lowest border border-surface-high flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-outline/50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-surface-high/30 border border-surface-high text-primary mt-0.5">
                <ArrowDownLeft size={14} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-primary font-medium">{sock.id}</span>
                  <Badge variant={sock.state === "ESTABLISHED" ? "active" : "sync"} size="sm">
                    {sock.state}
                  </Badge>
                </div>
                <div className="font-mono text-[11px] text-outline mt-1">
                  Remote: <span className="text-on-surface">{sock.remoteEndpoint}</span> &bull; Port: {sock.localPort}
                </div>
                <div className="font-mono text-[10px] text-on-surface-variant flex items-center gap-1 mt-0.5">
                  <ShieldCheck size={11} className="text-secondary" /> {sock.cipher}
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-0 border-surface-high pt-2 sm:pt-0">
              <div className="font-mono text-xs font-medium text-primary">
                {sock.throughput}
              </div>
              <div className="font-mono text-[10px] text-outline">
                RTT: {sock.rtt} ms
              </div>
              <Button variant="ghost" size="sm" className="mt-1" onClick={() => alert(`Reset socket: ${sock.id}`)}>
                RST Socket
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
