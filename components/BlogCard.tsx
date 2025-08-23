"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

type Props = {
  slug: string;
  title: string;
  thumbnail: string;
  createdAt: string;
  variant?: "default" | "showcase";
  displayDate?: string;
  grayTags?: string[];
  /** When provided, the card link appends ?from=<fromSlug> so Prev knows where to go */
  fromSlug?: string;
};

const FIXED_TAGS = ["IT Consulting", "Engineering", "Branding", "Design", "Other"];

export default function BlogCard({
  slug,
  title,
  thumbnail,
  createdAt,
  variant = "showcase",
  displayDate,
  grayTags = [],
  fromSlug,
}: Props) {
  const isShowcase = variant === "showcase";

  const href = fromSlug
    ? `/blog/${encodeURIComponent(slug)}?from=${encodeURIComponent(fromSlug)}`
    : `/blog/${encodeURIComponent(slug)}`;

  return (
    <motion.li
      layout
      className={
        isShowcase
          ? "rounded-[16px] overflow-hidden bg-white border-l-4 border-r-4 border-gray-200 shadow-[0_12px_28px_-10px_rgba(0,0,0,0.28)]"
          : "border rounded-lg overflow-hidden bg-white shadow-[0_12px_28px_-10px_rgba(0,0,0,0.28)]"
      }
    >
      <Link
        href={href}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
      >
        {/* IMAGE */}
        <div className={isShowcase ? "relative w-full h-[180px] sm:h-[240px] md:h-[308px]" : "relative aspect-[1200/630]"}>
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover"
            sizes={isShowcase ? "(max-width: 768px) 100vw, 33vw" : "(max-width: 1024px) 100vw, 33vw"}
            priority={false}
          />
        </div>

        {/* CONTENT */}
        <div className="sm:h-[189px] h-auto pt-1 pr-2 pb-4 pl-2 flex flex-col gap-6">
          <div className="w-full sm:h-[97px] h-auto flex flex-col gap-2">
            <time
              dateTime={new Date(createdAt).toISOString()}
              className="w-[75px] h-[21px] text-[13px] leading-[21px] text-[#737B8C]"
            >
              {displayDate ?? new Date(createdAt).toLocaleDateString()}
            </time>

            <h3 className="sm:h-[72px] h-auto overflow-hidden font-semibold text-lg leading-tight line-clamp-2">
              {title}
            </h3>
          </div>

          {/* TAGS */}
          <div className="w-full sm:h-[48px] h-auto flex flex-wrap content-start gap-1">
            {FIXED_TAGS.map((t) => {
              const isGray = grayTags.includes(t);
              const color = isGray ? "#B9BDC6" : "#000000";
              return (
                <span
                  key={t}
                  className="inline-flex h-[22px] items-center rounded-[4px] border px-4 text-[12px] leading-[22px]"
                  style={{ borderColor: color, color }}
                >
                  {t}
                </span>
              );
            })}
          </div>
        </div>
      </Link>
    </motion.li>
  );
}
