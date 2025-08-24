import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import DetailFrame from "../../../../components/blogDetail/DetailFrame";
import DetailBlocks from "../../../../components/blogDetail/DetailBlocks";
import BlogCard from "../../../../components/BlogCard";
import { jost, notoSansJp } from "@/app/fonts";
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

const FIXED_TAGS = ["IT Consulting", "Engineering", "Branding", "Design", "Other"];
const CENTER_ICON_SRC = "/blog-list.png";

export const revalidate = 60; // ISR for this page

/* ---------------- data helpers ---------------- */
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

  const all = await getAll(9999);
  const want = slug.trim().toLowerCase();
  return all.find((b) => b.slug.trim().toLowerCase() === want) ?? null;
}

/* ---------------- SEO ---------------- */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  try {
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
  } catch {
    return { title: "Blog post" };
  }
}

/* ---------------- JSON-LD ---------------- */
function ArticleJsonLd({ post }: { post: Blog }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.createdAt,
    dateModified: post.createdAt,
    image: [post.thumbnail],
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(`/blog/${post.slug}`) },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

/* ---------------- Arrow Icon ---------------- */
function ArrowIcon({
  direction = "right" as "left" | "right",
  className = "",
}: {
  direction?: "left" | "right";
  className?: string;
}) {
  return (
    <svg
      width="7.3638"
      height="12.728"
      viewBox="0 0 7.3638 12.728"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${direction === "left" ? "rotate-180" : ""} ${className}`}
      aria-hidden="true"
    >
      <polyline
        points="1,1 6.3638,6.364 1,11.728"
        stroke="#AD002D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------------- Prev/Next ---------------- */
function PrevNext({
  prev,
  next,
  currentSlug,
}: {
  prev?: Blog;
  next?: Blog;
  currentSlug: string;
}) {
  if (!prev && !next) return null;

  const textCls = `${jost.className} font-medium text-[14px] sm:text-[16px] leading-[150%] tracking-[0.05em] text-center`;

  return (
    <nav className="w-full flex justify-center" aria-label="Blog navigation">
      <div className="flex items-center justify-center gap-[10px] min-h-8">
        {prev ? (
          <Link
            href={`/blog/${encodeURIComponent(prev.slug)}?from=${encodeURIComponent(currentSlug)}`}
            className="inline-flex h-8 items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
          >
            <ArrowIcon direction="left" />
            <span className={textCls}>Prev</span>
          </Link>
        ) : (
          <span className="inline-flex h-8 items-center gap-2 opacity-40">
            <ArrowIcon direction="left" />
            <span className={textCls}>Prev</span>
          </span>
        )}

        <span className="inline-flex items-center justify-center w-8 h-8 p-1">
          <Image src="/blog-list.png" alt="" width={32} height={32} className="w-8 h-8" />
        </span>

        {next ? (
          <Link
            href={`/blog/${encodeURIComponent(next.slug)}?from=${encodeURIComponent(currentSlug)}`}
            className="inline-flex h-8 items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
          >
            <span className={textCls}>Next</span>
            <ArrowIcon direction="right" />
          </Link>
        ) : (
          <span className="inline-flex h-8 items-center gap-2 opacity-40">
            <span className={textCls}>Next</span>
            <ArrowIcon direction="right" />
          </span>
        )}
      </div>
    </nav>
  );
}

/* ---------------- Suggested ---------------- */
function Suggested({ posts, currentSlug }: { posts: Blog[]; currentSlug: string }) {
  if (!posts.length) return null;

  const headingCls = `${notoSansJp.className} font-bold text-[20px] sm:text-[24px] leading-[150%] tracking-[0.05em] text-center break-words hyphens-auto`;
  const seeMoreTextCls = `${notoSansJp.className} font-bold text-[18px] sm:text-[20px] leading-[150%] tracking-[0.05em] align-middle`;

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-20 pt-12 md:pt-16 pb-16 md:pb-24 space-y-8">
        <div className="mx-auto w-full max-w-[1280px]">
          <h2 className={headingCls}>Suggested posts</h2>
        </div>

        <div className="mx-auto w-full max-w-[1280px]">
          <ul
            className="
              grid grid-cols-1
              min-[600px]:grid-cols-2
              min-[1024px]:grid-cols-3
              gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-10
              items-stretch
            "
          >
            {posts.slice(0, 3).map((b) => {
              const grayTags = FIXED_TAGS.filter(
                (t) => !b.tags.some((x) => x.toLowerCase() === t.toLowerCase())
              );
              return (
                <BlogCard
                  key={b.slug}
                  slug={b.slug}
                  title={b.title}
                  thumbnail={b.thumbnail}
                  createdAt={b.createdAt}
                  variant="showcase"
                  grayTags={grayTags}
                  fromSlug={currentSlug}
                />
              );
            })}

            {posts[3] && (
              <BlogCard
                key={`extra-${posts[3].slug}`}
                slug={posts[3].slug}
                title={posts[3].title}
                thumbnail={posts[3].thumbnail}
                createdAt={posts[3].createdAt}
                variant="showcase"
                grayTags={FIXED_TAGS.filter(
                  (t) => !posts[3].tags.some((x) => x.toLowerCase() === t.toLowerCase())
                )}
                fromSlug={currentSlug}
                className="hidden min-[600px]:block min-[1024px]:hidden"
              />
            )}
          </ul>

          <div className="mt-6 sm:mt-8 w-full flex justify-end">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-black hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              <span className={seeMoreTextCls}>See more</span>
              <Image src="/images/services/arrow.png" alt="" width={34} height={24} className="w-[34px] h-[24px]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Page ---------------- */
export default async function BlogDetailPage(
  {
    params,
    searchParams,
  }: {
    params: Promise<{ slug: string }>;
    searchParams?: Promise<{ from?: string }>;
  }
) {
  const { slug } = await params;
  const fromSlug = searchParams ? (await searchParams).from : undefined;

  const post = await safeGetPost(slug);
  if (!post) return notFound();

  const all = await getAll(9999);

  // build up to 4 suggestions to support 2×2 at 600–1024px
  const tagSet = new Set(post.tags);
  const isEligible = (b: Blog) => b.slug !== post.slug;
  const overlapsTag = (b: Blog) => b.tags.some((t) => tagSet.has(t));
  let related = all.filter((b) => isEligible(b) && b.slug !== fromSlug && overlapsTag(b));
  if (related.length < 4) {
    const fillers = all.filter((b) => isEligible(b) && b.slug !== fromSlug && !overlapsTag(b));
    related = [...related, ...fillers];
  }
  if (related.length < 4 && fromSlug) {
    const fromPost = all.find((b) => b.slug === fromSlug);
    if (fromPost && !related.find((b) => b.slug === fromSlug) && isEligible(fromPost)) {
      related.push(fromPost);
    }
  }
  const suggestions = related.slice(0, 4);

  const nextTarget = suggestions[0];
  const prevTarget = fromSlug ? all.find((b) => b.slug === fromSlug) : undefined;

  const d = post.detail || {};
  const img1 = d.img1?.src || post.thumbnail;
  const img2 = d.img2?.src || post.thumbnail;
  const img3 = d.img3?.src || post.thumbnail;

  return (
    <div className="bg-[#F1F2F4]">
      <ArticleJsonLd post={post} />

      {/* Outer wrapper */}
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

            {/* Prev/Next centered and OUTSIDE white card */}
            <div className="flex justify-center">
              <PrevNext prev={prevTarget} next={nextTarget} currentSlug={post.slug} />
            </div>
          </div>
        </div>
      </section>

      <Suggested posts={suggestions} currentSlug={post.slug} />
    </div>
  );
}
