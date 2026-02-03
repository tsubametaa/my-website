import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// CSP untuk production - sangat ketat
const productionCSP = [
  "default-src 'self'",
  "script-src 'self' 'strict-dynamic'",
  "style-src 'self' 'unsafe-inline'", // Untuk Tailwind
  "img-src 'self' data: blob: https://avatars.githubusercontent.com https://github.com",
  "font-src 'self' https://fonts.gstatic.com",
  "connect-src 'self' https://api.github.com",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
  "block-all-mixed-content",
].join("; ");

// CSP untuk development - lebih permisif
const developmentCSP = [
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

const nextConfig: NextConfig = {
  // Konfigurasi keamanan untuk images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
    ],
    dangerouslyAllowSVG: false, // Blokir SVG dari external source
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Powered by header - sembunyikan untuk keamanan
  poweredByHeader: false,

  // Redirect HTTP ke HTTPS di production
  async redirects() {
    return isDev
      ? []
      : [
          {
            source: "/:path*",
            has: [
              {
                type: "header",
                key: "x-forwarded-proto",
                value: "http",
              },
            ],
            destination: "https://%{host}/:path*",
            permanent: true,
          },
        ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // DNS Prefetch
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          // HSTS - Strict Transport Security
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Prevent Clickjacking
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // Prevent MIME type sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // XSS Protection (legacy browsers)
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // Referrer Policy
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Permissions Policy
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=(), interest-cohort=()",
          },
          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value: isDev ? developmentCSP : productionCSP,
          },
          // Cross-Origin Policies
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: isDev ? "unsafe-none" : "require-corp",
          },
          // Prevent Cross-Domain Policies
          {
            key: "X-Permitted-Cross-Domain-Policies",
            value: "none",
          },
          // Cache Control untuk HTML pages
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        ],
      },
      // Cache static assets
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Security untuk API routes
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
          {
            key: "Content-Type",
            value: "application/json",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
