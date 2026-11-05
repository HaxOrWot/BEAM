"use client";

import React, { useState } from "react";

export const WirePropagationTest: React.FC = () => {
  const [running, setRunning] = useState(false);
  const [throughput, setThroughput] = useState("9.94");
  const [latency, setLatency] = useState("0.14");
  const [terminalRows, setTerminalRows] = useState([
    { time: "10:44:02.102", text: "SYN Sent -> node.prototcp.internal:9042 [SEQ=0 ACK=0 WIN=65535 MSS=8960]", status: "OK" },
    { time: "10:44:02.104", text: "SYN+ACK Received <- 0.14ms RTT Verified", status: "ESTABLISHED" },
    { time: "10:44:02.105", text: "Ephemeral TLS 1.3 Key Established (Curve25519)", status: "OK" },
    { time: "10:44:02.106", text: "DMA STREAM FLUSH CHUNK_1 (32768 KiB) -> CRC_VALID", status: "9.94 Gbps" },
  ]);

  const runTest = () => {
    setRunning(true);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const simThroughput = (9.80 + Math.random() * 0.18).toFixed(2);
      const simLatency = (0.12 + Math.random() * 0.05).toFixed(2);
      setThroughput(simThroughput);
      setLatency(simLatency);

      const timestamp = new Date().toISOString().substring(11, 23);
      setTerminalRows((prev) => [
        {
          time: timestamp,
          text: `DMA STREAM FLUSH CHUNK_${step + 1} (32768 KiB) -> CRC_VALID`,
          status: `${simThroughput} Gbps`,
        },
        ...prev.slice(0, 6),
      ]);

      if (step > 6) {
        clearInterval(interval);
        setRunning(false);
      }
    }, 300);
  };

  return (
    <section id="wire-test" className="w-full px-margin py-space-xl border-t border-surface-container-high bg-surface">
      <div className="flex flex-col gap-space-lg">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-surface-container-high pb-space-md gap-space-sm">
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps uppercase text-outline">
              NETWORK TELEMETRY EXPERIMENT
            </span>
            <h2 className="font-headline-lg text-headline-lg text-primary uppercase font-medium">
              Wire Rate Propagation Test
            </h2>
          </div>

          <button
            onClick={runTest}
            disabled={running}
            className="px-space-md py-space-xs font-label-caps text-label-caps uppercase flex items-center gap-space-xs transition-colors font-semibold"
            style={{
              border: "1px solid rgb(58, 50, 32)",
              color: "rgb(223, 189, 105)",
              backgroundColor: "#201f1f",
            }}
          >
            <span className={`material-symbols-outlined text-[16px] ${running ? "animate-spin" : ""}`}>
              {running ? "refresh" : "play_arrow"}
            </span>
            <span>{running ? "TESTING..." : "Trigger 10Gbps Packet Train"}</span>
          </button>
        </div>

        {/* 3 Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          {/* Metric 1 */}
          <div className="flex flex-col gap-space-xs bg-surface-container-low p-space-lg border border-surface-container-high">
            <span className="font-label-caps text-label-caps uppercase text-outline">
              LINE RATE THROUGHPUT
            </span>
            <div
              className="font-metric-xl text-metric-xl font-mono tracking-tight"
              style={{ color: "rgb(223, 189, 105)" }}
            >
              {throughput} <span className="text-body-lg text-on-surface-variant font-normal">Gbps</span>
            </div>
            <span className="font-telemetry-sm text-telemetry-sm" style={{ color: "rgb(197, 160, 89)" }}>
              SATURATING DUAL SFP28
            </span>
          </div>

          {/* Metric 2 */}
          <div className="flex flex-col gap-space-xs bg-surface-container-low p-space-lg border border-surface-container-high">
            <span className="font-label-caps text-label-caps uppercase text-outline">
              ROUND-TRIP LATENCY
            </span>
            <div className="font-metric-xl text-metric-xl text-primary font-mono tracking-tight">
              {latency} <span className="text-body-lg text-on-surface-variant font-normal">ms</span>
            </div>
            <span className="font-telemetry-sm text-telemetry-sm text-outline">
              ZERO QUEUE JITTER
            </span>
          </div>

          {/* Metric 3 */}
          <div className="flex flex-col gap-space-xs bg-surface-container-low p-space-lg border border-surface-container-high">
            <span className="font-label-caps text-label-caps uppercase text-outline">
              RAW DMA STREAMS
            </span>
            <div className="font-metric-xl text-metric-xl text-primary font-mono tracking-tight">
              8 <span className="text-body-lg text-on-surface-variant font-normal">Active</span>
            </div>
            <span className="font-telemetry-sm text-telemetry-sm text-outline">
              RING SATURATION 98%
            </span>
          </div>
        </div>

        {/* Live Stream Terminal */}
        <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high flex flex-col gap-space-sm">
          <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-high font-telemetry-sm text-telemetry-sm text-outline">
            <span className="font-label-caps text-label-caps uppercase text-primary font-medium">
              RAW KERNEL SOCKET EMISSION TERMINAL
            </span>
            <span>FILTER: ICMP/SYN_ACK</span>
          </div>

          <div className="flex flex-col gap-1 text-on-surface-variant font-mono text-xs">
            {terminalRows.map((r, i) => (
              <div key={i} className="flex items-center justify-between py-0.5 hover:bg-surface-container-low px-1">
                <span>
                  <span className="text-outline">[{r.time}]</span> {r.text}
                </span>
                <span className="text-primary font-medium">{r.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
