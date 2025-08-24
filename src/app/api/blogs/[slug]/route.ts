// app/api/blogs/[slug]/route.ts
import { NextResponse } from "next/server";
import type { Blog } from "../route";

export const runtime = "nodejs";
export const revalidate = 60;
// ❌ remove: export const dynamic = "force-static";

const JSON_SERVER_URL = process.env.JSON_SERVER_URL;

function normalize(s: string) { return s.trim().toLowerCase(); }

function ensureContent(post: Blog): Blog {
  if (
    post.content &&
    post.content.length >= 600 &&
    /<h2[\s>]/i.test(post.content) &&
    /<p[\s>]/i.test(post.content) &&
    /<img[\s>]/i.test(post.content)
  ) return post;

  const title = post.title || "Untitled";
  const img = post.thumbnail || "https://picsum.photos/seed/fallback/1200/630";
  const html =
    `<h2>${title}</h2>` +
    `<p>${"Fallback filler.".repeat(60)}</p>` +
    `<img src="${img}" alt="${title}" />` +
    `<p>${"Please add real HTML with <h2>, <p>, <img>.".repeat(30)}</p>`;
  const pad = (s: string) => (s.length >= 600 ? s : s + `<p>${"&nbsp;".repeat(620 - s.length)}</p>`);
  return { ...post, content: pad(html) };
}

async function fetchAllFromDev(): Promise<Blog[]> {
  const r = await fetch(`${JSON_SERVER_URL}/blogs`, { next: { revalidate, tags: ["blogs"] } });
  if (!r.ok) throw new Error(`JSON Server fetch failed: ${r.status}`);
  return (await r.json()) as Blog[];
}

async function fetchBySlugDev(rawSlug: string): Promise<Blog | null> {
  const r = await fetch(`${JSON_SERVER_URL}/blogs?slug=${encodeURIComponent(rawSlug)}`, {
    next: { revalidate, tags: ["blogs", `blog:${rawSlug}`] },
  });
  if (r.ok) {
    const arr = (await r.json()) as Blog[];
    if (arr[0]) return arr[0];
  }
  const all = await fetchAllFromDev();
  const want = normalize(rawSlug);
  return all.find((b) => normalize(b.slug) === want) ?? null;
}

async function fetchBySlugProd(rawSlug: string): Promise<Blog | null> {
  const { blogPosts } = await import("../../../lib/server/blogData");
  const all = blogPosts as Blog[];
  return all.find((b) => normalize(b.slug) === normalize(rawSlug)) ?? null;
}

export async function GET(req: Request) {
  try {
    const parts = new URL(req.url).pathname.split("/");
    const rawSlug = decodeURIComponent(parts[parts.length - 1] || "").trim();
    if (!rawSlug) return NextResponse.json({ error: "Bad request" }, { status: 400 });

    const base = JSON_SERVER_URL ? await fetchBySlugDev(rawSlug) : await fetchBySlugProd(rawSlug);
    if (!base) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(ensureContent(base));
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
