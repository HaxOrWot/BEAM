"use client";

import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Play, RotateCcw, Shield } from "lucide-react";

export const EngineHeader: React.FC = () => {
  const [running, setRunning] = useState(true);

  return (
    <div className="bg-surface-lowest border border-surface-high p-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-primary">
            PROTO/TCP Engine Console
          </h1>
          <Badge variant={running ? "active" : "idle"}>
            {running ? "DMA ENGINE: RUNNING" : "HALTED"}
          </Badge>
        </div>
        <p className="font-mono text-xs text-outline mt-1">
          Direct memory access kernel socket pipeline &bull; Zero-copy buffer &bull; Node ID: #0x8F7B
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant={running ? "secondary" : "primary"}
          size="sm"
          onClick={() => setRunning(!running)}
        >
          <Play size={12} className={running ? "fill-primary" : ""} />
          {running ? "Suspend Engine" : "Resume DMA"}
        </Button>
        <Button variant="ghost" size="sm" onClick={() => alert("DMA ring buffer flushed.")}>
          <RotateCcw size={12} />
          Flush Rings
        </Button>
      </div>
    </div>
  );
};
