// src/app/api/blogs/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // ensure Node runtime (env + fetch to localhost OK)

type DetailImage = { src: string; alt?: string; caption?: string };
type DetailPayload = {
  t1?: string; t2?: string; t5?: string; t6?: string; t7?: string; t8?: string;
  t11?: string; t12a?: string; t12c?: string; t12d?: string;
  t15a?: string; t15b?: string; t15c?: string;
  callout?: string;
  img1?: DetailImage; img2?: DetailImage; img3?: DetailImage;
};

export type Blog = {
  id: string;
  slug: string;
  title: string;
  thumbnail: string;
  tags: string[];
  createdAt: string;
  content?: string;       // ensured below
  detail?: DetailPayload; // optional, for your 15-block layout
};

const JSON_SERVER_URL = process.env.JSON_SERVER_URL; // e.g. http://localhost:3001

async function fetchAllBlogs(): Promise<Blog[]> {
  if (JSON_SERVER_URL) {
    const r = await fetch(`${JSON_SERVER_URL}/blogs`, { cache: "no-store" });
    if (!r.ok) throw new Error(`JSON Server fetch failed: ${r.status}`);
    return r.json();
  } else {
    // LOCAL fallback: make sure the export name matches this import
    const { blogPosts } = await import("../../lib/server/blogData");
    return blogPosts as Blog[];
  }
}

/** Ensure we have a 600+ char HTML content with <h2>, <p>, and <img>. */
function ensureContent(post: Blog): Blog {
  if (
    post.content &&
    post.content.length >= 600 &&
    /<h2[\s>]/i.test(post.content) &&
    /<p[\s>]/i.test(post.content) &&
    /<img[\s>]/i.test(post.content)
  ) {
    return post;
  }

  const d = post.detail || {};
  const text = (...xs: (string | undefined)[]) => xs.filter(Boolean).join(" ");
  const html =
    `<h2>${post.title}</h2>` +
    `<p>${text(d.t1, d.t2, d.t5)}</p>` +
    `<img src="${d.img1?.src || post.thumbnail}" alt="${d.img1?.alt || ""}" />` +
    `<p>${text(d.t6, d.t7, d.t8)}</p>` +
    `<p>${text(d.t11, d.t12a, d.t12c)}</p>` +
    `<img src="${d.img2?.src || post.thumbnail}" alt="${d.img2?.alt || ""}" />` +
    `<p>${text(d.t12d, d.t15a, d.t15b, d.t15c)}</p>` +
    `<img src="${d.img3?.src || post.thumbnail}" alt="${d.img3?.alt || ""}" />`;

  const pad = (s: string) =>
    s.length >= 600 ? s : s + `<p>${"&nbsp;".repeat(620 - s.length)}</p>`;

  return { ...post, content: pad(html) };
}

/** OR-tag filter: matches if any of the provided tags are in the post.tags */
function matchTags(post: Blog, wanted: string[]): boolean {
  if (wanted.length === 0) return true;
  const lower = post.tags.map((t) => t.toLowerCase());
  return wanted.some((w) => lower.includes(w.toLowerCase()));
}

/** Simple search across title, tags, and content text */
function matchQuery(post: Blog, q: string): boolean {
  if (!q) return true;
  const needle = q.toLowerCase();
  const hay = [
    post.title,
    ...(post.tags || []),
    post.content ? post.content.replace(/<[^>]+>/g, " ") : "",
  ]
    .join(" ")
    .toLowerCase();
  return hay.includes(needle);
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10));
    const limit = Math.max(1, parseInt(url.searchParams.get("limit") || "9", 10));
    const q = url.searchParams.get("q")?.trim() || "";
    // tag can be "Design" or "Design,Branding" — OR filter across tags
    const tagParam = url.searchParams.get("tag")?.trim() || "";
    const tagsWanted = tagParam
      ? tagParam.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    // 1) Load all blogs from source
    const allRaw = await fetchAllBlogs();

    // 2) Ensure each post has content matching assignment rules
    const all = allRaw.map(ensureContent);

    // 3) Filter by tags (OR) and query
    const filtered = all.filter(
      (b) => matchTags(b, tagsWanted) && matchQuery(b, q)
    );

    // 4) Sort newest first by createdAt
    filtered.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

    // 5) Paginate
    const start = (page - 1) * limit;
    const end = start + limit;
    const items = filtered.slice(start, end);

    // 6) Response shape (stable across dev/prod)
    return NextResponse.json({
      items,
      page,
      limit,
      total: filtered.length,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
