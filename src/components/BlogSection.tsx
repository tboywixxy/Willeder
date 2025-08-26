import Link from "next/link";
import Image from "next/image";
import BlogCard from "./BlogCard";
import { notoSansJp, jost } from "@/app/fonts";

type Teaser = { slug: string; title: string; thumbnail: string; createdAt: string };

export type BlogSectionProps = {
  posts: Teaser[];
  /** Optional; if omitted, we derive from createdAt as YYYY.MM.DD */
  displayDates?: string[];
  /** Optional; if omitted, all tags render black */
  graySets?: string[][];
};

function formatDotDate(input: string) {
  return input.includes("-") ? input.replaceAll("-", ".") : input;
}

export default function BlogSection({
  posts,
  displayDates,
  graySets,
}: BlogSectionProps) {
  // Normalize optional arrays to safe, per-post values
  const _displayDates =
    displayDates?.length === posts.length
      ? displayDates
      : posts.map((p) => formatDotDate(p.createdAt));

  const _graySets =
    graySets?.length === posts.length
      ? graySets
      : posts.map(() => [] as string[]);

  const topTextCls =
    `${notoSansJp.className} font-bold text-[32px] leading-[150%] tracking-[0.05em] text-center`;
  const mainTextCls =
    `${jost.className} font-medium text-[17px] leading-[150%] tracking-[0.05em] text-center`;

  return (
    <section>
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-19 pt-22 pb-55 space-y-15">
        {/* Header */}
        <div className="mx-auto w-full max-w-[1280px] flex flex-col items-center justify-center gap-1.5">
          <div className={topTextCls}>ブログ</div>
          <div className="w-full flex items-center gap-4">
            <span className="hidden md:block w-[590px] h-px bg-black" aria-hidden />
            <span className="md:hidden flex-1 h-px bg-black" aria-hidden />
            <h2 className={mainTextCls}>BLOG</h2>
            <span className="hidden md:block w-[590px] h-px bg-black" aria-hidden />
            <span className="md:hidden flex-1 h-px bg-black" aria-hidden />
          </div>
        </div>

        {/* Posts */}
        <div className="mx-auto w-full max-w-[1280px]">
          <ul
            className="
              grid
              grid-cols-1                         /* 375–599: 1×1 */
              min-[600px]:grid-cols-2             /* 600–1024: 2×2 */
              min-[1025px]:grid-cols-3            /* >1024: 3×3 */
              gap-x-6 gap-y-10
              place-items-center                  /* center single-column cards */
              min-[600px]:place-items-stretch     /* reset when 2+ columns */
              mb-8
            "
          >
            {posts.map((b, i) => (
              <BlogCard
                key={b.slug}
                slug={b.slug}
                title={b.title}
                thumbnail={b.thumbnail}
                createdAt={b.createdAt}
                variant="showcase"
                displayDate={_displayDates[i]}
                grayTags={_graySets[i]}
              />
            ))}
          </ul>

          {/* See more */}
          <div className="mt-8 w-full flex justify-center min-[600px]:justify-end">
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
