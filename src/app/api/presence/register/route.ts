import { NextResponse } from "next/server";
import { registerOrUpdatePeer } from "@/lib/p2p/signaling-store";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, callsign, publicKey, authProvider } = body;

    if (!username) {
      return NextResponse.json({ error: "Missing username" }, { status: 400 });
    }

    registerOrUpdatePeer({
      username,
      callsign: callsign || "NODE_0x0000",
      publicKey: publicKey || "proto_pk_live_unspecified",
      authProvider: authProvider || "anonymous",
    });

    return NextResponse.json({ success: true, timestamp: Date.now() });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
