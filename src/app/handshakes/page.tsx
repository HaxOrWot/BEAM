import React from "react";
import { HandshakeHeader } from "@/components/handshakes/HandshakeHeader";
import { HandshakeMetrics } from "@/components/handshakes/HandshakeMetrics";
import { HandshakeQueue } from "@/components/handshakes/HandshakeQueue";
import { IngressFirewallRules } from "@/components/handshakes/IngressFirewallRules";
import { SynPacketTrace } from "@/components/handshakes/SynPacketTrace";

export default function HandshakesPage() {
  return (
    <div className="w-full min-h-screen px-margin py-space-lg flex flex-col gap-space-lg">
      <HandshakeHeader />
      <HandshakeMetrics />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        <div className="lg:col-span-7">
          <HandshakeQueue />
        </div>
        <div className="lg:col-span-5 flex flex-col gap-space-lg">
          <IngressFirewallRules />
          <SynPacketTrace />
        </div>
      </div>
    </div>
  );
}
