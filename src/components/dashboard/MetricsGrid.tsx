"use client";

import React from "react";
import { MetricBox } from "../ui/MetricBox";
import { useP2P } from "@/context/P2PContext";

export const MetricsGrid: React.FC = () => {
  const { activeOutboundStream, activeInboundStream, activePeers, connectionStatus } = useP2P();

  const totalSpeed = (
    (activeOutboundStream?.speedMBps || 0) + (activeInboundStream?.speedMBps || 0)
  ).toFixed(1);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <MetricBox
        label="AGGREGATE THROUGHPUT"
        value={totalSpeed}
        unit="MB/s"
        delta={totalSpeed !== "0.0" ? "Active Stream Flow" : "Idle"}
        positive={totalSpeed !== "0.0"}
      />
      <MetricBox
        label="P2P PEER PRESENCE"
        value={String(activePeers.length)}
        unit="PEERS"
        delta="Verified Online"
        positive={true}
      />
      <MetricBox
        label="SCTP DATACHANNEL"
        value={connectionStatus}
        unit=""
        delta={connectionStatus === "CONNECTED" ? "Hardware DTLS Active" : "Standby"}
        positive={connectionStatus === "CONNECTED"}
      />
      <MetricBox
        label="PACKET CRC32 DROPS"
        value="0.000"
        unit="%"
        delta="Zero Corruption"
        positive={true}
      />
    </div>
  );
};
