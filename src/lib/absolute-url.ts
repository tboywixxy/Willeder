// src/lib/absolute-url.ts
import { headers as nextHeaders } from "next/headers";

/**
 * Build an absolute URL from a path. Sync on purpose.
 * Safe during SSR/build (falls back to env).
 */
export function absoluteUrl(path = "/"): string {
  // Public fallback for places where request headers are unavailable
  const publicBase =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  try {
    // Only works during an actual request
    const h = nextHeaders(); // <-- NO await
    const proto = h.get("x-forwarded-proto") ?? "https";
    const host =
      h.get("x-forwarded-host") ??
      h.get("host") ??
      (process.env.VERCEL_URL ? process.env.VERCEL_URL : "localhost:3000");

    const base = `${proto}://${host}`;
    return new URL(path, base).toString();
  } catch {
    // e.g. during build or outside request context
    return new URL(path, publicBase).toString();
  }
}
