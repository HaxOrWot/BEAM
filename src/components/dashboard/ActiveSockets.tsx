"use client";

import React from "react";
import Link from "next/link";
import { SectionHeader } from "../ui/SectionHeader";
import { Badge } from "../ui/Badge";
import { useP2P } from "@/context/P2PContext";
import { ArrowUpRight } from "lucide-react";

export const ActiveSockets: React.FC = () => {
  const { connectionStatus, activePeer, activeOutboundStream, activeInboundStream } = useP2P();

  return (
    <div className="bg-surface-low border border-surface-high p-4 mb-6">
      <SectionHeader
        title="Active TCP Sockets"
        tag="KERNEL STREAMS"
        action={
          <Link
            href="/streams"
            className="font-mono text-xs text-primary hover:underline flex items-center gap-1"
          >
            All Streams <ArrowUpRight size={13} />
          </Link>
        }
      />

      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-surface-high text-outline text-[10px] uppercase">
              <th className="pb-2 font-normal">Socket Type</th>
              <th className="pb-2 font-normal">Protocol</th>
              <th className="pb-2 font-normal">Remote Peer</th>
              <th className="pb-2 font-normal">State</th>
              <th className="pb-2 font-normal text-right">Throughput</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-high/50">
            {connectionStatus === "CONNECTED" && activePeer ? (
              <tr className="hover:bg-surface-high/20 transition-colors">
                <td className="py-2.5 text-primary font-medium">WEBRTC_DATACHANNEL</td>
                <td className="py-2.5 text-on-surface">SCTP/DTLS 1.3</td>
                <td className="py-2.5 text-on-surface-variant">@{activePeer}</td>
                <td className="py-2.5">
                  <Badge variant="active" size="sm">
                    ESTABLISHED
                  </Badge>
                </td>
                <td className="py-2.5 text-right text-primary font-mono-num">
                  {(
                    (activeOutboundStream?.speedMBps || 0) + (activeInboundStream?.speedMBps || 0)
                  ).toFixed(1)}{" "}
                  MB/s
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan={5} className="py-6 text-center text-outline">
                  No active socket tunnels open. Establish a handshake with a peer on the console.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
