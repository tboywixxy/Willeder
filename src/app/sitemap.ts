import type { MetadataRoute } from "next";

type Blog = { slug: string; createdAt: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const r = await fetch(`${base}/api/blog?limit=9999&page=1`, { cache: "no-store" });
  const data = await r.json().catch(() => ({ items: [] as Blog[] }));
  const items: Blog[] = data.items || [];

  const blogs: MetadataRoute.Sitemap = items.map((b) => ({
    url: `${base}/blog/${encodeURIComponent(b.slug)}`,
    lastModified: new Date(b.createdAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    ...blogs,
  ];
}
