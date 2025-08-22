// src/components/BlogSection.tsx
import Link from "next/link";
import Image from "next/image";
import BlogCard from "../components/BlogCard";

type Teaser = {
  slug: string;
  title: string;
  thumbnail: string;
  createdAt: string;
};

type BlogSectionProps = {
  posts: Teaser[];        // exactly 3 for this layout
  displayDates: string[]; // same length as posts
  graySets: string[][];   // each entry is tags-to-gray for that card
};

export default function BlogSection({ posts, displayDates, graySets }: BlogSectionProps) {
  // Safety: align lengths
  const count = Math.min(posts.length, displayDates.length, graySets.length);
  const items = posts.slice(0, count);

  return (
    <section className="">
      {/* Big box: 1440 × 1025 with paddings (pt=96, pr=80, pb=160, pl=80), gap ≈ 64 */}
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-20 pt-24 pb-40 space-y-16">
        {/* Header box: 1280 × 86; GGS centered; BLOG centered with lines */}
        <div className="mx-auto w-full max-w-[1280px] h-auto md:h-[86px] flex flex-col items-center justify-center gap-2">
          <div className="text-sm tracking-widest">GGS</div>
          <div className="w-full flex items-center gap-4">
            <span className="h-px flex-1 bg-black" aria-hidden />
            <h2 className="text-2xl font-semibold">BLOG</h2>
            <span className="h-px flex-1 bg-black" aria-hidden />
          </div>
        </div>

        {/* Posts box: 1280 × 521, exactly 3 posts */}
        <div className="mx-auto w-full max-w-[1280px]">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:h-[521px]">
            {items.map((b, i) => (
              <BlogCard
                key={b.slug}
                slug={b.slug}
                title={b.title}
                thumbnail={b.thumbnail}
                createdAt={b.createdAt}
                variant="showcase"
                displayDate={displayDates[i]}
                grayTags={graySets[i]}
              />
            ))}
          </ul>

          {/* See more (right-aligned, text-only) */}
          <div className="mt-16 w-full flex justify-end">
            <Link href="/blog" className="inline-flex items-center gap-2 text-black hover:underline">
              <span>See more</span>
              <Image
                src="/images/services/arrow.png"  /* consider renaming to arrow-2.png to avoid space */
                alt=""
                width={34}
                height={24}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
