import React from "react";
import { SocketStateStats } from "@/components/telemetry/SocketStateStats";
import { AuditLogTable } from "@/components/telemetry/AuditLogTable";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

export default function TelemetryPage() {
  return (
    <div>
      <SectionHeader
        title="Socket Telemetry & Audit Trail"
        tag="KERNEL OBSERVABILITY"
      />

      <SocketStateStats />
      <AuditLogTable />

      <div className="mt-6">
        <Card variant="low">
          <div className="font-mono text-xs font-semibold text-primary uppercase tracking-wider mb-2">
            Deterministic Kernel Pacing
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            PROTO-TCP implements precision TCP pacing with BBRv3 congestion control directly in kernel space. Every socket stream is monitored with microsecond packet inter-arrival timestamps to prevent bufferbloat and guarantee peak 10GbE wire speeds.
          </p>
        </Card>
      </div>
    </div>
  );
}
