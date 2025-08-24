// src/app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DetailFrame from "@/components/blogDetail/DetailFrame";
import DetailBlocks from "@/components/blogDetail/DetailBlocks";
import BlogCard from "@/components/BlogCard";
import { absoluteUrl } from "@/lib/absolute-url";
import { blogPosts } from "@/app/lib/server/blogData"; // fallback only

export const revalidate = 60;
// Force runtime rendering so Vercel doesn’t try to pre-generate unknown slugs
export const dynamic = "force-dynamic";

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

// --- helpers ---
const normalize = (s: string) => s.trim().toLowerCase();

async function resolve<T>(v: T | Promise<T>): Promise<T> {
  return Promise.resolve(v);
}

async function getPostFromApi(slug: string): Promise<Blog | null> {
  const api = absoluteUrl(`/api/blogs/${encodeURIComponent(slug)}`);
  try {
    const r = await fetch(api, { cache: "no-store" });
    if (!r.ok) return null;
    return (await r.json()) as Blog;
  } catch {
    return null;
  }
}

async function getAllFromApi(): Promise<Blog[] | null> {
  const api = absoluteUrl(`/api/blogs?limit=9999&page=1`);
  try {
    const r = await fetch(api, { cache: "no-store" });
    if (!r.ok) return null;
    const data = (await r.json()) as { items?: Blog[] };
    return data.items ?? null;
  } catch {
    return null;
  }
}

async function getPost(slug: string): Promise<Blog | null> {
  // 1) Try API (dev: JSON Server; prod: blogData via route)
  const viaApi = await getPostFromApi(slug);
  if (viaApi) return viaApi;

  // 2) Fallback to local blogData (safety)
  const found =
    (blogPosts as Blog[]).find((b) => b.slug === slug) ??
    (blogPosts as Blog[]).find((b) => normalize(b.slug) === normalize(slug));
  return found ?? null;
}

async function getSuggestions(current: Blog, fromSlug?: string): Promise<Blog[]> {
  // 1) Try API for all, then derive suggestions locally
  const all = (await getAllFromApi()) ?? (blogPosts as Blog[]);
  const tagSet = new Set(current.tags.map((t) => t.toLowerCase()));
  const isEligible = (b: Blog) =>
    b.slug !== current.slug && (!fromSlug || b.slug !== fromSlug);

  const overlapsTag = (b: Blog) =>
    (b.tags || []).some((t) => tagSet.has(t.toLowerCase()));

  let related = all.filter((b) => isEligible(b) && overlapsTag(b));
  if (related.length < 4) {
    const fillers = all.filter((b) => isEligible(b) && !overlapsTag(b));
    related = [...related, ...fillers];
  }
  return related.slice(0, 4);
}

// --- SEO ---
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getPost(slug));
  if (!post) return { title: "Blog post" };

  const url = absoluteUrl(`/blog/${encodeURIComponent(post.slug)}`);
  const title = post.title || "Blog post";
  const description =
    (post.content?.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() || "").slice(0, 160) ||
    "Blog post";

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: [{ url: post.thumbnail }],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [post.thumbnail],
    },
  };
}

// --- Page ---
export default async function BlogDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }> | { slug: string };
  searchParams?: Promise<{ from?: string }> | { from?: string };
}) {
  const { slug } = await resolve(params as any);
  const fromSlug = (await resolve(searchParams ?? ({} as any)))?.from;

  const post = await getPost(slug);
  if (!post) return notFound();

  const d = post.detail || {};
  const img1 = d.img1?.src || post.thumbnail;
  const img2 = d.img2?.src || post.thumbnail;
  const img3 = d.img3?.src || post.thumbnail;

  const suggestions = await getSuggestions(post, fromSlug);

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

            {/* Suggested posts */}
            {suggestions.length > 0 && (
              <section aria-labelledby="suggested-heading" className="pb-16">
                <h2 id="suggested-heading" className="sr-only">
                  Suggested posts
                </h2>
                <ul
                  className="
                    grid gap-6
                    grid-cols-1 min-[600px]:grid-cols-2 min-[1025px]:grid-cols-3
                  "
                >
                  {suggestions.map((b) => (
                    <li key={b.slug}>
                      <BlogCard
                        slug={b.slug}
                        title={b.title}
                        thumbnail={b.thumbnail}
                        createdAt={b.createdAt}
                        variant="showcase"
                        // gray out tags that are NOT in current post
                        grayTags={["IT Consulting","Engineering","Branding","Design","Other"].filter(
                          (t) => !post.tags.map((x) => x.toLowerCase()).includes(t.toLowerCase())
                        )}
                        fromSlug={post.slug}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
