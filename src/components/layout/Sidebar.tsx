"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SidebarNavProps {
  onCloseMobile?: () => void;
}

const NAV_ITEMS = [
  { label: "Transfer Console", href: "/", icon: "sync_alt" },
  { label: "Peers Topology", href: "/peers", icon: "hub" },
  { label: "Key Ring & E2EE Vault", href: "/vault", icon: "lock" },
  { label: "Incoming Streams", href: "/streams", icon: "download" },
  { label: "Socket Handshakes", href: "/handshakes", icon: "handshake" },
  { label: "Buffer & Storage", href: "/storage", icon: "memory" },
  { label: "Telemetry & Audit", href: "/telemetry", icon: "monitoring" },
  { label: "Diagnostics & Logs", href: "/diagnostics", icon: "terminal" },
  { label: "Node Enrollment", href: "/enrollment", icon: "add_circle" },
  { label: "Node Authentication", href: "/auth", icon: "shield" },
];

export const Sidebar: React.FC<SidebarNavProps> = ({ onCloseMobile }) => {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-full border-r border-outline-variant bg-surface-container-lowest p-space-md flex flex-col justify-between overflow-y-auto">
      <div className="flex flex-col gap-space-lg">
        {/* Nav Links */}
        <div className="flex flex-col gap-space-xs">
          <span className="font-label-caps text-label-caps uppercase text-outline px-space-sm mb-1">
            Console Navigation
          </span>
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/" || pathname === "/transfers"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`flex items-center gap-space-xs px-space-sm py-2 transition-colors font-body-sm text-body-sm uppercase tracking-wider ${
                    isActive
                      ? "bg-surface-container-high text-primary font-medium border-l-2 border-primary"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Active Sockets Widget from Stitch */}
        <div className="flex flex-col gap-space-xs">
          <span className="font-label-caps text-label-caps uppercase text-outline px-space-sm">
            Active Sockets (4)
          </span>

          <div className="flex flex-col gap-space-xs">
            {/* Socket 1: Gold Edition Socket */}
            <div
              className="p-space-sm bg-surface-container-low border flex flex-col"
              style={{
                borderColor: "rgba(212, 175, 55, 0.4)",
                boxShadow: "rgba(212, 175, 55, 0.05) 0px 0px 12px inset",
              }}
            >
              <div className="flex justify-between items-center">
                <span className="font-telemetry-sm text-telemetry-sm text-on-surface">
                  192.88.99.1:9042
                </span>
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: "#DFBD69",
                    boxShadow: "0 0 6px #DFBD69",
                  }}
                />
              </div>
              <span
                className="font-label-caps text-label-caps uppercase mt-1"
                style={{ color: "#C5A059" }}
              >
                TLS 1.3 / CHACHA20
              </span>
            </div>

            {/* Socket 2 */}
            <div className="p-space-sm bg-surface-container-low border border-outline-variant flex flex-col">
              <div className="flex justify-between items-center">
                <span className="font-telemetry-sm text-telemetry-sm text-on-surface">
                  10.0.4.12:9042
                </span>
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#DFBD69" }}
                />
              </div>
              <span className="font-label-caps text-label-caps text-outline uppercase mt-1">
                DIRECT TCP STREAM
              </span>
            </div>

            {/* Socket 3 */}
            <div className="p-space-sm bg-surface-container-low border border-outline-variant flex flex-col">
              <div className="flex justify-between items-center">
                <span className="font-telemetry-sm text-telemetry-sm text-on-surface">
                  172.16.8.99:9042
                </span>
                <span className="w-2 h-2 rounded-full bg-outline" />
              </div>
              <span className="font-label-caps text-label-caps text-outline uppercase mt-1">
                STANDBY / IDLE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Total Bandwidth Box */}
      <div className="p-space-sm bg-surface-container-high border border-outline-variant flex flex-col gap-space-xs mt-6">
        <div className="flex justify-between items-center">
          <span className="font-label-caps text-label-caps uppercase text-outline">
            TOTAL OUT
          </span>
          <span className="font-telemetry-sm text-telemetry-sm text-primary">
            418.2 GB
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-label-caps text-label-caps uppercase text-outline">
            TOTAL IN
          </span>
          <span className="font-telemetry-sm text-telemetry-sm text-primary">
            1.82 TB
          </span>
        </div>
      </div>
    </aside>
  );
};
