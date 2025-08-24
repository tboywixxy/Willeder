export function firstImageSrcs(html: string, n = 3): string[] {
  const out: string[] = [];
  const re = /<img[^>]+src=['"]([^'"]+)['"][^>]*>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) && out.length < n) {
    out.push(m[1]);
  }
  return out;
}
