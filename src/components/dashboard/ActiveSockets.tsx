import React from "react";
import Link from "next/link";
import { SectionHeader } from "../ui/SectionHeader";
import { Badge } from "../ui/Badge";
import { MOCK_SOCKETS } from "@/lib/mock-data";
import { ArrowUpRight } from "lucide-react";

export const ActiveSockets: React.FC = () => {
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
              <th className="pb-2 font-normal">Socket ID</th>
              <th className="pb-2 font-normal">Port</th>
              <th className="pb-2 font-normal">Remote Endpoint</th>
              <th className="pb-2 font-normal">State</th>
              <th className="pb-2 font-normal text-right">Throughput</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-high/50">
            {MOCK_SOCKETS.map((sock) => (
              <tr key={sock.id} className="hover:bg-surface-high/20 transition-colors">
                <td className="py-2.5 text-primary font-medium">{sock.id}</td>
                <td className="py-2.5 text-on-surface">{sock.localPort}</td>
                <td className="py-2.5 text-on-surface-variant">{sock.remoteEndpoint}</td>
                <td className="py-2.5">
                  <Badge
                    variant={
                      sock.state === "ESTABLISHED"
                        ? "active"
                        : sock.state === "SYN_SENT"
                        ? "sync"
                        : "idle"
                    }
                    size="sm"
                  >
                    {sock.state}
                  </Badge>
                </td>
                <td className="py-2.5 text-right text-primary font-mono-num">
                  {sock.throughput}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
