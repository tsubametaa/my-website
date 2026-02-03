# Konfigurasi Keamanan Website

## Overview

Website ini dilengkapi dengan sistem keamanan komprehensif untuk melindungi dari:

- ✅ **Injeksi iklan judi/judol** (slot, togel, casino, dll)
- ✅ **Malware distribution**
- ✅ **DDoS attacks**
- ✅ **XSS (Cross-Site Scripting)**
- ✅ **Clickjacking**
- ✅ **CSRF (Cross-Site Request Forgery)**
- ✅ **Bot berbahaya & scraping**

## Struktur File Keamanan

```
src/lib/security/
├── index.ts          # Entry point - export semua fungsi
├── config.ts         # Konfigurasi (blocked keywords, domains, dll)
├── csp.ts            # Content Security Policy generator
├── scanner.ts        # Content scanner untuk deteksi ancaman
├── rate-limiter.ts   # Rate limiting untuk mencegah DDoS
└── validators.ts     # Validasi request, origin, referer

src/app/hooks/
└── useSecurity.ts    # React hooks untuk client-side protection

src/app/components/security/
└── SecurityProvider.tsx  # Provider component untuk proteksi client
```

## Cara Penggunaan

### 1. Middleware (Server-Side)

Middleware sudah otomatis aktif di `src/middleware.ts`. Fitur:

- Rate limiting
- Bot detection
- Blocked keywords filtering
- Security headers injection

### 2. Client-Side Protection

Wrap aplikasi dengan `SecurityProvider`:

```tsx
// src/app/layout.tsx
import { SecurityProvider } from "@/app/components/security/SecurityProvider";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SecurityProvider
          enableScriptProtection={true}
          enableDOMProtection={true}
          enableClipboardProtection={true}
        >
          {children}
        </SecurityProvider>
      </body>
    </html>
  );
}
```

### 3. Scan Konten User-Generated

```tsx
import { scanContent, scanUrl, sanitizeHtml } from "@/lib/security";

// Scan text content
const result = scanContent(userInput);
if (!result.isSafe) {
  console.log("Threats found:", result.threats);
}

// Scan URL
const urlResult = scanUrl(userUrl);
if (!urlResult.isSafe) {
  console.log("Suspicious URL:", urlResult.suspiciousUrls);
}

// Sanitize HTML
const cleanHtml = sanitizeHtml(dirtyHtml);
```

### 4. Validasi Request Manual

```tsx
import {
  validateRequest,
  validateOrigin,
  detectAttackPatterns,
} from "@/lib/security";

// Validasi request
const validation = validateRequest(request);
if (!validation.valid) {
  return new Response(validation.reason, { status: 400 });
}

// Deteksi pola serangan
const attack = detectAttackPatterns(userInput);
if (!attack.isSafe) {
  console.log("Attack detected:", attack.attackType);
}
```

## Konfigurasi

### Menambah Blocked Keywords

Edit `src/lib/security/config.ts`:

```typescript
export const BLOCKED_KEYWORDS = [
  // ... existing keywords
  "newblockedword",
  "anotherblocked",
];
```

### Menambah Trusted Domains

```typescript
export const TRUSTED_DOMAINS = {
  scripts: ["'self'", "https://cdn.yourtrusted.com"],
  // ...
};
```

### Mengatur Rate Limit

```typescript
export const RATE_LIMIT_CONFIG = {
  windowMs: 60 * 1000, // 1 menit
  maxRequests: 60, // Max 60 req per menit
  maxRequestsApi: 30, // Max 30 API req per menit
  blockDuration: 5 * 60 * 1000, // Block 5 menit
};
```

## Security Headers

Headers yang diaktifkan:

| Header                      | Nilai                           | Fungsi                         |
| --------------------------- | ------------------------------- | ------------------------------ |
| `Content-Security-Policy`   | Strict                          | Mencegah XSS, script injection |
| `X-Frame-Options`           | DENY                            | Mencegah clickjacking          |
| `X-Content-Type-Options`    | nosniff                         | Mencegah MIME sniffing         |
| `Strict-Transport-Security` | max-age=63072000                | Force HTTPS                    |
| `X-XSS-Protection`          | 1; mode=block                   | XSS filter                     |
| `Referrer-Policy`           | strict-origin-when-cross-origin | Control referer                |
| `Permissions-Policy`        | camera=(), ...                  | Disable APIs                   |

## Monitoring & Logging

Security events di-log di middleware. Untuk production, integrasikan dengan:

- Sentry
- LogRocket
- Datadog
- Custom logging service

## Testing

### Test Rate Limiting

```bash
# Kirim banyak request untuk trigger rate limit
for i in {1..100}; do curl http://localhost:3000; done
```

### Test Blocked Keywords

```bash
# Request dengan keyword terlarang (akan di-block)
curl "http://localhost:3000/search?q=slot-gacor"
```

### Test Bot Detection

```bash
# Request dengan user agent bot (akan di-block)
curl -A "python-requests" http://localhost:3000
```

## Best Practices

1. **Selalu update** daftar blocked keywords secara berkala
2. **Monitor logs** untuk mendeteksi pola serangan baru
3. **Test secara berkala** dengan tools seperti OWASP ZAP
4. **Backup** konfigurasi sebelum mengubah
5. **Review** CSP jika ada fitur baru yang membutuhkan external resources

## Deployment Checklist

- [ ] Ganti `yourdomain.com` dengan domain sebenarnya di semua file
- [ ] Set `NODE_ENV=production` di server
- [ ] Aktifkan HTTPS/SSL
- [ ] Configure firewall di hosting
- [ ] Setup monitoring & alerting
- [ ] Test semua security features

## Troubleshooting

### CSP Error di Console

Jika muncul CSP violation, tambahkan domain ke `TRUSTED_DOMAINS` di config.

### Rate Limit Terlalu Ketat

Sesuaikan `RATE_LIMIT_CONFIG` di config.

### Fitur Tidak Berfungsi

Pastikan domain/source sudah ditambahkan ke CSP whitelist.

---

**⚠️ PENTING**: Untuk keamanan maksimal di production, gunakan juga:

- Web Application Firewall (WAF)
- DDoS protection service (Cloudflare, AWS Shield, dll)
- Regular security audits
