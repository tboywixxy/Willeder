// app/blog/[slug]/page.tsx
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

/* data helpers */
async function getAll(limit = 9999): Promise<Blog[]> {
  const r = await fetch(absoluteUrl(`/api/blogs?limit=${limit}&page=1`), { cache: "no-store" });
  if (!r.ok) return [];
  const data = await r.json();
  return (data.items as Blog[]) ?? [];
}

async function safeGetPost(slug: string): Promise<Blog | null> {
  const r = await fetch(absoluteUrl(`/api/blogs/${encodeURIComponent(slug)}`), { cache: "no-store" });
  if (r.ok) return (await r.json()) as Blog;

  const all = await getAll(9999);
  const want = slug.trim().toLowerCase();
  return all.find((b) => b.slug.trim().toLowerCase() === want) ?? null;
}

/* SEO */
export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  try {
    const { slug } = await props.params;
    const post = await safeGetPost(slug);
    if (!post) return { title: "Blog post" };

    const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const url = `${base}/blog/${encodeURIComponent(post.slug)}`;
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

/* JSON-LD */
function ArticleJsonLd({ post }: { post: Blog }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.createdAt,
    dateModified: post.createdAt,
    image: [post.thumbnail],
    mainEntityOfPage: { "@type": "WebPage", "@id": `/blog/${post.slug}` },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

/* Prev/Next */
function ArrowIcon({ direction = "right", className = "" }: { direction?: "left" | "right"; className?: string }) {
  return (
    <svg
      width="7.36" height="12.73" viewBox="0 0 7.3638 12.728" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${direction === "left" ? "rotate-180" : ""} ${className}`}
      aria-hidden="true"
    >
      <polyline points="1,1 6.3638,6.364 1,11.728" stroke="#AD002D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PrevNext({ prev, next, currentSlug }: { prev?: Blog; next?: Blog; currentSlug: string }) {
  if (!prev && !next) return null;
  const textCls = `${jost.className} font-medium text-[14px] sm:text-[16px] leading-[150%] tracking-[0.05em] text-center`;
  return (
    <nav className="w-full flex justify-center" aria-label="Blog navigation">
      <div className="flex items-center justify-center gap-[10px] min-h-8">
        {prev ? (
          <Link href={`/blog/${encodeURIComponent(prev.slug)}?from=${encodeURIComponent(currentSlug)}`} className="inline-flex h-8 items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-black">
            <ArrowIcon direction="left" />
            <span className={textCls}>Prev</span>
          </Link>
        ) : (
          <span className="inline-flex h-8 items-center gap-2 opacity-40"><ArrowIcon direction="left" /><span className={textCls}>Prev</span></span>
        )}

        <span className="inline-flex items-center justify-center w-8 h-8 p-1">
          <Image src={CENTER_ICON_SRC} alt="" width={32} height={32} className="w-8 h-8" />
        </span>

        {next ? (
          <Link href={`/blog/${encodeURIComponent(next.slug)}?from=${encodeURIComponent(currentSlug)}`} className="inline-flex h-8 items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-black">
            <span className={textCls}>Next</span>
            <ArrowIcon direction="right" />
          </Link>
        ) : (
          <span className="inline-flex h-8 items-center gap-2 opacity-40"><span className={textCls}>Next</span><ArrowIcon direction="right" /></span>
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

  // Mobile-only frame: exact size + borders; disabled ≥600
  const mobileCardFrame =
    "mx-auto w-[343px] h-[470.25px] max-w-[420px] rounded-[16px] " +
    "border-l-[4px] border-r-[4px] border-black " +
    "min-[600px]:w-auto min-[600px]:h-auto min-[600px]:border-0";

  return (
    <section className="w-full" aria-labelledby="suggested-heading">
      {/* Page wrapper (safe gutter). Keep, but don’t let it change inner widths */}
      <div className="mx-auto w-full max-w-[1440px] px-[clamp(16px,calc(100vw/1440*20),20px)]">
        {/* Inner: hard-center + exact widths; box-border so width INCLUDES padding */}
        <div
          className="
            mx-auto w-full box-border
            max-w-[343px]               /* 375–599  */
            min-[600px]:max-w-[720px]   /* 600–1023 */
            min-[1024px]:max-w-[1280px] /* ≥1024    */

            /* vertical rhythm via clamp (CLS-safe) */
            pt-[clamp(24px,calc(100vw/1440*32),32px)]
            pb-[clamp(24px,calc(100vw/1440*48),48px)]

            /* IMPORTANT: no horizontal padding at 600–1023,
               so total width never exceeds 720 */
            px-[clamp(12px,calc(100vw/1440*16),16px)]
            min-[600px]:px-0
            min-[1024px]:px-0

            space-y-[clamp(16px,calc(100vw/1440*24),24px)]
          "
        >
          <div className="w-full">
            <h2 id="suggested-heading" className={headingCls}>
              Suggested posts
            </h2>
          </div>

          {/* Centered grid; cards centered in their cells */}
          <ul
            className="
              grid
              grid-cols-1
              min-[600px]:grid-cols-2
              min-[1024px]:grid-cols-3
              gap-y-[clamp(16px,calc(100vw/1440*24),24px)]
              gap-x-[clamp(12px,calc(100vw/1440*24),24px)]
              justify-center
              justify-items-center
            "
            aria-label="More posts you might like"
          >
            {posts.slice(0, 3).map((b) => {
              const grayTags = FIXED_TAGS.filter(
                (t) => !b.tags.some((x) => x.toLowerCase() === t.toLowerCase())
              );
              return (
                <li key={b.slug} className="w-full flex justify-center">
                  <BlogCard
                    slug={b.slug}
                    title={b.title}
                    thumbnail={b.thumbnail}
                    createdAt={b.createdAt}
                    variant="showcase"
                    grayTags={grayTags}
                    fromSlug={currentSlug}
                    className={mobileCardFrame}
                  />
                </li>
              );
            })}

            {/* Optional 4th fills a 2×2 at 600–1023 */}
            {posts[3] && (
              <li className="hidden min-[600px]:flex min-[1024px]:hidden w-full justify-center">
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
                  className={mobileCardFrame}
                />
              </li>
            )}
          </ul>

          <div className="mt-[clamp(16px,calc(100vw/1440*24),24px)] w-full flex justify-end">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-black hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
              aria-label="See more blog posts"
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




/* Page */
export default async function BlogDetailPage(
  props: { params: Promise<{ slug: string }>; searchParams?: Promise<{ from?: string }> }
) {
  const { slug } = await props.params;
  const { from: fromSlug } = (props.searchParams ? await props.searchParams : {}) ?? {};

  const post = await safeGetPost(slug);
  if (!post) return notFound();

  const all = await getAll(9999);

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
    if (fromPost && !related.find((b) => b.slug === fromSlug) && isEligible(fromPost)) related.push(fromPost);
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

      <section className="pt-[clamp(32px,calc(100vw/1440*64),64px)]">
        <div className="mx-auto w-full max-w-[1440px] px-[clamp(16px,calc(100vw/1440*80),80px)]">
          <div className="mx-auto w-full max-w-[1280px] flex flex-col gap-[clamp(40px,calc(100vw/1440*64),64px)]">
            <DetailFrame
              title={post.title}
              heroSrc={post.thumbnail}
              heroAlt={post.title}
              date={post.createdAt}
              tags={post.tags}
            >
              <DetailBlocks img1={img1} img2={img2} img3={img3} detail={d} />
            </DetailFrame>

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
