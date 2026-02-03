import { RATE_LIMIT_CONFIG, BLOCKED_BOTS, ALLOWED_BOTS } from "./config";

interface RateLimitEntry {
  count: number;
  firstRequest: number;
  lastRequest: number;
  blocked: boolean;
  blockedUntil: number;
  suspiciousScore: number;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  retryAfter?: number;
  reason?: string;
}

const rateLimitStore = new Map<string, RateLimitEntry>();
const ipBlacklist = new Set<string>();
const ipWhitelist = new Set<string>(["127.0.0.1", "::1", "localhost"]);

const CLEANUP_INTERVAL = 5 * 60 * 1000;

function cleanupExpiredEntries(): void {
  const now = Date.now();
  for (const [ip, entry] of rateLimitStore.entries()) {
    if (now - entry.lastRequest > 10 * 60 * 1000) {
      rateLimitStore.delete(ip);
    }
    if (entry.blocked && now > entry.blockedUntil) {
      entry.blocked = false;
      entry.suspiciousScore = Math.max(0, entry.suspiciousScore - 5);
    }
  }
}

if (typeof setInterval !== "undefined") {
  setInterval(cleanupExpiredEntries, CLEANUP_INTERVAL);
}

function getOrCreateEntry(ip: string): RateLimitEntry {
  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, {
      count: 0,
      firstRequest: Date.now(),
      lastRequest: Date.now(),
      blocked: false,
      blockedUntil: 0,
      suspiciousScore: 0,
    });
  }
  return rateLimitStore.get(ip)!;
}

export function checkRateLimit(
  ip: string,
  isApiRequest: boolean = false,
): RateLimitResult {
  const now = Date.now();
  const { windowMs, maxRequests, maxRequestsApi, blockDuration } =
    RATE_LIMIT_CONFIG;

  if (ipWhitelist.has(ip)) {
    return { allowed: true, remaining: 999, resetTime: 0 };
  }

  if (ipBlacklist.has(ip)) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: 0,
      reason: "IP telah diblokir permanen",
    };
  }

  const entry = getOrCreateEntry(ip);
  const limit = isApiRequest ? maxRequestsApi : maxRequests;

  if (entry.blocked) {
    if (now < entry.blockedUntil) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.blockedUntil,
        retryAfter: Math.ceil((entry.blockedUntil - now) / 1000),
        reason: "Terlalu banyak request. Silakan tunggu.",
      };
    }
    entry.blocked = false;
  }

  if (now - entry.firstRequest > windowMs) {
    entry.count = 0;
    entry.firstRequest = now;
  }

  entry.count++;
  entry.lastRequest = now;

  if (entry.count > limit) {
    entry.blocked = true;
    entry.blockedUntil = now + blockDuration;
    entry.suspiciousScore += 10;

    if (entry.suspiciousScore >= 50) {
      ipBlacklist.add(ip);
    }

    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.blockedUntil,
      retryAfter: Math.ceil(blockDuration / 1000),
      reason: "Rate limit exceeded",
    };
  }

  return {
    allowed: true,
    remaining: limit - entry.count,
    resetTime: entry.firstRequest + windowMs,
  };
}

export function checkUserAgent(userAgent: string): {
  allowed: boolean;
  isBot: boolean;
  isTrustedBot: boolean;
  reason?: string;
} {
  const ua = userAgent.toLowerCase();

  for (const bot of ALLOWED_BOTS) {
    if (ua.includes(bot)) {
      return { allowed: true, isBot: true, isTrustedBot: true };
    }
  }

  for (const bot of BLOCKED_BOTS) {
    if (ua.includes(bot)) {
      return {
        allowed: false,
        isBot: true,
        isTrustedBot: false,
        reason: `Bot terblokir: ${bot}`,
      };
    }
  }

  const suspiciousPatterns = [
    /^$/,
    /^-$/,
    /bot|crawler|spider|scraper/i,
    /^mozilla\/[45]\.0\s*$/i,
  ];

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(ua)) {
      return {
        allowed: false,
        isBot: true,
        isTrustedBot: false,
        reason: "User agent mencurigakan",
      };
    }
  }

  return { allowed: true, isBot: false, isTrustedBot: false };
}

export function blacklistIP(ip: string): void {
  ipBlacklist.add(ip);
}

export function whitelistIP(ip: string): void {
  ipWhitelist.add(ip);
  ipBlacklist.delete(ip);
}

export function unblacklistIP(ip: string): void {
  ipBlacklist.delete(ip);
}

export function getRateLimitStats(): {
  activeEntries: number;
  blacklistedIPs: number;
  whitelistedIPs: number;
} {
  return {
    activeEntries: rateLimitStore.size,
    blacklistedIPs: ipBlacklist.size,
    whitelistedIPs: ipWhitelist.size,
  };
}
