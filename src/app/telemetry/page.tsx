import React from "react";
import { SocketStateStats } from "@/components/telemetry/SocketStateStats";
import { AuditLogTable } from "@/components/telemetry/AuditLogTable";

export default function TelemetryPage() {
  return (
    <div className="px-margin py-space-lg flex flex-col gap-space-xl">
      <div className="bg-surface-container-lowest p-space-xl border border-outline-variant flex flex-col gap-space-xs shadow-xl">
        <span className="font-label-caps text-label-caps uppercase text-outline tracking-widest">
          KERNEL OBSERVABILITY // BBR v3
        </span>
        <h1 className="font-display-lg text-display-lg uppercase tracking-tight text-primary font-semibold">
          SOCKET TELEMETRY &amp; AUDIT TRAIL
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
          Sub-millisecond TCP packet pacing diagnostics, selective ACK counters, and immutable cryptographically signed audit logs.
        </p>
      </div>

      <SocketStateStats />
      <AuditLogTable />
    </div>
  );
}
