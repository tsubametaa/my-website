import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

export function middleware(request: NextRequest) {
  const LIMIT = 60;
  const WINDOW_MS = 60 * 1000;

  const ip =
    (request as any).ip || request.headers.get("x-forwarded-for") || "unknown";

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, {
      count: 0,
      lastReset: Date.now(),
    });
  }

  const ipData = rateLimitMap.get(ip);
  const now = Date.now();

  if (ipData && now - ipData.lastReset > WINDOW_MS) {
    ipData.count = 0;
    ipData.lastReset = now;
  }

  if (ipData && ipData.count >= LIMIT) {
    return new NextResponse("Too Many Requests", { status: 429 });
  }

  if (ipData) {
    ipData.count += 1;
  }

  const userAgent = (request.headers.get("user-agent") || "").toLowerCase();
  const badBots = ["curl", "wget", "python-requests", "scrapy"];

  if (badBots.some((bot) => userAgent.includes(bot))) {
    return new NextResponse("Bot Detected", { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
