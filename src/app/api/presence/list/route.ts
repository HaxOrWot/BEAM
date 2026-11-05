import { NextResponse } from "next/server";
import { listActivePeers } from "@/lib/p2p/signaling-store";

export async function GET() {
  const peers = listActivePeers();
  return NextResponse.json({
    count: peers.length,
    peers: peers.map((p) => ({
      username: p.username,
      callsign: p.callsign,
      publicKey: p.publicKey,
      authProvider: p.authProvider,
      online: true,
      lastSeen: p.lastHeartbeat,
    })),
  });
}
