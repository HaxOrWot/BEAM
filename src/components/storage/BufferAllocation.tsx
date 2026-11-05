import React from "react";
import { ProgressBar } from "../ui/ProgressBar";
import { Card } from "../ui/Card";
import { Cpu, HardDrive } from "lucide-react";

export const BufferAllocation: React.FC = () => {
  return (
    <div className="bg-surface-low border border-surface-high p-4 mb-6">
      <div className="font-mono text-xs font-semibold text-primary uppercase tracking-wider mb-3">
        Zero-Copy DMA Ring Buffers
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="p-3 bg-surface-lowest border border-surface-high">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs text-primary font-medium flex items-center gap-1.5">
              <Cpu size={13} /> TX Ring Buffer Pool (Transmit)
            </span>
            <span className="font-mono text-xs text-primary font-mono-num">1.42 GB / 2.00 GB</span>
          </div>
          <ProgressBar progress={71} label="Utilization: 71%" speed="1.42 GB" />
          <div className="font-mono text-[10px] text-outline mt-2 flex justify-between">
            <span>RINGS: 16 SLOTS</span>
            <span>SLOT SIZE: 128 MB</span>
          </div>
        </div>

        <div className="p-3 bg-surface-lowest border border-surface-high">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs text-primary font-medium flex items-center gap-1.5">
              <HardDrive size={13} /> RX Ring Buffer Pool (Receive)
            </span>
            <span className="font-mono text-xs text-primary font-mono-num">0.68 GB / 2.00 GB</span>
          </div>
          <ProgressBar progress={34} label="Utilization: 34%" speed="0.68 GB" />
          <div className="font-mono text-[10px] text-outline mt-2 flex justify-between">
            <span>RINGS: 16 SLOTS</span>
            <span>SLOT SIZE: 128 MB</span>
          </div>
        </div>
      </div>

      <div className="p-3 bg-surface-lowest border border-surface-high font-mono text-xs">
        <div className="text-primary font-medium mb-1">Linux Kernel Hugepages Configuration</div>
        <div className="text-[11px] text-outline space-y-0.5">
          <div>&bull; 2048 x 2048 kB HugePages allocated (4096 MB Total Memory Pool)</div>
          <div>&bull; Transparent Hugepage Support (THP): <span className="text-primary">always (madvise enabled)</span></div>
          <div>&bull; DMA IOMMU translation: <span className="text-primary">Hardware Passthrough (VT-d / AMD-Vi)</span></div>
        </div>
      </div>
    </div>
  );
};
