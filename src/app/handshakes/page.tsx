import React from "react";
import { HandshakeList } from "@/components/handshakes/HandshakeList";
import { IngressPolicy } from "@/components/handshakes/IngressPolicy";

export default function HandshakesPage() {
  return (
    <div className="px-margin py-space-lg flex flex-col gap-space-xl">
      <div className="bg-surface-container-lowest p-space-xl border border-outline-variant flex flex-col gap-space-xs shadow-xl">
        <span className="font-label-caps text-label-caps uppercase text-outline tracking-widest">
          SECURITY INGRESS // eBPF KERNEL GATEWAY
        </span>
        <h1 className="font-display-lg text-display-lg uppercase tracking-tight text-primary font-semibold">
          SOCKET HANDSHAKES &amp; INGRESS AUTHORIZATION
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
          Real-time packet signature verification and firewall ingress rules governing ephemeral TCP stream allocation.
        </p>
      </div>

      <HandshakeList />
      <IngressPolicy />
    </div>
  );
}
