import Link from "next/link";
import Image from "next/image";
import { jost, notoSansJp } from "@/app/fonts";

const ALL_TAGS = ["IT Consulting", "Engineering", "Branding", "Design", "Other"];

function formatDotDate(input: string) {
  return input.includes("-") ? input.replaceAll("-", ".") : input;
}

type Props = {
  slug: string;
  title: string;
  thumbnail: string;
  createdAt: string;
  /** Optional preformatted display date (e.g., "2025.08.01") */
  displayDate?: string;
  /** Pass tags that should be greyed out (the rest will be black) */
  grayTags?: string[];
  /** Optional visual variant used by your pages */
  variant?: "showcase" | "compact";
  className?: string;
  /** Some callers passed this previously; keep for compatibility */
  fromSlug?: string;
};

export default function BlogCard({
  slug,
  title,
  thumbnail,
  createdAt,
  displayDate,
  grayTags = [],
  variant = "showcase",
  className = "",
}: Props) {
  const titleCls = `
    ${notoSansJp.className} font-bold
    text-[clamp(16px,calc(100vw/1440*20),20px)]
    leading-[150%] tracking-[0.05em]
  `;
  const dateCls = `
    ${jost.className} font-medium
    text-[clamp(12px,calc(100vw/1440*14),14px)]
    leading-[150%] text-[#737B8C]
  `;

  const shownDate = displayDate ?? formatDotDate(createdAt);
  const graySet = new Set((grayTags ?? []).map((t) => t.toLowerCase()));

  return (
    <article
      className={[
        "w-full max-w-[410px] rounded-[16px] bg-white overflow-hidden",
        "border border-transparent",
        "mx-auto min-[600px]:mx-0", // center on small screens only
        className,
      ].join(" ")}
    >
      <Link
        href={`/blog/${encodeURIComponent(slug)}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
      >
        <div
          className={[
            "relative w-full overflow-hidden",
            variant === "compact" ? "aspect-[16/10]" : "aspect-[4/3]",
          ].join(" ")}
        >
          <Image
            src={thumbnail}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 639px) 92vw, (max-width: 1023px) 44vw, 410px"
            priority={false}
          />
        </div>

        <div className="px-3 pt-3 pb-4">
          <time className={dateCls} dateTime={createdAt}>
            {shownDate}
          </time>

          <h3 className={`${titleCls} mt-1 break-words hyphens-auto`}>{title}</h3>

          <ul className="mt-3 flex flex-wrap items-center gap-2" aria-label="Categories">
            {ALL_TAGS.map((tag) => {
              const isGray = graySet.has(tag.toLowerCase());
              const color = isGray ? "#B9BDC6" : "#000000";
              return (
                <li key={tag}>
                  <span
                    className="
                      inline-flex h-[22px] items-center rounded-[4px] border px-3
                      text-[12px] leading-[1]
                    "
                    style={{ borderColor: color, color }}
                  >
                    {tag}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </Link>
    </article>
  );
}
