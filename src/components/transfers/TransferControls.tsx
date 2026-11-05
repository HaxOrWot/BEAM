"use client";

import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Upload, HardDrive, Shield } from "lucide-react";

export const TransferControls: React.FC = () => {
  const [peerIp, setPeerIp] = useState("198.51.100.24:9293");
  const [compress, setCompress] = useState(true);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Transfer queued for peer: ${peerIp}`);
  };

  return (
    <div className="bg-surface-low border border-surface-high p-4 mb-6">
      <div className="font-mono text-xs font-semibold text-primary uppercase tracking-wider mb-3">
        Initiate DMA File Transfer
      </div>

      <form onSubmit={handleStart} className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="block font-mono text-[10px] text-outline uppercase mb-1">
            Target Peer Socket
          </label>
          <input
            type="text"
            value={peerIp}
            onChange={(e) => setPeerIp(e.target.value)}
            className="w-full bg-surface-lowest border border-surface-high px-3 py-1.5 font-mono text-xs text-primary focus:border-primary outline-none"
            placeholder="198.51.100.24:9293"
          />
        </div>

        <div>
          <label className="block font-mono text-[10px] text-outline uppercase mb-1">
            Payload Select
          </label>
          <div className="flex items-center gap-2 bg-surface-lowest border border-surface-high px-3 py-1.5 text-xs font-mono text-outline cursor-pointer hover:border-outline">
            <HardDrive size={13} />
            <span className="truncate">Select local file or block device...</span>
          </div>
        </div>

        <div className="flex items-end gap-2">
          <Button type="submit" variant="primary" size="md" className="w-full">
            <Upload size={12} />
            Stream Payload
          </Button>
        </div>
      </form>

      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-surface-high/60 text-[11px] font-mono text-outline">
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={compress}
            onChange={(e) => setCompress(e.target.checked)}
            className="accent-primary"
          />
          <span>ZSTD Compression (Level 3)</span>
        </label>
        <span className="text-surface-high">|</span>
        <span className="flex items-center gap-1 text-on-surface-variant">
          <Shield size={11} className="text-primary" />
          ChaCha20-Poly1305 Streaming Digest
        </span>
      </div>
    </div>
  );
};
