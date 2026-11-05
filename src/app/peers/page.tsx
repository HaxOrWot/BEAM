import React from "react";
import { PeerMetrics } from "@/components/peers/PeerMetrics";
import { PeerTable } from "@/components/peers/PeerTable";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function PeersPage() {
  return (
    <div>
      <SectionHeader
        title="P2P Mesh & Peers Topology"
        tag="DISTRIBUTED NODE FABRIC"
      />

      <PeerMetrics />
      <PeerTable />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card variant="low">
          <div className="font-mono text-xs font-semibold text-primary uppercase tracking-wider mb-2">
            Topology Mesh Strategy
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Full-mesh peer topology allows direct point-to-point zero-copy chunk streaming without intermediary relay hops. Any node can advertise availability over multicast DNS or pre-shared IP tables.
          </p>
          <div className="mt-3">
            <Link href="/handshakes" className="font-mono text-xs text-primary hover:underline flex items-center gap-1">
              Inspect Handshake Sessions <ArrowUpRight size={13} />
            </Link>
          </div>
        </Card>

        <Card variant="low">
          <div className="font-mono text-xs font-semibold text-primary uppercase tracking-wider mb-2">
            Node Key Provisioning
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Every participating peer verifies cryptographic signatures on incoming frame payloads using Curve25519 session handshakes and mutual Ed25519 identity keys.
          </p>
          <div className="mt-3">
            <Link href="/enrollment" className="font-mono text-xs text-primary hover:underline flex items-center gap-1">
              Enroll New Node <ArrowUpRight size={13} />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
