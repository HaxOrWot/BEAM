import React from "react";
import { EnrollmentForm } from "@/components/enrollment/EnrollmentForm";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EnrollmentPage() {
  return (
    <div>
      <div className="mb-4">
        <Link href="/peers" className="font-mono text-xs text-outline hover:text-primary flex items-center gap-1">
          <ArrowLeft size={12} /> Back to Peers Topology
        </Link>
      </div>

      <SectionHeader
        title="Node Enrollment & Key Provisioning"
        tag="PEER REGISTRATION"
      />

      <EnrollmentForm />

      <Card variant="low">
        <div className="font-mono text-xs font-semibold text-primary uppercase tracking-wider mb-2">
          Automated Discovery via Gossip Protocol
        </div>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          Enrolled nodes receive an automated discovery ping. Once the cryptographic challenge is returned with a valid Ed25519 signature matching the provided public key, the node is granted full DMA direct streaming capabilities.
        </p>
      </Card>
    </div>
  );
}
