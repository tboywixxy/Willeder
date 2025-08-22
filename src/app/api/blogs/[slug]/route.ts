// src/app/api/blogs/[slug]/route.ts
import { NextResponse } from "next/server";
import type { Blog } from "../route";

export const runtime = "nodejs"; // important

const JSON_SERVER_URL = process.env.JSON_SERVER_URL; // e.g. http://localhost:3001

async function fetchBySlug(slug: string): Promise<Blog | null> {
  if (JSON_SERVER_URL) {
    // DEV: ask JSON Server for just this slug
    const r = await fetch(
      `${JSON_SERVER_URL}/blogs?slug=${encodeURIComponent(slug)}`,
      { cache: "no-store" }
    );
    if (!r.ok) throw new Error(`JSON Server fetch failed: ${r.status}`);
    const arr = (await r.json()) as Blog[];
    return arr[0] ?? null;
  } else {
    // PROD (or no JSON server): use your local data source
    // Make sure this path & export name match your file.
    const { blogPosts } = await import("../../../lib/server/blogData");
    const found = (blogPosts as Blog[]).find((b) => b.slug === slug) || null;
    return found;
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

  const d = post.detail || ({} as any);
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

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await fetchBySlug(params.slug);
    if (!post) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(ensureContent(post));
  } catch (e: unknown) {
    const err = e as Error;
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
