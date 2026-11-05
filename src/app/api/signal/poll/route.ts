import { NextResponse } from "next/server";
import { pollSignalsFor } from "@/lib/p2p/signaling-store";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Missing username parameter" }, { status: 400 });
  }

  const signals = pollSignalsFor(username);
  return NextResponse.json({
    count: signals.length,
    signals,
  });
}
