// src/app/sitemap.ts
import type { MetadataRoute } from "next";

type Blog = { slug: string; createdAt: string };

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  const root = base.replace(/\/$/, "");

  // Use your API so dev/prod share the same contract
  let items: Blog[] = [];
  try {
    const r = await fetch(`${root}/api/blogs?limit=9999&page=1`, { next: { revalidate: 3600 } });
    const data = (await r.json()) as { items?: Blog[] };
    items = data.items ?? [];
  } catch {}

  const blogs: MetadataRoute.Sitemap = items.map((b) => ({
    url: `${root}/blog/${encodeURIComponent(b.slug)}`,
    lastModified: new Date(b.createdAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    { url: `${root}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${root}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${root}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    ...blogs,
  ];
}
