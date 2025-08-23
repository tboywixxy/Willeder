import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import DetailFrame from "../../../../components/blogDetail/DetailFrame";
import DetailBlocks from "../../../../components/blogDetail/DetailBlocks";
import BlogCard from "../../../../components/BlogCard";

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

/* ---------------- Base URL helper ---------------- */

async function baseURL() {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}

/* ---------------- Data fetchers ---------------- */

async function getPost(slug: string): Promise<Blog | null> {
  const base = await baseURL();
  const r = await fetch(`${base}/api/blog/${encodeURIComponent(slug)}`, { cache: "no-store" });
  if (!r.ok) return null;
  return r.json();
}

async function getAll(limit = 9999, q = "", tagCSV = ""): Promise<Blog[]> {
  const base = await baseURL();
  const url = new URL(`${base}/api/blog`);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("page", "1");
  if (q) url.searchParams.set("q", q);
  if (tagCSV) url.searchParams.set("tag", tagCSV);
  const r = await fetch(url.toString(), { next: { revalidate: 60 } });
  if (!r.ok) return [];
  const data = await r.json();
  return (data.items as Blog[]) ?? [];
}

/* ---------------- SEO: generateMetadata ---------------- */

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  try {
    const { slug } = await props.params;
    const post = await getPost(slug);
    if (!post) return { title: "Blog post" };

    const base = await baseURL();
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
      openGraph: {
        type: "article",
        url,
        title,
        description,
        images: [{ url: ogImage }],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage],
      },
    };
  } catch {
    return { title: "Blog post" };
  }
}

/* ---------------- Structured Data (JSON-LD) ---------------- */

function ArticleJsonLd({ post }: { post: Blog }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.createdAt,
    dateModified: post.createdAt,
    image: [post.thumbnail],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `/blog/${post.slug}`,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ---------------- Prev/Next (Prev = just-viewed via ?from) ---------------- */

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
  return (
    <nav
      className="w-full max-w-[1280px] flex items-center justify-between gap-4 px-4 md:px-20"
      aria-label="Blog navigation"
    >
      {prev ? (
        <Link
          href={`/blog/${encodeURIComponent(prev.slug)}?from=${encodeURIComponent(currentSlug)}`}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-black hover:bg-black hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
        >
          <span aria-hidden>←</span>
          <span>Prev</span>
        </Link>
      ) : <span className="opacity-0 select-none">placeholder</span>}

      {next ? (
        <Link
          href={`/blog/${encodeURIComponent(next.slug)}?from=${encodeURIComponent(currentSlug)}`}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-black hover:bg-black hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
        >
          <span>Next</span>
          <span aria-hidden>→</span>
        </Link>
      ) : <span className="opacity-0 select-none">placeholder</span>}
    </nav>
  );
}

/* ---------------- Suggested (center title, see-more bottom-right, pass fromSlug) ---------------- */

function Suggested({
  posts,
  currentSlug,
}: {
  posts: Blog[];
  currentSlug: string;
}) {
  if (!posts.length) return null;

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-20 pt-16 pb-24 space-y-8">
        {/* Centered heading */}
        <div className="mx-auto w-full max-w-[1280px]">
          <h2 className="text-center text-xl md:text-2xl font-semibold">Suggested posts</h2>
        </div>

        <div className="mx-auto w-full max-w-[1280px]">
          <ul
            className="
              grid grid-cols-1
              min-[600px]:grid-cols-2
              min-[1024px]:grid-cols-3
              gap-x-6 gap-y-10
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
                  fromSlug={currentSlug}   // ensure the next page knows the referrer for Prev
                />
              );
            })}
          </ul>

          {/* See more bottom-right */}
          <div className="mt-8 w-full flex justify-end">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-black hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              <span>See more</span>
              <Image src="/images/services/arrow.png" alt="" width={34} height={24} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Page ---------------- */

// Next 15: params/searchParams can be Promises.
export default async function BlogDetailPage(
  props: { params: Promise<{ slug: string }>, searchParams?: Promise<{ from?: string }> }
) {
  const { slug } = await props.params;
  const { from: fromSlug } = (props.searchParams ? await props.searchParams : {}) ?? {};

  const post = await getPost(slug);
  if (!post) return notFound();

  // Load full list (newest → oldest by your API)
  const all = await getAll(9999);

  // Suggestions:
  // - exclude current always
  // - exclude just-viewed (?from=) unless needed to fill
  // - prefer tag overlap, then backfill by recency
  const tagSet = new Set(post.tags);
  const isEligible = (b: Blog) => b.slug !== slug;
  const overlapsTag = (b: Blog) => b.tags.some((t) => tagSet.has(t));

  let related = all.filter((b) => isEligible(b) && b.slug !== fromSlug && overlapsTag(b));
  if (related.length < 3) {
    const fillers = all.filter((b) => isEligible(b) && b.slug !== fromSlug && !overlapsTag(b));
    related = [...related, ...fillers];
  }
  if (related.length < 3 && fromSlug) {
    const fromPost = all.find((b) => b.slug === fromSlug);
    if (fromPost && !related.find((b) => b.slug === fromSlug) && isEligible(fromPost)) {
      related.push(fromPost);
    }
  }
  const suggestions = related.slice(0, 3);

  // NEXT target = first suggested; PREV target = just-viewed (?from)
  const nextTarget = suggestions[0];
  const prevTarget = fromSlug ? all.find((b) => b.slug === fromSlug) : undefined;

  // detail images
  const d = post.detail || {};
  const img1 = d.img1?.src || post.thumbnail;
  const img2 = d.img2?.src || post.thumbnail;
  const img3 = d.img3?.src || post.thumbnail;

  return (
    <div className="bg-[#F1F2F4]">
      {/* JSON-LD */}
      <ArticleJsonLd post={post} />

      <section className="pt-10 md:pt-16">
        <div className="mx-auto w-full max-w-[1440px] px-4 md:px-20">
          <DetailFrame
            title={post.title}
            heroSrc={post.thumbnail}
            heroAlt={post.title}
            date={post.createdAt}
            tags={post.tags}
          >
            <DetailBlocks img1={img1} img2={img2} img3={img3} detail={d} />
          </DetailFrame>

          {/* Prev / Next directly below details */}
          <div className="mt-8 mb-4">
            <PrevNext prev={prevTarget} next={nextTarget} currentSlug={slug} />
          </div>
        </div>
      </section>

      {/* Suggested strip (3 cards + See more) */}
      <Suggested posts={suggestions} currentSlug={slug} />
    </div>
  );
}
