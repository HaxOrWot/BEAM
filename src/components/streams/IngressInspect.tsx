import React from "react";
import { Terminal, Shield, Zap } from "lucide-react";

export const IngressInspect: React.FC = () => {
  return (
    <div className="bg-surface-lowest border border-surface-high p-4">
      <div className="flex items-center justify-between pb-3 border-b border-surface-high mb-3">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-primary" />
          <span className="font-mono text-xs font-semibold text-primary uppercase">
            Ingress Packet Inspector (Live Kernel Hook)
          </span>
        </div>
        <span className="font-mono text-[10px] text-outline">BPF_FILTER: TCP port 9293</span>
      </div>

      <div className="font-mono text-[11px] space-y-1.5 text-outline">
        <div className="p-2 bg-surface-low border border-surface-high/50 flex justify-between">
          <span>IP 198.51.100.24.44321 &gt; 127.0.0.1.9293: Flags [.], seq 1048576:1081344, ack 1</span>
          <span className="text-primary">32768 B</span>
        </div>
        <div className="p-2 bg-surface-low border border-surface-high/50 flex justify-between">
          <span>IP 203.0.113.88.51200 &gt; 127.0.0.1.9294: Flags [.], seq 2097152:2129920, ack 1</span>
          <span className="text-primary">32768 B</span>
        </div>
        <div className="p-2 bg-surface-low border border-surface-high/50 flex justify-between">
          <span>IP 192.0.2.14.38902 &gt; 127.0.0.1.9295: Flags [S], seq 48192019, win 65535, sackOK</span>
          <span className="text-secondary">SYN_ACK</span>
        </div>
      </div>
    </div>
  );
};
