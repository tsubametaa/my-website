import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  checkRateLimit,
  checkUserAgent,
  validateRequest,
  validateOrigin,
  validateReferer,
  BLOCKED_KEYWORDS,
  SECURITY_HEADERS,
  generateCSP,
  generateDevCSP,
} from "@/lib/security";

const isDev = process.env.NODE_ENV === "development";

const ALLOWED_ORIGINS = [
  "https://www.utaaa.my.id/",
  "https://utaaa.my.id/",
  ...(isDev ? ["http://localhost:3000", "http://127.0.0.1:3000"] : []),
];

const ALLOWED_HOSTS = [
  "utaaa.my.id",
  "*.utaaa.my.id",
  ...(isDev ? ["localhost", "127.0.0.1"] : []),
];

function getClientIP(request: NextRequest): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ip = (request as any).ip;

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  if (ip) {
    return ip;
  }
  return "unknown";
}

function isLocalhost(ip: string): boolean {
  return (
    ip === "127.0.0.1" || ip === "::1" || ip === "localhost" || ip === "unknown"
  );
}

function logSecurityEvent(event: {
  type: string;
  ip: string;
  path: string;
  reason?: string;
  userAgent?: string;
}): void {
  if (isDev) {
    console.log(`[SECURITY] ${event.type}:`, {
      ip: event.ip,
      path: event.path,
      reason: event.reason,
      timestamp: new Date().toISOString(),
    });
  }
}

function createBlockedResponse(
  message: string,
  status: number,
  headers?: Record<string, string>,
): NextResponse {
  const response = new NextResponse(
    JSON.stringify({
      error: message,
      status,
      timestamp: new Date().toISOString(),
    }),
    {
      status,
      headers: {
        "Content-Type": "application/json",
        ...SECURITY_HEADERS,
        ...headers,
      },
    },
  );
  return response;
}

export function middleware(request: NextRequest) {
  const ip = getClientIP(request);
  const path = request.nextUrl.pathname;
  const userAgent = request.headers.get("user-agent") || "";

  if (isDev && isLocalhost(ip)) {
    const response = NextResponse.next();
    response.headers.set("Content-Security-Policy", generateDevCSP());
    return response;
  }

  const requestValidation = validateRequest(request);
  if (!requestValidation.valid) {
    logSecurityEvent({
      type: "INVALID_REQUEST",
      ip,
      path,
      reason: requestValidation.reason,
      userAgent,
    });
    return createBlockedResponse(
      requestValidation.reason || "Request tidak valid",
      400,
    );
  }

  const uaCheck = checkUserAgent(userAgent);
  if (!uaCheck.allowed) {
    logSecurityEvent({
      type: "BOT_BLOCKED",
      ip,
      path,
      reason: uaCheck.reason,
      userAgent,
    });
    return createBlockedResponse(uaCheck.reason || "Bot tidak diizinkan", 403);
  }

  const isApiRequest = path.startsWith("/api");
  const rateLimit = checkRateLimit(ip, isApiRequest);
  if (!rateLimit.allowed) {
    logSecurityEvent({
      type: "RATE_LIMIT_EXCEEDED",
      ip,
      path,
      reason: rateLimit.reason,
      userAgent,
    });
    return createBlockedResponse(
      rateLimit.reason || "Terlalu banyak request",
      429,
      {
        "Retry-After": String(rateLimit.retryAfter || 60),
        "X-RateLimit-Remaining": "0",
        "X-RateLimit-Reset": String(rateLimit.resetTime),
      },
    );
  }

  const origin = request.headers.get("origin");
  if (origin) {
    const originValidation = validateOrigin(origin, ALLOWED_ORIGINS);
    if (!originValidation.valid) {
      logSecurityEvent({
        type: "INVALID_ORIGIN",
        ip,
        path,
        reason: originValidation.reason,
        userAgent,
      });
    }
  }

  const referer = request.headers.get("referer");
  if (referer) {
    const refererValidation = validateReferer(referer, ALLOWED_HOSTS);
    if (!refererValidation.valid) {
      logSecurityEvent({
        type: "SUSPICIOUS_REFERER",
        ip,
        path,
        reason: refererValidation.reason,
        userAgent,
      });
    }
  }

  const fullUrl = request.url.toLowerCase();
  for (const keyword of BLOCKED_KEYWORDS) {
    if (fullUrl.includes(keyword.toLowerCase())) {
      logSecurityEvent({
        type: "BLOCKED_KEYWORD_IN_URL",
        ip,
        path,
        reason: `URL mengandung kata kunci terlarang: ${keyword}`,
        userAgent,
      });
      return createBlockedResponse("Request tidak diizinkan", 403);
    }
  }

  const searchParams = request.nextUrl.searchParams;
  for (const [key, value] of searchParams.entries()) {
    const combined = `${key}=${value}`.toLowerCase();
    for (const keyword of BLOCKED_KEYWORDS) {
      if (combined.includes(keyword.toLowerCase())) {
        logSecurityEvent({
          type: "BLOCKED_KEYWORD_IN_QUERY",
          ip,
          path,
          reason: `Query parameter mengandung kata kunci terlarang: ${keyword}`,
          userAgent,
        });
        return createBlockedResponse("Request tidak diizinkan", 403);
      }
    }
  }

  const response = NextResponse.next();

  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }

  response.headers.set("Content-Security-Policy", generateCSP());

  response.headers.set("X-RateLimit-Remaining", String(rateLimit.remaining));
  response.headers.set("X-RateLimit-Reset", String(rateLimit.resetTime));

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets/).*)"],
};
