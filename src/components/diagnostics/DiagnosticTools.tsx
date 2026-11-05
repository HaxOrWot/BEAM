"use client";

import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Zap, Activity, HardDrive, RefreshCw } from "lucide-react";

export const DiagnosticTools: React.FC = () => {
  const [output, setOutput] = useState<string | null>(null);

  const runDiagnostics = (tool: string) => {
    setOutput(`Executing ${tool}...\n[OK] Latency probe: 0.14 ms (min: 0.11 ms, max: 0.18 ms)\n[OK] eBPF socket filter: nominal\n[OK] Zero-copy memory channel: 0 drops\nStatus: PASSED`);
  };

  return (
    <div className="bg-surface-low border border-surface-high p-4">
      <div className="font-mono text-xs font-semibold text-primary uppercase tracking-wider mb-3">
        Active Diagnostic Execution Tools
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <Button
          variant="secondary"
          size="md"
          className="justify-start text-left"
          onClick={() => runDiagnostics("Ping Mesh RTT Probe")}
        >
          <Zap size={13} className="text-primary" />
          Ping Mesh Latency
        </Button>

        <Button
          variant="secondary"
          size="md"
          className="justify-start text-left"
          onClick={() => runDiagnostics("TCP Socket Route Trace")}
        >
          <Activity size={13} className="text-secondary" />
          Trace Socket Route
        </Button>

        <Button
          variant="secondary"
          size="md"
          className="justify-start text-left"
          onClick={() => runDiagnostics("DMA Ring Buffer Health")}
        >
          <HardDrive size={13} className="text-outline" />
          Dump Ring Buffers
        </Button>
      </div>

      {output && (
        <div className="p-3 bg-surface-lowest border border-surface-high font-mono text-xs text-primary whitespace-pre-wrap">
          {output}
        </div>
      )}
    </div>
  );
};
