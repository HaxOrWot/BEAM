"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import { Terminal, Zap } from "lucide-react";

interface LogEntry {
  id: string;
  timestamp: string;
  chunk: string;
  size: string;
  speed: string;
}

export const DmaStreamLog: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: "1", timestamp: "01:42:10.12", chunk: "CHUNK_0492", size: "32768 KiB", speed: "9.94 Gbps" },
    { id: "2", timestamp: "01:42:09.91", chunk: "CHUNK_0491", size: "32768 KiB", speed: "9.89 Gbps" },
    { id: "3", timestamp: "01:42:09.70", chunk: "CHUNK_0490", size: "32768 KiB", speed: "9.92 Gbps" },
    { id: "4", timestamp: "01:42:09.49", chunk: "CHUNK_0489", size: "32768 KiB", speed: "9.81 Gbps" },
  ]);
  const [streaming, setStreaming] = useState(false);

  useEffect(() => {
    if (!streaming) return;
    const interval = setInterval(() => {
      const time = new Date().toISOString().substring(11, 22);
      const nextId = Math.floor(Math.random() * 9000 + 1000);
      const nextSpeed = (9.8 + Math.random() * 0.19).toFixed(2);
      const newEntry: LogEntry = {
        id: String(Date.now()),
        timestamp: time,
        chunk: `CHUNK_${nextId}`,
        size: "32768 KiB",
        speed: `${nextSpeed} Gbps`,
      };
      setLogs((prev) => [newEntry, ...prev.slice(0, 5)]);
    }, 700);

    return () => clearInterval(interval);
  }, [streaming]);

  return (
    <div className="bg-surface-lowest border border-surface-high p-4">
      <div className="flex items-center justify-between pb-3 border-b border-surface-high mb-3">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-primary" />
          <span className="font-mono text-xs font-medium text-primary uppercase">
            DMA Kernel Stream Buffer
          </span>
        </div>
        <Button
          size="sm"
          variant={streaming ? "secondary" : "primary"}
          onClick={() => setStreaming(!streaming)}
        >
          <Zap size={11} />
          {streaming ? "Halt Test Stream" : "Execute Speed Probe"}
        </Button>
      </div>

      <div className="space-y-1.5 font-mono text-[11px]">
        {logs.map((log) => (
          <div
            key={log.id}
            className="flex items-center justify-between py-1 px-2 bg-surface-low border border-surface-high/40 hover:border-surface-high"
          >
            <div className="flex items-center gap-2 text-outline">
              <span className="text-on-surface-variant">[{log.timestamp}]</span>
              <span>DMA STREAM FLUSH</span>
              <span className="text-primary font-medium">{log.chunk}</span>
              <span className="text-[10px]">({log.size})</span>
              <span className="text-secondary text-[10px] hidden sm:inline">&rarr; CRC_VALID</span>
            </div>
            <span className="text-primary font-medium">{log.speed}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
