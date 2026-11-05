"use client";

import React, { useState, useEffect } from "react";

export const DiagnosticsDetailView: React.FC = () => {
  const [filter, setFilter] = useState("ALL");
  const [rate, setRate] = useState("1,189.4 MB/s");
  const [logs, setLogs] = useState([
    { time: "02:02:10.190", tag: "TCP:PROBE", msg: "keepalive ping 200ms ack received (RTT 3.6ms)" },
    { time: "02:02:08.841", tag: "SOCK:TX", msg: "Splice zero-copy pipeline wrote 64KB block to fd=7" },
    { time: "02:02:06.402", tag: "TCP:BBR", msg: "pacing_rate: 10,240,000,000 bps, min_rtt: 3.4ms" },
    { time: "02:02:04.120", tag: "INGRESS:CHUNK", msg: "Ingested 2,048 packets (payload chunk verified OK)" },
    { time: "02:02:01.990", tag: "EPOLLET", msg: "epoll_wait returned 1 socket event for fd:7" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toISOString().substring(11, 23);
      const msgs = [
        { tag: "TCP:PROBE", msg: "keepalive ping 200ms ack received (RTT 3.8ms)" },
        { tag: "SOCK:TX", msg: "Direct DMA write 64KB buffer chunk committed" },
        { tag: "TCP:BBR", msg: "pacing_rate: 10,480,000,000 bps, cwnd: 1024" },
        { tag: "INGRESS:CHUNK", msg: "Chunk CRC32 match 0x9A4F2B8E -> ACK emitted" },
      ];
      const pick = msgs[Math.floor(Math.random() * msgs.length)];
      setLogs((prev) => [{ time: now, ...pick }, ...prev.slice(0, 15)]);
      setRate(`${(1150 + Math.random() * 80).toFixed(1)} MB/s`);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const filteredLogs = filter === "ALL" ? logs : logs.filter((l) => l.tag.includes(filter));

  return (
    <div className="flex flex-col gap-space-xl">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-surface-container-lowest p-space-xl border border-outline-variant flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg shadow-xl">
        <div className="relative z-10 flex flex-col gap-space-xs max-w-2xl">
          <div className="flex items-center gap-space-sm mb-space-xs">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-widest">
              KERNEL TRACE // REAL-TIME TELEMETRY
            </span>
          </div>
          <h1 className="font-display-lg text-display-lg uppercase tracking-tight text-primary font-semibold">
            DIAGNOSTICS &amp; LOGS
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Direct socket descriptor inspection, live hardware pacing wave visualizer, and kernel BPF stream trace logs.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-space-md bg-surface-container-low p-space-md border border-outline-variant">
          <div>
            <span className="font-label-caps text-label-caps uppercase text-outline block">CURRENT RATE</span>
            <span className="font-metric-xl text-metric-xl font-medium" style={{ color: "#DFBD69" }}>
              {rate}
            </span>
          </div>
        </div>
      </div>

      {/* Real-Time Waveform Strip */}
      <div className="bg-surface-container-lowest p-space-lg border border-outline-variant flex flex-col gap-space-sm">
        <div className="flex justify-between items-center">
          <span className="font-headline-sm text-headline-sm uppercase text-primary tracking-wider font-medium">
            LIVE DMA WAVEFORM OSCILLOSCOPE
          </span>
          <span className="font-label-caps text-label-caps text-outline uppercase">
            SAMPLING: 1000 HZ &bull; RING BUFFER FEED
          </span>
        </div>

        {/* SVG Wave */}
        <div className="w-full h-32 bg-surface-container-low border border-outline-variant relative overflow-hidden flex items-end">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 700 120">
            <path
              d="M 0 60 Q 70 20, 140 50 T 280 40 T 420 70 T 560 30 T 700 45 L 700 120 L 0 120 Z"
              fill="rgba(223, 189, 105, 0.08)"
            />
            <path
              d="M 0 60 Q 70 20, 140 50 T 280 40 T 420 70 T 560 30 T 700 45"
              fill="none"
              stroke="#DFBD69"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>

      {/* Terminal Trace Stream */}
      <div className="bg-surface-container-lowest p-space-lg border border-outline-variant flex flex-col gap-space-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-xs border-b border-outline-variant">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[18px] text-primary">terminal</span>
            <span className="font-headline-sm text-headline-sm uppercase text-primary tracking-wider font-medium">
              SOCKET TRACE TERMINAL
            </span>
          </div>

          <div className="flex items-center gap-space-xs flex-wrap">
            {["ALL", "TCP:PROBE", "SOCK:TX", "TCP:BBR", "INGRESS"].map((tag) => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`px-space-sm py-1 font-label-caps text-label-caps uppercase transition-colors ${
                  filter === tag
                    ? "bg-primary text-black font-semibold"
                    : "bg-surface-container text-outline hover:text-primary"
                }`}
              >
                {tag}
              </button>
            ))}
            <button
              onClick={() => setLogs([])}
              className="px-space-sm py-1 border border-outline-variant text-outline hover:text-primary font-label-caps text-label-caps uppercase ml-2"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="bg-black/80 border border-outline-variant p-space-md font-mono text-xs space-y-1.5 h-64 overflow-y-auto">
          {filteredLogs.map((l, i) => (
            <div key={i} className="flex items-start gap-space-xs leading-relaxed">
              <span className="text-outline">[{l.time}]</span>
              <span className="text-primary font-medium">[{l.tag}]</span>
              <span className="text-on-surface-variant">{l.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
