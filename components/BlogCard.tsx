"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type Props = {
  slug: string;
  title: string;
  thumbnail: string;
  createdAt: string;
  variant?: "default" | "showcase";
  /** If provided, shown exactly (e.g. "2025.08.10"); otherwise formats createdAt */
  displayDate?: string;
  /** Tags that should render in gray (#B9BDC6). Any tag not listed renders in black. */
  grayTags?: string[];
};

// Fixed tag set (rendered on every card, grey/black per grayTags)
const FIXED_TAGS = ["IT Consulting", "Engineering", "Branding", "Design", "Other"];

export default function BlogCard({
  slug,
  title,
  thumbnail,
  createdAt,
  variant = "showcase",
  displayDate,
  grayTags = [],
}: Props) {
  const isShowcase = variant === "showcase";

  return (
    <motion.li
      layout
      className={
        isShowcase
          ? "rounded-[16px] overflow-hidden bg-white border-l-4 border-r-4 border-gray-200"
          : "border rounded-lg overflow-hidden bg-white shadow-sm"
      }
    >
      <Link
        href={`/blog/${slug}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
      >
        {/* IMAGE */}
        <div
          className={
            isShowcase
              ? "relative w-full h-[180px] sm:h-[240px] md:h-[308px]"
              : "relative aspect-[1200/630]"
          }
        >
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
          {/* Date + Title block */}
          <div className="w-full sm:h-[97px] h-auto flex flex-col gap-2">
            {/* Date */}
            <time
              dateTime={new Date(createdAt).toISOString()}
              className="w-[75px] h-[21px] text-[13px] leading-[21px] text-[#737B8C]"
            >
              {displayDate ?? new Date(createdAt).toLocaleDateString()}
            </time>

            {/* Title */}
            <h3 className="sm:h-[72px] h-auto overflow-hidden font-semibold text-lg leading-tight line-clamp-2">
              {title}
            </h3>
          </div>

          {/* TAGS row (fixed set; grey/black per grayTags) */}
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
