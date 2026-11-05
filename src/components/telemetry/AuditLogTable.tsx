import React from "react";
import { Badge } from "../ui/Badge";
import { ShieldCheck, AlertCircle } from "lucide-react";

export const AuditLogTable: React.FC = () => {
  const auditLogs = [
    { time: "01:48:22 UTC", event: "SOCKET_ESTABLISHED", target: "sock-9921", peer: "198.51.100.24", result: "SUCCESS" },
    { time: "01:47:58 UTC", event: "DMA_RING_ACQUIRED", target: "pool-tx-0", peer: "local-daemon", result: "SUCCESS" },
    { time: "01:46:11 UTC", event: "KEY_VERIFY_ED25519", target: "key-ed-01", peer: "203.0.113.88", result: "VALID" },
    { time: "01:44:30 UTC", event: "SYN_INGRESS_FILTER", target: "ebpf-hook-0", peer: "192.0.2.14", result: "PERMITTED" },
    { time: "01:42:01 UTC", event: "DMA_STREAM_FLUSH", target: "sock-9922", peer: "203.0.113.88", result: "SUCCESS" },
  ];

  return (
    <div className="bg-surface-lowest border border-surface-high p-4">
      <div className="flex items-center justify-between pb-3 border-b border-surface-high mb-3">
        <span className="font-mono text-xs font-semibold text-primary uppercase">
          Security & Socket Audit Trail
        </span>
        <span className="font-mono text-[10px] text-outline">CRYPTOGRAPHICALLY SIGNED LOGS</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-surface-high text-outline text-[10px] uppercase">
              <th className="pb-2 font-normal">Timestamp</th>
              <th className="pb-2 font-normal">Audit Event</th>
              <th className="pb-2 font-normal">Target Resource</th>
              <th className="pb-2 font-normal">Peer IP</th>
              <th className="pb-2 font-normal text-right">Audit Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-high/50">
            {auditLogs.map((log, idx) => (
              <tr key={idx} className="hover:bg-surface-high/20">
                <td className="py-2.5 text-on-surface-variant font-mono-num">{log.time}</td>
                <td className="py-2.5 text-primary font-medium">{log.event}</td>
                <td className="py-2.5 text-on-surface">{log.target}</td>
                <td className="py-2.5 text-outline">{log.peer}</td>
                <td className="py-2.5 text-right">
                  <Badge variant="active" size="sm">{log.result}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
