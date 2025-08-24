import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import DetailFrame from "@/components/blogDetail/DetailFrame";
import DetailBlocks from "@/components/blogDetail/DetailBlocks";
import BlogCard from "@/components/BlogCard";
import { jost, notoSansJp } from "@/app/fonts";
import { absoluteUrl } from "@/lib/absolute-url";
import { blogPosts } from "@/app/lib/server/blogData"; // ✅ local data

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

export const revalidate = 60;

// --------- local helpers (no fetch) ----------
async function getAll(): Promise<Blog[]> {
  return blogPosts as unknown as Blog[];
}
async function safeGetPost(slug: string): Promise<Blog | null> {
  const all = await getAll();
  const want = slug.trim().toLowerCase();
  return all.find(b => b.slug.trim().toLowerCase() === want) ?? null;
}

// --------- SEO ----------
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
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

// --------- JSON-LD ----------
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

// --------- Prev/Next/Suggested (unchanged UI) ----------
/* keep your PrevNext and Suggested components exactly as you had them */

// --------- Page ----------
export default async function BlogDetailPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { from?: string };
}) {
  const { slug } = params;
  const fromSlug = searchParams?.from;

  const post = await safeGetPost(slug);
  if (!post) return notFound();

  const all = await getAll();

  // suggestions (same logic you had)
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
      {/* ...keep your exact layout/components as before... */}
      <section className="pt-8 sm:pt-10 md:pt-16">
        {/* DetailFrame + DetailBlocks exactly as you had */}
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

            <div className="flex justify-center">
              {/* reuse your PrevNext component */}
            </div>
          </div>
        </div>
      </section>

      {/* reuse your Suggested component */}
    </div>
  );
}
