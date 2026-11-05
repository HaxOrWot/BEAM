"use client";

import React, { useState } from "react";
import { Terminal, Trash2, Download } from "lucide-react";
import { Button } from "../ui/Button";

export const TerminalLog: React.FC = () => {
  const [lines, setLines] = useState<string[]>([
    "[ 1402.102391] prototcp_dma: initialized direct memory channel #0 (32768 KiB ring)",
    "[ 1402.102410] prototcp_ebpf: hook attached to ingress device eth0 at port 9293",
    "[ 1402.189021] prototcp_sock: SYN received from 198.51.100.24:44321 -> Handshake Approved",
    "[ 1402.189045] prototcp_crypto: Curve25519 ECDH established. Session cipher: TLS_AES_256_GCM",
    "[ 1402.190112] prototcp_stream: zero-copy payload flush chunk #0489 (CRC32: 0x9A4F2B8E)",
    "[ 1402.191204] prototcp_stream: zero-copy payload flush chunk #0490 (CRC32: 0x7E1D4A0B)",
    "[ 1402.192318] prototcp_stream: zero-copy payload flush chunk #0491 (CRC32: 0x1C2F8E9A)",
    "[ 1402.193402] prototcp_stream: zero-copy payload flush chunk #0492 (CRC32: 0x4D8A2B7F)",
    "[ 1402.200119] prototcp_kernel: socket sock-9921 pacing throughput steady at 9.94 Gbps",
  ]);

  return (
    <div className="bg-surface-lowest border border-surface-high p-4 mb-6">
      <div className="flex items-center justify-between pb-3 border-b border-surface-high mb-3">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-primary" />
          <span className="font-mono text-xs font-semibold text-primary uppercase">
            Kernel dmesg & Socket Event Stream
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setLines([])}>
            <Trash2 size={11} /> Clear
          </Button>
          <Button variant="ghost" size="sm" onClick={() => alert("Downloaded kernel logs")}>
            <Download size={11} /> Export
          </Button>
        </div>
      </div>

      <div className="bg-black/80 border border-surface-high/60 p-3 font-mono text-[11px] space-y-1 h-64 overflow-y-auto">
        {lines.length === 0 ? (
          <div className="text-outline">No log messages in buffer.</div>
        ) : (
          lines.map((line, idx) => (
            <div key={idx} className="leading-relaxed hover:bg-surface-high/20 px-1">
              <span className="text-outline">{line.substring(0, 16)}</span>
              <span className="text-primary font-medium">{line.substring(16, 32)}</span>
              <span className="text-on-surface-variant">{line.substring(32)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
