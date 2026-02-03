/**
 * Security Hooks
 * React hooks untuk keamanan di client-side
 */

"use client";

import { useEffect, useCallback } from "react";
import { BLOCKED_KEYWORDS } from "@/lib/security/config";

/**
 * Hook untuk mendeteksi dan memblokir script injection di client
 */
export function useScriptProtection() {
  useEffect(() => {
    // Observer untuk mendeteksi penambahan script baru
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLScriptElement) {
            const src = node.src?.toLowerCase() || "";
            const content = node.textContent?.toLowerCase() || "";

            // Check untuk blocked keywords
            for (const keyword of BLOCKED_KEYWORDS) {
              if (src.includes(keyword) || content.includes(keyword)) {
                console.warn(`[SECURITY] Blocked script injection: ${keyword}`);
                node.remove();
                return;
              }
            }

            // Block external scripts yang tidak dikenal
            if (src && !isTrustedSource(src)) {
              console.warn(`[SECURITY] Blocked untrusted script: ${src}`);
              node.remove();
            }
          }

          // Block iframe injection
          if (node instanceof HTMLIFrameElement) {
            const src = node.src?.toLowerCase() || "";
            for (const keyword of BLOCKED_KEYWORDS) {
              if (src.includes(keyword)) {
                console.warn(`[SECURITY] Blocked iframe injection: ${keyword}`);
                node.remove();
                return;
              }
            }
          }
        });
      });
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);
}

/**
 * Check apakah source adalah trusted
 */
function isTrustedSource(src: string): boolean {
  const trustedDomains = [
    window.location.hostname,
    "fonts.googleapis.com",
    "fonts.gstatic.com",
    "cdn.jsdelivr.net",
    // Tambahkan domain trusted lainnya
  ];

  try {
    const url = new URL(src);
    return trustedDomains.some(
      (domain) =>
        url.hostname === domain || url.hostname.endsWith(`.${domain}`),
    );
  } catch {
    return false;
  }
}

/**
 * Hook untuk mendeteksi tampering pada DOM
 */
export function useDOMProtection() {
  useEffect(() => {
    // Simpan state awal dari elemen penting
    const criticalElements = document.querySelectorAll(
      'meta[name="description"], meta[name="keywords"], title, link[rel="canonical"]',
    );

    const originalStates = new Map<Element, string>();
    criticalElements.forEach((el) => {
      originalStates.set(el, el.outerHTML);
    });

    // Observer untuk mendeteksi perubahan
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const target = mutation.target as Element;

        if (originalStates.has(target)) {
          const original = originalStates.get(target);
          const current = target.outerHTML;

          if (original !== current) {
            console.warn("[SECURITY] Critical element tampering detected");
            // Restore original
            const temp = document.createElement("div");
            temp.innerHTML = original!;
            target.replaceWith(temp.firstChild!);
          }
        }
      });
    });

    const head = document.head;
    if (head) {
      observer.observe(head, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      });
    }

    return () => observer.disconnect();
  }, []);
}

/**
 * Hook untuk memblokir DevTools (opsional, untuk production)
 */
export function useDevToolsProtection(enabled: boolean = false) {
  useEffect(() => {
    if (!enabled) return;

    // Deteksi DevTools dengan timing
    const detectDevTools = () => {
      const start = performance.now();
      // debugger; // Uncomment untuk aktifkan (akan memperlambat jika DevTools terbuka)
      const end = performance.now();

      if (end - start > 100) {
        console.warn("[SECURITY] DevTools detected");
        // Lakukan aksi (redirect, clear content, dll)
      }
    };

    const interval = setInterval(detectDevTools, 1000);
    return () => clearInterval(interval);
  }, [enabled]);
}

/**
 * Hook untuk mendeteksi Console tampering
 */
export function useConsoleProtection() {
  useEffect(() => {
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;

    // Override console methods untuk mendeteksi injection
    console.log = function (...args: unknown[]) {
      const content = args.join(" ");
      for (const keyword of BLOCKED_KEYWORDS) {
        if (content.toLowerCase().includes(keyword)) {
          console.warn("[SECURITY] Blocked suspicious console output");
          return;
        }
      }
      originalLog.apply(console, args);
    };

    return () => {
      console.log = originalLog;
      console.warn = originalWarn;
      console.error = originalError;
    };
  }, []);
}

/**
 * Hook untuk clean/sanitize clipboard content
 */
export function useClipboardProtection() {
  const handlePaste = useCallback((e: ClipboardEvent) => {
    const text = e.clipboardData?.getData("text") || "";

    // Check untuk blocked keywords
    for (const keyword of BLOCKED_KEYWORDS) {
      if (text.toLowerCase().includes(keyword)) {
        e.preventDefault();
        console.warn("[SECURITY] Blocked suspicious clipboard content");
        return;
      }
    }

    // Check untuk script tags
    if (/<script|javascript:|on\w+=/i.test(text)) {
      e.preventDefault();
      console.warn("[SECURITY] Blocked script in clipboard");
    }
  }, []);

  useEffect(() => {
    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [handlePaste]);
}
