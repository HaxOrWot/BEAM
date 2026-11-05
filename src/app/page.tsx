import React from "react";
import Link from "next/link";
import { EngineHeader } from "@/components/dashboard/EngineHeader";
import { MetricsGrid } from "@/components/dashboard/MetricsGrid";
import { ActiveSockets } from "@/components/dashboard/ActiveSockets";
import { DmaStreamLog } from "@/components/dashboard/DmaStreamLog";
import { Card } from "@/components/ui/Card";
import { ArrowUpRight, Cpu, Network, Key, FileCode } from "lucide-react";

export default function DashboardPage() {
  const quickLinks = [
    { title: "Direct Transfers", href: "/transfers", desc: "Manage high-bandwidth DMA transfers & chunk allocation.", icon: FileCode },
    { title: "P2P Mesh Topology", href: "/peers", desc: "Active peer endpoints, socket ping, and node routes.", icon: Network },
    { title: "E2EE Key Ring", href: "/vault", desc: "Curve25519 exchange and Ed25519 node identities.", icon: Key },
    { title: "Storage & Buffers", href: "/storage", desc: "Zero-copy socket ring allocations and cache limits.", icon: Cpu },
  ];

  return (
    <div>
      <EngineHeader />
      <MetricsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <ActiveSockets />
          <DmaStreamLog />
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-surface-low border border-surface-high p-4">
            <h3 className="font-mono text-xs font-semibold text-primary uppercase tracking-wider mb-2">
              System Dispatcher
            </h3>
            <p className="text-xs text-on-surface-variant mb-4">
              Direct access to cryptographic protocol subsystems and node management routes.
            </p>

            <div className="space-y-2">
              {quickLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-start justify-between p-2.5 bg-surface-lowest border border-surface-high hover:border-outline transition-colors group"
                  >
                    <div className="flex items-start gap-2.5">
                      <Icon size={14} className="text-outline group-hover:text-primary mt-0.5" />
                      <div>
                        <div className="font-mono text-xs text-primary font-medium group-hover:underline">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-outline line-clamp-1">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight size={13} className="text-outline group-hover:text-primary" />
                  </Link>
                );
              })}
            </div>
          </div>

          <Card variant="default">
            <div className="font-mono text-[10px] text-outline uppercase tracking-wider mb-1">
              KERNEL SPECIFICATION
            </div>
            <div className="text-xs text-on-surface font-mono">
              RFC 9293 &bull; PROTO-TCP v1.4
            </div>
            <div className="text-[11px] text-on-surface-variant mt-2 leading-relaxed">
              Operating on bare-metal synchronous byte streams. Hardware DMA offloading enabled on all established sockets.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
