// src/app/lib/server/blogSource.ts
import { blogPosts } from "@/app/lib/server/blogData";

export type Teaser = {
  slug: string;
  title: string;
  thumbnail: string;
  createdAt: string;
};

type Blog = {
  id: string | number;
  slug: string;
  title: string;
  thumbnail: string;
  tags: string[];
  createdAt: string;
  content?: string;
  detail?: unknown;
};

const JSON_SERVER_URL = process.env.JSON_SERVER_URL;
const useJson =
  process.env.NODE_ENV !== "production" &&
  typeof JSON_SERVER_URL === "string" &&
  JSON_SERVER_URL.length > 0;

/* ---------------- Type guards ---------------- */

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function isBlogLike(v: unknown): v is Blog {
  if (!isRecord(v)) return false;

  const hasId = typeof v.id === "string" || typeof v.id === "number";
  const hasSlug = typeof v.slug === "string";
  const hasTitle = typeof v.title === "string";
  const hasThumb = typeof v.thumbnail === "string";
  const hasCreated = typeof v.createdAt === "string";
  const hasTags = Array.isArray(v.tags) && v.tags.every((t) => typeof t === "string");

  return hasId && hasSlug && hasTitle && hasThumb && hasCreated && hasTags;
}

/* ---------------- Dev fetch (JSON Server) ---------------- */

async function fetchAllFromDev(): Promise<Blog[]> {
  if (!JSON_SERVER_URL) return [];
  const base = JSON_SERVER_URL.replace(/\/$/, "");
  const r = await fetch(`${base}/blogs`, { cache: "no-store" });
  if (!r.ok) throw new Error(`Dev fetch failed: ${r.status} ${r.statusText}`);

  const raw: unknown = await r.json();

  // Accept either an array or an object with { blogs: [...] }
  const maybeArray: unknown =
    Array.isArray(raw) ? raw : isRecord(raw) && Array.isArray(raw.blogs) ? raw.blogs : [];

  const arr = (maybeArray as unknown[]).filter(isBlogLike) as Blog[];
  return arr;
}

/* ---------------- Normalize + export ---------------- */

function normalizeToTeaser(b: Blog): Teaser {
  return {
    slug: String(b.slug).trim(),
    title: b.title,
    thumbnail: b.thumbnail,
    createdAt: b.createdAt,
  };
}

const stamp = (s: string): number => {
  const n = Date.parse(s);
  return Number.isNaN(n) ? 0 : n;
};

export async function getLatestTeasers(limit = 3): Promise<Teaser[]> {
  let sourceBlogs: Blog[];

  if (useJson) {
    sourceBlogs = await fetchAllFromDev();
  } else {
    // blogPosts is untyped; treat as unknown and refine via the guard to avoid 'any'
    const staticUnknown: unknown = blogPosts;
    const staticArray: unknown[] = Array.isArray(staticUnknown) ? staticUnknown : [];
    sourceBlogs = staticArray.filter(isBlogLike) as Blog[];
  }

  const teasers = sourceBlogs
    .map(normalizeToTeaser)
    .sort((a, b) => stamp(b.createdAt) - stamp(a.createdAt))
    .slice(0, limit);

  return teasers;
}
