// src/app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import DetailFrame from "@/components/blogDetail/DetailFrame";
import DetailBlocks from "@/components/blogDetail/DetailBlocks";
import { absoluteUrl } from "@/lib/absolute-url";

type DetailImage = { src: string; alt?: string; caption?: string };
type DetailPayload = {
  t1?: string; t2?: string; t5?: string; t6?: string; t7?: string; t8?: string;
  t11?: string; t12a?: string; t12c?: string; t12d?: string;
  t15a?: string; t15b?: string; t15c?: string;
  callout?: string;
  img1?: DetailImage; img2?: DetailImage; img3?: DetailImage;
};

type Blog = {
  id: string | number;
  slug: string;
  title: string;
  thumbnail: string;
  tags: string[];
  createdAt: string;
  content?: string;
  detail?: DetailPayload;
};

export const revalidate = 60; // ISR

/* ---------------- data helpers (use API so dev/prod switches automatically) ---------------- */
async function getAll(limit = 9999): Promise<Blog[]> {
  const api = absoluteUrl(`/api/blogs?limit=${limit}&page=1`);
  const r = await fetch(api, { next: { revalidate: 60 } });
  if (!r.ok) return [];
  const data = await r.json();
  return (data.items as Blog[]) ?? [];
}

async function safeGetPost(slug: string): Promise<Blog | null> {
  const api = absoluteUrl(`/api/blogs/${encodeURIComponent(slug)}`);
  const r = await fetch(api, { next: { revalidate: 60 } });
  if (r.ok) return (await r.json()) as Blog;

  // fallback (case-insensitive) if the slug route returns 404
  const all = await getAll(9999);
  const want = slug.trim().toLowerCase();
  return all.find((b) => b.slug.trim().toLowerCase() === want) ?? null;
}

/* ---------------- SEO ---------------- */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = await safeGetPost(slug);
  if (!post) return { title: "Blog post" };

  const url = absoluteUrl(`/blog/${encodeURIComponent(post.slug)}`);
  const title = post.title || "Blog post";
  const description =
    (post.content?.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() || "").slice(0, 160) ||
    "Blog post";
  const ogImage = post.thumbnail;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title, description, images: [{ url: ogImage }], locale: "en_US" },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

/* ---------------- Page ---------------- */
export default async function BlogDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = await safeGetPost(slug);
  if (!post) return notFound();

  const d = post.detail || {};
  const img1 = d.img1?.src || post.thumbnail;
  const img2 = d.img2?.src || post.thumbnail;
  const img3 = d.img3?.src || post.thumbnail;

  return (
    <div className="bg-[#F1F2F4]">
      <section className="pt-8 sm:pt-10 md:pt-16">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-20">
          <div className="mx-auto w-full max-w-[1280px] flex flex-col gap-[48px] sm:gap-[56px] md:gap-[64px]">
            <DetailFrame
              title={post.title}
              heroSrc={post.thumbnail}
              heroAlt={post.title}
              date={post.createdAt}
              tags={post.tags}
            >
              <DetailBlocks img1={img1} img2={img2} img3={img3} detail={d} />
            </DetailFrame>
          </div>
        </div>
      </section>
    </div>
  );
}
