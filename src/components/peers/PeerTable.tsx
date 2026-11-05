"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { useP2P } from "@/context/P2PContext";
import { Plus, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

export const PeerTable: React.FC = () => {
  const router = useRouter();
  const { activePeers, identity, connectToPeer } = useP2P();

  return (
    <div className="bg-surface-low border border-surface-high p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-surface-high gap-2 mb-4">
        <div>
          <h3 className="font-mono text-xs font-semibold text-primary uppercase tracking-wider">
            Connected Mesh Peers ({activePeers.length})
          </h3>
          <p className="text-[11px] text-outline mt-0.5">
            Active verified nodes broadcasting in the presence hub.
          </p>
        </div>

        <Link href="/enrollment">
          <Button variant="primary" size="sm">
            <Plus size={12} />
            Enroll Peer Node
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-surface-high text-outline text-[10px] uppercase">
              <th className="pb-2 font-normal">Node Username</th>
              <th className="pb-2 font-normal">Callsign</th>
              <th className="pb-2 font-normal">Status</th>
              <th className="pb-2 font-normal">Transport</th>
              <th className="pb-2 font-normal">Public Key Fingerprint</th>
              <th className="pb-2 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-high/50">
            {activePeers.map((peer) => {
              const isSelf = peer.username === identity.username;
              return (
                <tr key={peer.username} className="hover:bg-surface-high/20 transition-colors">
                  <td className="py-3">
                    <div className="text-primary font-medium">@{peer.username} {isSelf && "(Local Node)"}</div>
                    <div className="text-[10px] text-outline uppercase">{peer.authProvider}</div>
                  </td>
                  <td className="py-3 text-on-surface font-semibold">{peer.callsign}</td>
                  <td className="py-3">
                    <Badge variant="active" size="sm">
                      ONLINE
                    </Badge>
                  </td>
                  <td className="py-3 text-primary font-mono-num">WebRTC DataChannel</td>
                  <td className="py-3 font-mono-num text-on-surface truncate max-w-xs">
                    {peer.publicKey.substring(0, 24)}...
                  </td>
                  <td className="py-3 text-right">
                    {!isSelf && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={async () => {
                          await connectToPeer(peer.username);
                          router.push("/transfers");
                        }}
                      >
                        <Zap size={11} /> Connect &amp; Transfer
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
