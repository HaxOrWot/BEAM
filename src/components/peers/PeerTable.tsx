"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { MOCK_PEERS } from "@/lib/mock-data";
import { Plus, Radio, Zap } from "lucide-react";

export const PeerTable: React.FC = () => {
  return (
    <div className="bg-surface-low border border-surface-high p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-surface-high gap-2 mb-4">
        <div>
          <h3 className="font-mono text-xs font-semibold text-primary uppercase tracking-wider">
            Connected Mesh Peers ({MOCK_PEERS.length})
          </h3>
          <p className="text-[11px] text-outline mt-0.5">
            Synchronous point-to-point sockets with cryptographic handshakes.
          </p>
        </div>

        <Link href="/enrollment">
          <Button variant="primary" size="sm">
            <Plus size={12} />
            Enroll Peer Node
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-surface-high text-outline text-[10px] uppercase">
              <th className="pb-2 font-normal">Node Alias</th>
              <th className="pb-2 font-normal">Endpoint IP</th>
              <th className="pb-2 font-normal">Status</th>
              <th className="pb-2 font-normal">Latency</th>
              <th className="pb-2 font-normal">Throughput (Up/Down)</th>
              <th className="pb-2 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-high/50">
            {MOCK_PEERS.map((peer) => (
              <tr key={peer.id} className="hover:bg-surface-high/20 transition-colors">
                <td className="py-3">
                  <div className="text-primary font-medium">{peer.alias}</div>
                  <div className="text-[10px] text-outline">{peer.protocol}</div>
                </td>
                <td className="py-3 text-on-surface">{peer.endpoint}</td>
                <td className="py-3">
                  <Badge variant={peer.status === "ONLINE" ? "active" : "sync"} size="sm">
                    {peer.status}
                  </Badge>
                </td>
                <td className="py-3 text-primary font-mono-num">{peer.latency} ms</td>
                <td className="py-3 font-mono-num text-on-surface">
                  <span className="text-primary">&uarr; {peer.uploadSpeed}</span> /{" "}
                  <span className="text-secondary">&darr; {peer.downloadSpeed}</span>
                </td>
                <td className="py-3 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => alert(`Probing latency to ${peer.alias}... RTT: ${peer.latency} ms`)}
                  >
                    <Zap size={11} /> Ping
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
