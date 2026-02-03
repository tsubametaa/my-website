import { TRUSTED_DOMAINS } from "./config";

interface CSPDirectives {
  [key: string]: string[];
}

export function generateNonce(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Buffer.from(array).toString("base64");
}

function buildDirective(name: string, values: string[]): string {
  if (values.length === 0) return "";
  return `${name} ${values.join(" ")}`;
}

export function generateCSP(nonce?: string): string {
  const directives: CSPDirectives = {
    "default-src": ["'self'"],
    "script-src": [
      ...TRUSTED_DOMAINS.scripts,
      nonce ? `'nonce-${nonce}'` : "",
      "'strict-dynamic'",
    ].filter(Boolean),
    "style-src": TRUSTED_DOMAINS.styles,
    "img-src": TRUSTED_DOMAINS.images,
    "font-src": TRUSTED_DOMAINS.fonts,
    "connect-src": TRUSTED_DOMAINS.connect,
    "frame-src": TRUSTED_DOMAINS.frames,
    "frame-ancestors": ["'none'"],
    "object-src": TRUSTED_DOMAINS.objects,
    "media-src": TRUSTED_DOMAINS.media,
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "manifest-src": ["'self'"],
    "worker-src": ["'self'", "blob:"],
    "child-src": ["'self'", "blob:"],
    "upgrade-insecure-requests": [],
    "block-all-mixed-content": [],
  };

  const cspParts: string[] = [];

  for (const [directive, values] of Object.entries(directives)) {
    if (
      directive === "upgrade-insecure-requests" ||
      directive === "block-all-mixed-content"
    ) {
      cspParts.push(directive);
    } else if (values.length > 0) {
      cspParts.push(buildDirective(directive, values));
    }
  }

  return cspParts.join("; ");
}

export function generateDevCSP(): string {
  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' ws: wss: https:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");
}

export function generateCSPReportOnly(reportUri: string): string {
  return `${generateCSP()}; report-uri ${reportUri}`;
}
