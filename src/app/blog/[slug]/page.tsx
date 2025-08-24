import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DetailFrame from "@/components/blogDetail/DetailFrame";
import DetailBlocks from "@/components/blogDetail/DetailBlocks";
import BlogCard from "@/components/BlogCard";
import { absoluteUrl } from "@/lib/absolute-url";
import { blogPosts } from "@/app/lib/server/blogData"; // fallback only

export const revalidate = 60;
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
  createdAt: string; // YYYY-MM-DD
  content?: string;
  detail?: DetailPayload;
};

const ALL_TAGS = ["IT Consulting", "Engineering", "Branding", "Design", "Other"];
const normalize = (s: string) => s.trim().toLowerCase();
const stamp = (s: string) => new Date(s).getTime() || 0;

/* ---------------- Data (API-first; blogData fallback) ---------------- */

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
  const viaApi = await getPostFromApi(slug);
  if (viaApi) return viaApi;

  const list = blogPosts as Blog[];
  return (
    list.find((b) => b.slug === slug) ??
    list.find((b) => normalize(b.slug) === normalize(slug)) ??
    null
  );
}

async function getAllSorted(): Promise<Blog[]> {
  const all = (await getAllFromApi()) ?? (blogPosts as Blog[]);
  return [...all].sort((a, b) => stamp(b.createdAt) - stamp(a.createdAt));
}

async function getPrevNext(currentSlug: string): Promise<{ prev?: Blog; next?: Blog }> {
  const all = await getAllSorted();
  const idx = all.findIndex((b) => normalize(b.slug) === normalize(currentSlug));
  if (idx === -1) return {};
  // Sorted newest→oldest. “Prev” = newer (index-1), “Next” = older (index+1)
  const prev = idx > 0 ? all[idx - 1] : undefined;
  const next = idx < all.length - 1 ? all[idx + 1] : undefined;
  return { prev, next };
}

async function getSuggestions(current: Blog, fromSlug?: string): Promise<Blog[]> {
  const all = await getAllSorted();
  const tagSet = new Set(current.tags.map((t) => t.toLowerCase()));
  const isEligible = (b: Blog) =>
    b.slug !== current.slug && (!fromSlug || b.slug !== fromSlug);

  const overlapsTag = (b: Blog) =>
    (b.tags || []).some((t) => tagSet.has(t.toLowerCase()));

  let related = all.filter((b) => isEligible(b) && overlapsTag(b));
  if (related.length < 3) {
    const fillers = all.filter((b) => isEligible(b) && !overlapsTag(b));
    related = [...related, ...fillers];
  }
  return related.slice(0, 3); // ← exactly 3
}

/* ---------------- SEO ---------------- */

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
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

/* ---------------- Page ---------------- */

export default async function BlogDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ from?: string }>;
}) {
  const { slug } = await params;
  const fromSlug = (await searchParams)?.from;

  const post = await getPost(slug);
  if (!post) return notFound();

  const d = post.detail || {};
  const img1 = d.img1?.src || post.thumbnail;
  const img2 = d.img2?.src || post.thumbnail;
  const img3 = d.img3?.src || post.thumbnail;

  const [{ prev, next }, suggestions] = await Promise.all([
    getPrevNext(post.slug),
    getSuggestions(post, fromSlug),
  ]);

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

            {/* Prev / Next */}
            {(prev || next) && (
              <nav
                aria-label="Post pagination"
                className="
                  grid gap-4
                  grid-cols-1 min-[600px]:grid-cols-2
                "
              >
                {/* Prev (newer) on the left */}
                <div className="min-h-[44px]">
                  {prev && (
                    <Link
                      href={`/blog/${encodeURIComponent(prev.slug)}?from=${encodeURIComponent(post.slug)}`}
                      className="group inline-flex items-center gap-3 text-black hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                    >
                      <span aria-hidden>←</span>
                      <span className="truncate">Previous: {prev.title}</span>
                    </Link>
                  )}
                </div>

                {/* Next (older) on the right */}
                <div className="min-h-[44px] text-left min-[600px]:text-right">
                  {next && (
                    <Link
                      href={`/blog/${encodeURIComponent(next.slug)}?from=${encodeURIComponent(post.slug)}`}
                      className="group inline-flex items-center gap-3 text-black hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                    >
                      <span className="truncate">Next: {next.title}</span>
                      <span aria-hidden>→</span>
                    </Link>
                  )}
                </div>
              </nav>
            )}

            {/* Suggested (exactly 3) */}
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
                        // grey-out tags not on the current post
                        grayTags={ALL_TAGS.filter(
                          (t) =>
                            !post.tags.map((x) => x.toLowerCase()).includes(t.toLowerCase())
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
