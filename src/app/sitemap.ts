import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/absolute-url";

type Blog = { slug: string; createdAt: string };

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const envBase =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  const base = envBase.replace(/\/$/, "");

  const api = absoluteUrl("/api/blogs?limit=9999&page=1");
  const r = await fetch(api, { next: { revalidate: 3600 } }).catch(() => undefined);

  const data = (await r?.json().catch(() => undefined)) as { items?: Blog[] } | undefined;
  const items: Blog[] = data?.items ?? [];

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
