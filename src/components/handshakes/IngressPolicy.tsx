"use client";

import React from "react";
import { Button } from "../ui/Button";
import { ShieldAlert, Plus } from "lucide-react";

export const IngressPolicy: React.FC = () => {
  const rules = [
    { subnet: "198.51.100.0/24", policy: "ALLOW_DIRECT_DMA", rateLimit: "10 Gbps", tag: "US-EAST-DATACENTER" },
    { subnet: "203.0.113.0/24", policy: "ALLOW_DIRECT_DMA", rateLimit: "10 Gbps", tag: "EU-CENTRAL-NODE" },
    { subnet: "0.0.0.0/0", policy: "REQUIRE_ED25519_SIG", rateLimit: "1 Gbps", tag: "GLOBAL_INGRESS" },
  ];

  return (
    <div className="bg-surface-lowest border border-surface-high p-4">
      <div className="flex items-center justify-between pb-3 border-b border-surface-high mb-3">
        <div>
          <span className="font-mono text-xs font-semibold text-primary uppercase">
            Ingress Firewall & Signature Policy
          </span>
          <p className="text-[11px] text-outline mt-0.5">
            Kernel eBPF filter enforcing packet signature validation before socket allocation.
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={() => alert("Add policy rule")}>
          <Plus size={11} /> Add Subnet Rule
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-surface-high text-outline text-[10px] uppercase">
              <th className="pb-2 font-normal">Subnet / CIDR</th>
              <th className="pb-2 font-normal">Enforcement Policy</th>
              <th className="pb-2 font-normal">Max Bandwidth</th>
              <th className="pb-2 font-normal text-right">Zone Tag</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-high/50">
            {rules.map((rule, idx) => (
              <tr key={idx} className="hover:bg-surface-high/20">
                <td className="py-2.5 text-primary font-medium">{rule.subnet}</td>
                <td className="py-2.5 text-on-surface">{rule.policy}</td>
                <td className="py-2.5 text-on-surface-variant">{rule.rateLimit}</td>
                <td className="py-2.5 text-right text-outline text-[10px]">{rule.tag}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
