"use client";

import React from "react";

export const KernelTunablesPanel: React.FC = () => {
  return (
    <div className="flex flex-col gap-space-md">
      {/* Panel 1: Kernel Tunables */}
      <div className="border border-outline-variant/30 bg-surface-container-low p-space-lg flex flex-col gap-space-md">
        <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/30">
          <span className="font-headline-sm text-headline-sm text-primary uppercase font-semibold">
            KERNEL SYSCTL TUNABLES
          </span>
          <span className="font-telemetry-sm text-telemetry-sm text-outline font-mono">LIVE / PROC</span>
        </div>

        <div className="flex flex-col gap-space-sm font-telemetry-sm text-telemetry-sm">
          <div className="flex items-center justify-between p-space-xs bg-surface-container-lowest border border-outline-variant/20">
            <div>
              <span className="font-mono text-primary font-medium">net.ipv4.tcp_rmem</span>
              <div className="text-[10px] text-outline">Receive memory buffers (min/def/max)</div>
            </div>
            <span className="font-mono text-on-surface text-xs">4096 87380 67108864</span>
          </div>

          <div className="flex items-center justify-between p-space-xs bg-surface-container-lowest border border-outline-variant/20">
            <div>
              <span className="font-mono text-primary font-medium">vm.nr_hugepages</span>
              <div className="text-[10px] text-outline">2MB Hugepages allocation pool</div>
            </div>
            <span className="font-mono text-on-surface text-xs">2048 (4.0 GB)</span>
          </div>

          <div className="flex items-center justify-between p-space-xs bg-surface-container-lowest border border-outline-variant/20">
            <div>
              <span className="font-mono text-primary font-medium">io_uring.sq_poll</span>
              <div className="text-[10px] text-outline">Dedicated submission queue poll thread</div>
            </div>
            <span className="font-mono text-primary text-xs">ENABLED (PIN=CPU3)</span>
          </div>

          <div className="flex items-center justify-between p-space-xs bg-surface-container-lowest border border-outline-variant/20">
            <div>
              <span className="font-mono text-primary font-medium">fs.aio-max-nr</span>
              <div className="text-[10px] text-outline">Maximum asynchronous I/O events</div>
            </div>
            <span className="font-mono text-on-surface text-xs">1048576</span>
          </div>
        </div>
      </div>

      {/* Panel 2: Hardware Acceleration */}
      <div className="border border-outline-variant/30 bg-surface-container-low p-space-lg flex flex-col gap-space-sm">
        <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/30">
          <span className="font-label-caps text-label-caps uppercase text-outline tracking-wider">
            HARDWARE OFF-LOAD CONTROLLER
          </span>
          <span className="material-symbols-outlined text-primary text-[16px]">memory</span>
        </div>
        <div className="font-mono text-xs flex flex-col gap-1 text-outline">
          <div className="flex justify-between">
            <span>NIC OFFLOAD:</span>
            <span className="text-on-surface font-semibold">Mellanox ConnectX-6 (100GbE)</span>
          </div>
          <div className="flex justify-between">
            <span>PCIe INTERFACE:</span>
            <span className="text-on-surface">Gen4 x16 (31.5 GB/s bus)</span>
          </div>
          <div className="flex justify-between">
            <span>CHECKSUM ACCEL:</span>
            <span className="text-primary font-semibold">AVX-512 SIMD ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
