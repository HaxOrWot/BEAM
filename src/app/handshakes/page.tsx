import React from "react";
import { HandshakeList } from "@/components/handshakes/HandshakeList";
import { IngressPolicy } from "@/components/handshakes/IngressPolicy";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MetricBox } from "@/components/ui/MetricBox";

export default function HandshakesPage() {
  return (
    <div>
      <SectionHeader
        title="Socket Handshakes & Ingress Authorization"
        tag="SECURITY GATEWAY"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <MetricBox label="AUTHORIZED HANDSHAKES" value="1,842" unit="SESSIONS" delta="Zero replay drops" />
        <MetricBox label="AVG HANDSHAKE TIME" value="1.8" unit="ms" delta="Curve25519 Ephemeral" />
        <MetricBox label="BLOCKED PROBING ATTEMPTS" value="0" unit="DROPPED" delta="eBPF Drop filter active" />
      </div>

      <HandshakeList />
      <IngressPolicy />
    </div>
  );
}
