"use client";

import React from "react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { HardDrive, FolderSync } from "lucide-react";

export const StorageVolumes: React.FC = () => {
  const volumes = [
    { mount: "/mnt/prototcp/fast-cache", type: "NVMe Direct (PCIe 4.0)", size: "512 GB", free: "389 GB", state: "ACTIVE" },
    { mount: "/mnt/prototcp/cold-archive", type: "ZFS RaidZ2 Pool", size: "8.0 TB", free: "6.4 TB", state: "ACTIVE" },
    { mount: "/dev/shm/prototcp-dma", type: "POSIX Shared Memory (RAM)", size: "16 GB", free: "11.2 GB", state: "OPTIMAL" },
  ];

  return (
    <div className="bg-surface-lowest border border-surface-high p-4">
      <div className="flex items-center justify-between pb-3 border-b border-surface-high mb-3">
        <span className="font-mono text-xs font-semibold text-primary uppercase">
          Mounted Storage Partitions & Cache Volumes
        </span>
        <Button variant="ghost" size="sm" onClick={() => alert("Storage sync check complete. All pools healthy.")}>
          <FolderSync size={11} /> Verify Pools
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-surface-high text-outline text-[10px] uppercase">
              <th className="pb-2 font-normal">Mount Point</th>
              <th className="pb-2 font-normal">Storage Driver</th>
              <th className="pb-2 font-normal">Total Capacity</th>
              <th className="pb-2 font-normal">Available Space</th>
              <th className="pb-2 font-normal text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-high/50">
            {volumes.map((v, i) => (
              <tr key={i} className="hover:bg-surface-high/20">
                <td className="py-2.5 text-primary font-medium">{v.mount}</td>
                <td className="py-2.5 text-on-surface-variant">{v.type}</td>
                <td className="py-2.5 text-on-surface">{v.size}</td>
                <td className="py-2.5 text-primary">{v.free}</td>
                <td className="py-2.5 text-right">
                  <Badge variant="active" size="sm">{v.state}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
