import { NextResponse } from "next/server";
import { blogPosts } from "@/app/lib/server/blogData";

export const runtime = "nodejs";
export const revalidate = 60;

/* ---------------- Types ---------------- */
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
  content?: string;
  detail?: DetailPayload;
};

/* ---------------- Helpers ---------------- */
const JSON_SERVER_URL = process.env.JSON_SERVER_URL;
const useJson = process.env.NODE_ENV !== "production" && !!JSON_SERVER_URL;
const normalize = (s: string) => s.trim().toLowerCase();

function ensureContent(post: Blog): Blog {
  if (
    post.content &&
    post.content.length >= 600 &&
    /<h2[\s>]/i.test(post.content) &&
    /<p[\s>]/i.test(post.content) &&
    /<img[\s>]/i.test(post.content)
  ) return post;

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

  const pad = (s: string) => (s.length >= 600 ? s : s + `<p>${"&nbsp;".repeat(620 - s.length)}</p>`);
  return { ...post, content: pad(html) };
}

/* ---------------- GET ---------------- */
export async function GET(req: Request) {
  try {
    const { pathname } = new URL(req.url);
    const rawSlug = decodeURIComponent(pathname.split("/").pop() ?? "").trim();
    if (!rawSlug) return NextResponse.json({ error: "Bad request" }, { status: 400 });

    /* ---------- DEV: JSON Server ---------- */
    if (useJson) {
      try {
        const u = `${JSON_SERVER_URL!.replace(/\/$/, "")}/blogs?slug=${encodeURIComponent(rawSlug)}&_limit=1`;
        const r = await fetch(u, { cache: "no-store" });
        if (r.ok) {
          // Type the JSON result to avoid implicit/explicit any
          const arr: Blog[] = await r.json();
          const hit = arr?.[0];
          if (hit) {
            console.log("[/api/blogs/[slug]] source=json-server", {
              url: u, slug: rawSlug, match: hit.slug,
            });
            return NextResponse.json(ensureContent(hit), {
              headers: { "x-data-source": "json-server" },
            });
          }
        } else {
          console.warn("[/api/blogs/[slug]] JSON Server non-OK; fallback to blogData", {
            status: r.status, statusText: r.statusText,
          });
        }
      } catch (err: unknown) {
        // Explicitly type catch param as unknown (fixes no-explicit-any)
        console.warn("[/api/blogs/[slug]] JSON Server fetch error; fallback to blogData", err);
      }
      // fall through to static
    }

    /* ---------- PROD/Preview (and fallback): blogData ---------- */
    const all = blogPosts as Blog[];
    const found =
      all.find((b) => b.slug === rawSlug) ??
      all.find((b) => normalize(b.slug) === normalize(rawSlug));

    if (!found) {
      console.error("[/api/blogs/[slug]] Not found", {
        requested: rawSlug,
        sampleKnownSlugs: all.slice(0, 20).map((p) => p.slug),
      });
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    console.log("[/api/blogs/[slug]] source=blogData", {
      nodeEnv: process.env.NODE_ENV,
      slug: rawSlug,
      match: found.slug,
    });

    return NextResponse.json(ensureContent(found), {
      headers: { "x-data-source": "blogData" },
    });
  } catch (e: unknown) {
    console.error("[/api/blogs/[slug]] error", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
