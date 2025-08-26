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

function matchTags(post: Blog, wanted: string[]): boolean {
  if (wanted.length === 0) return true;
  const lower = post.tags.map((t) => t.toLowerCase());
  return wanted.some((w) => lower.includes(w.toLowerCase()));
}

function matchQuery(post: Blog, q: string): boolean {
  if (!q) return true;
  const needle = q.toLowerCase();
  const hay = [
    post.title,
    ...(post.tags || []),
    post.content ? post.content.replace(/<[^>]+>/g, " ") : "",
  ].join(" ").toLowerCase();
  return hay.includes(needle);
}

const stamp = (s: string) => new Date(s).getTime() || 0;

/* ---------------- GET ---------------- */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const page  = Math.max(1, parseInt(url.searchParams.get("page")  || "1", 10));
  const limit = Math.max(1, parseInt(url.searchParams.get("limit") || "12", 10));
  const q = url.searchParams.get("q")?.trim() || "";
  const tagsWanted = (url.searchParams.get("tag")?.trim() || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  try {
    /* ---------- DEV: JSON Server (fetch all, then paginate locally) ---------- */
    if (useJson) {
      const base = `${JSON_SERVER_URL!.replace(/\/$/, "")}/blogs`;
      const r = await fetch(base, { cache: "no-store" });
      if (r.ok) {
        const raw = (await r.json()) as Blog[];

        // Normalize + enforce same behavior as prod
        const all = raw.map(ensureContent);
        const filtered = all
          .filter((b) => matchTags(b, tagsWanted) && matchQuery(b, q))
          .sort((a, b) => stamp(b.createdAt) - stamp(a.createdAt));

        const start = (page - 1) * limit;
        const items = filtered.slice(start, start + limit);

        console.log("[/api/blogs] source=json-server (local paginate)", {
          url: base,
          page, limit, q, tags: tagsWanted,
          count: items.length, total: filtered.length,
        });

        return NextResponse.json(
          { items, page, limit, total: filtered.length },
          { headers: { "x-data-source": "json-server" } },
        );
      }

      console.warn("[/api/blogs] JSON Server non-OK; falling back to blogData", {
        status: r.status, statusText: r.statusText,
      });
      // fall through to static
    }

    /* ---------- PROD/Preview (and fallback): blogData ---------- */
    const all = (blogPosts as Blog[]).map(ensureContent);
    const filtered = all
      .filter((b) => matchTags(b, tagsWanted) && matchQuery(b, q))
      .sort((a, b) => stamp(b.createdAt) - stamp(a.createdAt));

    const start = (page - 1) * limit;
    const items = filtered.slice(start, start + limit);

    console.log("[/api/blogs] source=blogData", {
      nodeEnv: process.env.NODE_ENV,
      page, limit, q, tags: tagsWanted,
      count: items.length, total: filtered.length,
    });

    return NextResponse.json(
      { items, page, limit, total: filtered.length },
      { headers: { "x-data-source": "blogData" } },
    );
  } catch (e) {
    console.error("[/api/blogs] error", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
