import { BLOCKED_KEYWORDS, SUSPICIOUS_URL_PATTERNS } from "./config";

export interface ScanResult {
  isSafe: boolean;
  threats: string[];
  severity: "low" | "medium" | "high" | "critical";
  blockedKeywords: string[];
  suspiciousUrls: string[];
}

export function scanContent(content: string): ScanResult {
  const threats: string[] = [];
  const blockedKeywords: string[] = [];
  const suspiciousUrls: string[] = [];

  if (!content || typeof content !== "string") {
    return {
      isSafe: true,
      threats: [],
      severity: "low",
      blockedKeywords: [],
      suspiciousUrls: [],
    };
  }

  const normalizedContent = content.toLowerCase();

  for (const keyword of BLOCKED_KEYWORDS) {
    if (normalizedContent.includes(keyword.toLowerCase())) {
      blockedKeywords.push(keyword);
      threats.push(`Kata kunci terlarang terdeteksi: "${keyword}"`);
    }
  }

  for (const pattern of SUSPICIOUS_URL_PATTERNS) {
    const matches = content.match(pattern);
    if (matches) {
      suspiciousUrls.push(...matches);
      threats.push(`Pola URL mencurigakan: ${matches.join(", ")}`);
    }
  }

  const scriptPatterns = [
    /<script[^>]*src=["'][^"']*(?:slot|gacor|judi|togel)[^"']*["']/gi,
    /document\.write\s*\(/gi,
    /eval\s*\(/gi,
    /Function\s*\(/gi,
    /setTimeout\s*\(\s*["'`]/gi,
    /setInterval\s*\(\s*["'`]/gi,
    /innerHTML\s*=/gi,
    /outerHTML\s*=/gi,
    /insertAdjacentHTML/gi,
    /document\.createElement\s*\(\s*["'`]script/gi,
  ];

  for (const pattern of scriptPatterns) {
    if (pattern.test(content)) {
      threats.push(`Pola script berbahaya terdeteksi: ${pattern.source}`);
    }
  }

  const base64Pattern =
    /data:text\/(?:javascript|html)[^,]*,([A-Za-z0-9+/=]+)/g;
  const base64Matches = content.match(base64Pattern);
  if (base64Matches) {
    for (const match of base64Matches) {
      try {
        const decoded = atob(match.split(",")[1]);
        const subScan = scanContent(decoded);
        if (!subScan.isSafe) {
          threats.push("Konten base64 berbahaya terdeteksi");
          blockedKeywords.push(...subScan.blockedKeywords);
        }
      } catch {}
    }
  }

  let severity: ScanResult["severity"] = "low";
  if (threats.length > 0) {
    if (blockedKeywords.length >= 3 || suspiciousUrls.length >= 2) {
      severity = "critical";
    } else if (blockedKeywords.length >= 2 || suspiciousUrls.length >= 1) {
      severity = "high";
    } else if (blockedKeywords.length >= 1) {
      severity = "medium";
    }
  }

  return {
    isSafe: threats.length === 0,
    threats,
    severity,
    blockedKeywords: [...new Set(blockedKeywords)],
    suspiciousUrls: [...new Set(suspiciousUrls)],
  };
}

export function scanUrl(url: string): ScanResult {
  const threats: string[] = [];
  const blockedKeywords: string[] = [];
  const suspiciousUrls: string[] = [];

  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.toLowerCase();
    const pathname = parsedUrl.pathname.toLowerCase();
    const fullUrl = hostname + pathname;

    for (const keyword of BLOCKED_KEYWORDS) {
      if (fullUrl.includes(keyword.toLowerCase())) {
        blockedKeywords.push(keyword);
        threats.push(`URL mengandung kata kunci terlarang: "${keyword}"`);
      }
    }

    for (const pattern of SUSPICIOUS_URL_PATTERNS) {
      if (pattern.test(fullUrl)) {
        suspiciousUrls.push(url);
        threats.push(`URL cocok dengan pola mencurigakan: ${pattern.source}`);
      }
    }

    const suspiciousTLDs = [
      ".xyz",
      ".top",
      ".club",
      ".online",
      ".site",
      ".fun",
      ".icu",
    ];
    for (const tld of suspiciousTLDs) {
      if (hostname.endsWith(tld)) {
        threats.push(`Domain menggunakan TLD mencurigakan: ${tld}`);
      }
    }
  } catch {
    threats.push("URL tidak valid");
  }

  const severity: ScanResult["severity"] =
    threats.length >= 3
      ? "critical"
      : threats.length >= 2
        ? "high"
        : threats.length >= 1
          ? "medium"
          : "low";

  return {
    isSafe: threats.length === 0,
    threats,
    severity,
    blockedKeywords: [...new Set(blockedKeywords)],
    suspiciousUrls: [...new Set(suspiciousUrls)],
  };
}

export function sanitizeHtml(html: string): string {
  if (!html || typeof html !== "string") return "";

  let sanitized = html;

  sanitized = sanitized.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    "",
  );

  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, "");
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*[^\s>]+/gi, "");

  sanitized = sanitized.replace(
    /href\s*=\s*["']?\s*javascript:[^"'\s>]*/gi,
    'href="#"',
  );
  sanitized = sanitized.replace(
    /src\s*=\s*["']?\s*javascript:[^"'\s>]*/gi,
    'src=""',
  );

  sanitized = sanitized.replace(
    /src\s*=\s*["']?\s*data:text\/(?:javascript|html)[^"'\s>]*/gi,
    'src=""',
  );

  sanitized = sanitized.replace(
    /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
    "",
  );
  sanitized = sanitized.replace(/<iframe[^>]*>/gi, "");

  sanitized = sanitized.replace(
    /<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi,
    "",
  );
  sanitized = sanitized.replace(/<embed[^>]*>/gi, "");

  sanitized = sanitized.replace(/<base[^>]*>/gi, "");

  sanitized = sanitized.replace(
    /<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi,
    "",
  );

  return sanitized;
}

export function escapeHtml(text: string): string {
  if (!text || typeof text !== "string") return "";

  const htmlEntities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
    "`": "&#x60;",
    "=": "&#x3D;",
  };

  return text.replace(/[&<>"'`=/]/g, (char) => htmlEntities[char] || char);
}
