import React from "react";
import { EnrollmentForm } from "@/components/enrollment/EnrollmentForm";
import Link from "next/link";

export default function EnrollmentPage() {
  return (
    <div className="px-margin py-space-lg flex flex-col gap-space-xl">
      <div className="flex items-center gap-space-xs text-outline font-label-caps text-label-caps uppercase">
        <Link href="/peers" className="hover:text-primary">&larr; Back to Peers Topology</Link>
      </div>

      <div className="bg-surface-container-lowest p-space-xl border border-outline-variant flex flex-col gap-space-xs shadow-xl">
        <span className="font-label-caps text-label-caps uppercase text-outline tracking-widest">
          PEER ENROLLMENT // GOSSIP PROTOCOL
        </span>
        <h1 className="font-display-lg text-display-lg uppercase tracking-tight text-primary font-semibold">
          NODE ENROLLMENT &amp; KEY PROVISIONING
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
          Register and authorize remote node sockets. Enrolled nodes exchange Curve25519 prekey bundles to establish zero-copy DMA streaming channels.
        </p>
      </div>

      <EnrollmentForm />
    </div>
  );
}
