// src/lib/htmlUtils.ts

/**
 * Extract the first N <img src="..."> URLs from an HTML string.
 * Example: firstImageSrcs(content, 3) → ["url1", "url2", "url3"]
 */
export function firstImageSrcs(html: string, n = 3): string[] {
  const out: string[] = [];
  const re = /<img[^>]+src=['"]([^'"]+)['"][^>]*>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) && out.length < n) {
    out.push(m[1]);
  }
  return out;
}
