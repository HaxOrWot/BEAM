import React from "react";
import { MetricBox } from "../ui/MetricBox";

export const SocketStateStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
      <MetricBox label="TCP CONGESTION ALGO" value="BBRv3" unit="KERNEL" delta="Pacing Enabled" />
      <MetricBox label="CONGESTION WINDOW (CWND)" value="1024" unit="PKTS" delta="Max Burst 65535" />
      <MetricBox label="PACKET RETRANSMISSION" value="0.002" unit="%" delta="Optimal Link Quality" />
      <MetricBox label="SELECTIVE ACK (SACK)" value="ACTIVE" unit="" delta="RFC 2018 Enabled" />
    </div>
  );
};
