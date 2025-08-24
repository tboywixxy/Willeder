// src/lib/absolute-url.ts
/**
 * Build an absolute URL string for server-side usage.
 * Works at build/ISR/runtime without relying on request headers.
 */
export function absoluteUrl(path = "/"): string {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  const cleanBase = base.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return cleanPath.startsWith("http") ? cleanPath : `${cleanBase}${cleanPath}`;
}
