import Link from "next/link";
import Image from "next/image";
import BlogCard from "./BlogCard";
import { notoSansJp, jost } from "@/app/fonts";

type Teaser = { slug: string; title: string; thumbnail: string; createdAt: string };
type BlogSectionProps = {
  posts: Teaser[];
  displayDates: string[];
  graySets: string[][];
};

export default function BlogSection({ posts, displayDates, graySets }: BlogSectionProps) {
  const count = Math.min(posts.length, displayDates.length, graySets.length);
  const items = posts.slice(0, count);

  const topTextCls  = `${notoSansJp.className} font-bold text-[32px] leading-[150%] tracking-[0.05em] text-center`;
  const mainTextCls = `${jost.className}      font-medium text-[20px] leading-[150%] tracking-[0.05em] text-center`;

  return (
    <section>
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-20 pt-24 pb-40 space-y-16">
        {/* Header */}
        <div className="mx-auto w-full max-w-[1280px] flex flex-col items-center justify-center gap-2">
          <div className={topTextCls}>ブログ</div>
          <div className="w-full flex items-center gap-4">
            <span className="hidden md:block w-[592px] h-px bg-black" aria-hidden />
            <span className="md:hidden flex-1 h-px bg-black" aria-hidden />
            <h2 className={mainTextCls}>BLOG</h2>
            <span className="hidden md:block w-[592px] h-px bg-black" aria-hidden />
            <span className="md:hidden flex-1 h-px bg-black" aria-hidden />
          </div>
        </div>

        {/* Posts */}
        <div className="mx-auto w-full max-w-[1280px]">
          <ul
            className="
              grid
              grid-cols-1
              min-[600px]:grid-cols-2
              /* min-[1025px]:grid-cols-3 */  /* enable if you want 3-up on desktop */
              gap-x-6 gap-y-10
              items-stretch
              mb-8
            "
          >
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

          {/* See more */}
          <div className="mt-8 w-full flex justify-end">
            <Link href="/blog" className="inline-flex items-center gap-2 text-black hover:underline">
              <span>See more</span>
              <Image src="/images/services/arrow.png" alt="" width={34} height={24} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
