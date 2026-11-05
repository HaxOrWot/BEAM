import { NextResponse } from "next/server";
import { enqueueSignal } from "@/lib/p2p/signaling-store";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { targetUsername, senderUsername, type, data } = body;

    if (!targetUsername || !senderUsername || !type || !data) {
      return NextResponse.json({ error: "Missing required signal parameters" }, { status: 400 });
    }

    enqueueSignal({
      targetUsername,
      senderUsername,
      type,
      data,
    });

    return NextResponse.json({ success: true, timestamp: Date.now() });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
