import React from "react";
import { MetricBox } from "../ui/MetricBox";

export const PeerMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
      <MetricBox label="MESH TOPOLOGY NODES" value="4" unit="PEERS" delta="Full Mesh Interconnect" />
      <MetricBox label="AVERAGE MESH RTT" value="0.15" unit="ms" delta="-0.03 ms variance" />
      <MetricBox label="ACTIVE EGRESS CHANNELS" value="12" unit="CHANNELS" delta="3 per peer" />
      <MetricBox label="P2P DISCOVERY STATE" value="SYNCED" unit="" delta="Gossip Protocol v2" />
    </div>
  );
};
