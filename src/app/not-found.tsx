import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="py-20 text-center max-w-lg mx-auto">
      <div className="inline-flex items-center justify-center p-3 border border-surface-high bg-surface-lowest text-primary mb-4">
        <AlertTriangle size={24} />
      </div>
      <div className="font-mono text-xs text-outline uppercase tracking-widest mb-1">
        ERROR_SOCKET_NOT_CONNECTED
      </div>
      <h1 className="text-2xl md:text-3xl font-semibold text-primary mb-3">
        404 — Peer Endpoint Not Found
      </h1>
      <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
        SYN packet dispatched to an unmapped socket descriptor or the target mesh node has severed peering. Verify the route in the topology inspector.
      </p>

      <div className="flex items-center justify-center gap-3">
        <Link href="/">
          <Button variant="primary" size="md">
            <ArrowLeft size={12} />
            Return to Dashboard
          </Button>
        </Link>
        <Link href="/peers">
          <Button variant="secondary" size="md">
            Inspect Mesh Topology
          </Button>
        </Link>
      </div>
    </div>
  );
}
