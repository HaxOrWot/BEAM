import React from "react";

export const StagingTargetBar: React.FC = () => {
  return (
    <div className="border border-outline-variant/30 bg-surface-container-lowest p-space-md flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
      <div className="flex flex-wrap items-center gap-space-md">
        <div className="flex items-center gap-space-xs border border-outline-variant/30 px-space-sm py-1 bg-surface-container-low">
          <span className="material-symbols-outlined text-[14px] text-primary">folder_open</span>
          <span className="font-label-caps text-label-caps uppercase text-on-surface-variant">STAGING</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-space-xs font-telemetry-sm text-telemetry-sm">
          <span className="text-primary font-medium tracking-tight font-mono">/mnt/nvme-fast-pool/inbox/proto-rx</span>
          <div className="flex items-center gap-space-sm text-outline pl-space-xs">
            <span>&bull;</span>
            <span>AVAIL: <strong className="text-on-surface">3.82 TB (NVMe 4.0)</strong></span>
            <span>&bull;</span>
            <span>FS: <strong className="text-on-surface">XFS + O_DIRECT</strong></span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-space-xs font-telemetry-sm text-telemetry-sm text-outline">
        <span className="w-1.5 h-1.5 bg-primary" />
        <span>KERNEL ASYNC DIRECT I/O (io_uring) ACTIVE</span>
      </div>
    </div>
  );
};
