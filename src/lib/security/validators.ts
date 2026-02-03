import { BLOCKED_KEYWORDS, SUSPICIOUS_URL_PATTERNS } from "./config";

interface ValidationResult {
  valid: boolean;
  reason?: string;
}

export function validateRequest(request: Request): ValidationResult {
  const allowedMethods = [
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "PATCH",
    "OPTIONS",
    "HEAD",
  ];
  if (!allowedMethods.includes(request.method)) {
    return { valid: false, reason: "Method tidak diizinkan" };
  }

  try {
    const url = new URL(request.url);

    if (url.pathname.includes("..") || url.pathname.includes("./")) {
      return { valid: false, reason: "Path traversal terdeteksi" };
    }

    const fullPath = url.pathname + url.search;
    for (const keyword of BLOCKED_KEYWORDS) {
      if (fullPath.toLowerCase().includes(keyword.toLowerCase())) {
        return {
          valid: false,
          reason: `URL mengandung kata kunci terlarang: ${keyword}`,
        };
      }
    }

    for (const pattern of SUSPICIOUS_URL_PATTERNS) {
      if (pattern.test(fullPath)) {
        return { valid: false, reason: "URL mencurigakan terdeteksi" };
      }
    }
  } catch {
    return { valid: false, reason: "URL tidak valid" };
  }

  if (["POST", "PUT", "PATCH"].includes(request.method)) {
    const contentType = request.headers.get("content-type");
    const allowedContentTypes = [
      "application/json",
      "application/x-www-form-urlencoded",
      "multipart/form-data",
      "text/plain",
    ];

    if (contentType) {
      const isAllowed = allowedContentTypes.some((type) =>
        contentType.toLowerCase().includes(type),
      );
      if (!isAllowed) {
        return { valid: false, reason: "Content-Type tidak diizinkan" };
      }
    }
  }

  const contentLength = request.headers.get("content-length");
  if (contentLength) {
    const size = parseInt(contentLength, 10);
    const maxSize = 10 * 1024 * 1024;
    if (size > maxSize) {
      return { valid: false, reason: "Request terlalu besar" };
    }
  }

  return { valid: true };
}

export function validateOrigin(
  origin: string | null,
  allowedOrigins: string[],
): ValidationResult {
  if (!origin) {
    return { valid: true };
  }

  const normalizedAllowed = allowedOrigins.map((o) =>
    o.toLowerCase().replace(/\/$/, ""),
  );
  const normalizedOrigin = origin.toLowerCase().replace(/\/$/, "");

  for (const allowed of normalizedAllowed) {
    if (allowed === "*") {
      return { valid: true };
    }
    if (allowed === normalizedOrigin) {
      return { valid: true };
    }
    if (allowed.startsWith("*.")) {
      const domain = allowed.slice(2);
      if (normalizedOrigin.endsWith(domain)) {
        return { valid: true };
      }
    }
  }

  return { valid: false, reason: `Origin tidak diizinkan: ${origin}` };
}

export function validateReferer(
  referer: string | null,
  allowedHosts: string[],
): ValidationResult {
  if (!referer) {
    return { valid: true };
  }

  try {
    const refererUrl = new URL(referer);
    const refererHost = refererUrl.hostname.toLowerCase();

    for (const keyword of BLOCKED_KEYWORDS) {
      if (referer.toLowerCase().includes(keyword.toLowerCase())) {
        return {
          valid: false,
          reason: `Referer mengandung kata kunci terlarang: ${keyword}`,
        };
      }
    }

    for (const host of allowedHosts) {
      if (host === "*") {
        return { valid: true };
      }
      if (refererHost === host.toLowerCase()) {
        return { valid: true };
      }
      if (host.startsWith("*.")) {
        const domain = host.slice(2).toLowerCase();
        if (refererHost === domain || refererHost.endsWith(`.${domain}`)) {
          return { valid: true };
        }
      }
    }

    return { valid: false, reason: `Referer tidak diizinkan: ${refererHost}` };
  } catch {
    return { valid: false, reason: "Referer tidak valid" };
  }
}

export function sanitizeQueryParams(
  searchParams: URLSearchParams,
): URLSearchParams {
  const sanitized = new URLSearchParams();

  for (const [key, value] of searchParams.entries()) {
    const keyLower = key.toLowerCase();
    const valueLower = value.toLowerCase();

    let isBlocked = false;
    for (const keyword of BLOCKED_KEYWORDS) {
      if (keyLower.includes(keyword) || valueLower.includes(keyword)) {
        isBlocked = true;
        break;
      }
    }

    if (!isBlocked) {
      const sanitizedValue = value
        .replace(/<[^>]*>/g, "")
        .replace(/javascript:/gi, "")
        .replace(/on\w+\s*=/gi, "")
        .trim();

      sanitized.set(key, sanitizedValue);
    }
  }

  return sanitized;
}

export function detectAttackPatterns(input: string): {
  isSafe: boolean;
  attackType?: string;
} {
  const patterns: Array<{ name: string; pattern: RegExp }> = [
    {
      name: "SQL Injection",
      pattern:
        /(\b(union|select|insert|update|delete|drop|create|alter|exec|execute)\b.*\b(from|into|where|table|database)\b)|(['"];\s*--)|(\bor\b\s+['"]?\d+['"]?\s*=\s*['"]?\d+)/i,
    },
    {
      name: "XSS",
      pattern: /<script[^>]*>|javascript:|on\w+\s*=|<\s*img[^>]+onerror/i,
    },
    {
      name: "Path Traversal",
      pattern: /\.\.[\/\\]|%2e%2e[\/\\%]|\.\.%2f|%2e%2e%2f/i,
    },
    {
      name: "Command Injection",
      pattern:
        /[;&|`$]|\b(cat|ls|dir|rm|del|wget|curl|bash|sh|cmd|powershell)\b/i,
    },
    { name: "LDAP Injection", pattern: /[)(|*\\]|\x00|\x0a|\x0d/i },
    {
      name: "XML Injection",
      pattern: /<!DOCTYPE|<!ENTITY|SYSTEM\s+["']|PUBLIC\s+["']/i,
    },
  ];

  for (const { name, pattern } of patterns) {
    if (pattern.test(input)) {
      return { isSafe: false, attackType: name };
    }
  }

  return { isSafe: true };
}
