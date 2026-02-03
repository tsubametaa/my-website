/**
 * Security Configuration
 * Konfigurasi keamanan untuk menangkal iklan judi, malware, dan serangan berbahaya
 */

// Daftar kata kunci berbahaya yang sering digunakan untuk iklan judi/judol
export const BLOCKED_KEYWORDS = [
  // Kata kunci judi umum
  "slot",
  "gacor",
  "maxwin",
  "jackpot",
  "togel",
  "casino",
  "poker",
  "betting",
  "taruhan",
  "judi",
  "gambling",
  "rtp",
  "scatter",
  "pragmatic",
  "pgsoft",
  "joker123",
  "spadegaming",
  "habanero",
  // Provider judi
  "slot88",
  "slot777",
  "dewaslot",
  "rajagacor",
  "bosgacor",
  "sultangacor",
  "slothoki",
  "togelonline",
  "bandarjudi",
  "agenjudi",
  "situsslot",
  "deposit",
  "withdraw",
  "bonus100",
  "freebet",
  "promojudi",
  "daftar-slot",
  "login-slot",
  "link-alternatif",
  "bocoran-slot",
  "judionline",
  "casinoonline",
  "bola88",
  "sbobet",
];

export const SUSPICIOUS_URL_PATTERNS = [
  /slot\d+/i,
  /gacor\d*/i,
  /togel\d*/i,
  /judi[a-z0-9]*/i,
  /casino[a-z0-9]*/i,
  /betting[a-z0-9]*/i,
  /maxwin/i,
  /scatter/i,
  /pragmatic/i,
  /bonus\d+%/i,
];

export const BLOCKED_DOMAINS = [
  "*.slot*.com",
  "*.gacor*.com",
  "*.togel*.com",
  "*.judi*.com",
  "*.casino*.xyz",
  "*.betting*.net",
  "*.poker*.online",
];

export const TRUSTED_DOMAINS = {
  scripts: ["'self'", "https://www.utaaa.my.id/", "https://www.freelinkd.com/"],
  styles: ["'self'", "'unsafe-inline'"],
  images: [
    "'self'",
    "data:",
    "blob:",
    "https://avatars.githubusercontent.com",
    "https://github.com",
  ],
  fonts: ["'self'", "https://fonts.gstatic.com"],
  connect: ["'self'", "https://api.github.com"],
  frames: ["'none'"],
  objects: ["'none'"],
  media: ["'self'"],
};

export const RATE_LIMIT_CONFIG = {
  windowMs: 60 * 1000,
  maxRequests: 60,
  maxRequestsApi: 30,
  blockDuration: 5 * 60 * 1000,
};

export const BLOCKED_BOTS = [
  "curl",
  "wget",
  "python-requests",
  "scrapy",
  "httpclient",
  "java/",
  "libwww-perl",
  "phantom",
  "headless",
  "selenium",
  "puppeteer",
  "ahrefsbot",
  "semrushbot",
  "dotbot",
  "mj12bot",
  "blexbot",
];

export const ALLOWED_BOTS = [
  "googlebot",
  "bingbot",
  "duckduckbot",
  "yandexbot",
  "facebookexternalhit",
  "twitterbot",
  "linkedinbot",
];

export const SECURITY_HEADERS = {
  "X-DNS-Prefetch-Control": "on",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  "X-Permitted-Cross-Domain-Policies": "none",
  "Cross-Origin-Embedder-Policy": "require-corp",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
};

export const BLOCKED_FILE_EXTENSIONS = [
  ".exe",
  ".dll",
  ".bat",
  ".cmd",
  ".sh",
  ".php",
  ".asp",
  ".aspx",
  ".jsp",
  ".cgi",
  ".pl",
  ".py",
  ".rb",
  ".jar",
  ".war",
  ".msi",
  ".scr",
  ".pif",
  ".vbs",
  ".vbe",
  ".js",
  ".jse",
  ".ws",
  ".wsf",
  ".wsc",
  ".wsh",
  ".ps1",
  ".psm1",
  ".psd1",
];

export const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "application/pdf",
  "text/plain",
];
