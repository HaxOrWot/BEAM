import { NextResponse } from "next/server";
import { lookupPeer } from "@/lib/p2p/signaling-store";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const target = searchParams.get("target");

  if (!target) {
    return NextResponse.json({ error: "Missing target username parameter" }, { status: 400 });
  }

  const peer = lookupPeer(target);
  if (!peer) {
    return NextResponse.json({ found: false, username: target });
  }

  return NextResponse.json({
    found: true,
    username: peer.username,
    callsign: peer.callsign,
    publicKey: peer.publicKey,
    authProvider: peer.authProvider,
    lastSeen: peer.lastHeartbeat,
    online: true,
  });
}
