// src/app/lib/server/blogSource.ts
import { blogPosts } from "@/app/lib/server/blogData";

export type Teaser = { slug: string; title: string; thumbnail: string; createdAt: string };

const JSON_SERVER_URL = process.env.JSON_SERVER_URL;
const useJson = process.env.NODE_ENV !== "production" && !!JSON_SERVER_URL;

const trim = (s: string) => (typeof s === "string" ? s.trim() : s);
const stamp = (s: string) => new Date(s).getTime() || 0;

async function fetchAllFromDev(): Promise<any[]> {
  const base = `${JSON_SERVER_URL!.replace(/\/$/, "")}`;
  // Your dev DB might return either an array or { blogs: [...] }
  const r = await fetch(`${base}/blogs`, { cache: "no-store" });
  if (!r.ok) throw new Error(`Dev fetch failed: ${r.status} ${r.statusText}`);
  const raw = await r.json();
  return Array.isArray(raw) ? raw : Array.isArray(raw?.blogs) ? raw.blogs : [];
}

export async function getLatestTeasers(limit = 3): Promise<Teaser[]> {
  const source = useJson ? await fetchAllFromDev() : ((blogPosts as unknown) as any[]);

  const normalized: Teaser[] = source.map((b) => ({
    slug: trim(b.slug),
    title: b.title,
    thumbnail: b.thumbnail,
    createdAt: b.createdAt,
  }));

  normalized.sort((a, b) => stamp(b.createdAt) - stamp(a.createdAt));
  return normalized.slice(0, limit);
}
