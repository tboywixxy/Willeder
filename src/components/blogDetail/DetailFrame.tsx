// components/blogDetail/DetailFrame.tsx
import Image from "next/image";
import { notoSansJp, jost } from "@/app/fonts";
import Reveal from "@/components/Reveal";

const FIXED_TAGS = ["IT Consulting", "Engineering", "Branding", "Design", "Other"];

function formatDotDate(input: string) {
  return input.includes("-") ? input.replaceAll("-", ".") : input;
}

export default function DetailFrame({
  title,
  heroSrc,
  heroAlt,
  date,
  tags,
  allTags = FIXED_TAGS,
  children,
}: {
  title: string;
  heroSrc: string;
  heroAlt: string;
  date: string;
  tags: string[];
  allTags?: string[];
  children: React.ReactNode;
}) {
  // Typography (Figma → clamp)
  const titleCls = `
    ${notoSansJp.className} font-bold
    text-[clamp(32px,calc(100vw/1440*48),48px)]
    leading-[1.5] tracking-[0.05em]
    text-left
  `;
  const dateCls = `
    ${jost.className} font-medium
    text-[clamp(14px,calc(100vw/1440*20),20px)]
    leading-[1.5] text-[#737B8C]
  `;
  const tagTextCls = `
    ${jost.className} font-medium
    text-[clamp(12px,calc(100vw/1440*14),14px)]
    leading-[1.5] tracking-[0.10em]
  `;

  // Reusable text-side padding (kept off the image so it can be full-bleed)
  const sidePad = "px-[clamp(16px,calc(100vw/1440*105),109px)]";

  return (
    // Center the white card; enforce exact max-widths per breakpoint
    <div className="w-full flex justify-center">
      <div
        className="
          bg-white rounded-[16px] overflow-hidden
          w-full
          max-w-[343px]                 /* 375–599 white area width */
          min-[600px]:max-w-[720px]     /* 600–1023 white area width */
          min-[1024px]:max-w-[1280px]   /* ≥1024 white area width */
        "
      >
        {/* HEADER (title + date/tags) — padded, left-aligned */}
        <Reveal
          className={`
            ${sidePad}
            pt-[clamp(48px,calc(100vw/1440*74),74px)]
            pb-[clamp(24px,calc(100vw/1440*63),63px)]
          `}
        >
          {/* Title block widths: 327 / 672 / 1062 */}
          <div className="w-full max-w-[327px] min-[600px]:max-w-[672px] min-[1024px]:max-w-[1062px]">
            <h1 className={titleCls}>{title}</h1>
            {/* small gap below title */}
            <div className="mt-[clamp(8px,calc(100vw/1440*21),21px)]" />
          </div>

          {/* Date + Tags widths & layout
              - 375–599: 327 wide, column, 24 gap (date above, tags below)
              - 600–1023: 672 wide, row, 24 gap
              - ≥1024: 1062 wide, row, 48 gap
          */}
          <div
            className="
              w-full max-w-[327px] min-[600px]:max-w-[672px] min-[1024px]:max-w-[1062px]
              flex flex-col min-[600px]:flex-row
              items-start min-[600px]:items-center
              gap-[24px] min-[1024px]:gap-[48px]
            "
          >
            <time className={dateCls} dateTime={date}>
              {formatDotDate(date)}
            </time>

            <div className="flex flex-wrap items-center gap-[clamp(6px,calc(100vw/1440*8),8px)]">
              {allTags.map((t) => {
                const active = tags.map((x) => x.toLowerCase()).includes(t.toLowerCase());
                const color = active ? "#000000" : "#B9BDC6";
                return (
                  <span
                    key={t}
                    className={`inline-flex h-[22px] items-center rounded-[4px] border px-3 ${tagTextCls}`}
                    style={{ borderColor: color, color }}
                  >
                    {t}
                  </span>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* HERO IMAGE — full-bleed to the card edges at each breakpoint
            Exact sizes:
              - 375–599: 343 × 214.375
              - 600–1023: 720 × 450
              - ≥1024: 1280 × 800
        */}
        <Reveal className="w-full">
          <div
            className="
              relative overflow-hidden
              w-full
              h-[214.375px]                 /* mobile height */
              min-[600px]:h-[450px]         /* tablet height */
              min-[1024px]:h-[748px]        /* desktop height */
            "
          >
            <Image
              src={heroSrc}
              alt={heroAlt}
              fill
              className="object-cover"
              sizes="(max-width: 599px) 343px, (max-width: 1023px) 720px, 1280px"
              priority
              decoding="async"
            />
          </div>
        </Reveal>

        <div
          className={`
            ${sidePad}
            pt-[clamp(48px,calc(100vw/1440*34),34px)]
            pb-[clamp(96px,calc(100vw/1440*96),96px)]
          `}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
