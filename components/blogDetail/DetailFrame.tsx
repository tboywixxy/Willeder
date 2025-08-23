import Image from "next/image";
import { notoSansJp, jost } from "@/app/fonts";

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
  const titleCls = `
    ${notoSansJp.className} font-bold
    text-[28px] sm:text-[36px] md:text-[48px]
    leading-[140%] tracking-[0.05em]
    text-center md:text-left
  `;
  const dateCls = `${jost.className} font-medium text-[14px] sm:text-[16px] md:text-[20px] leading-[150%] text-[#737B8C]`;
  const tagTextCls = `${jost.className} font-medium text-[12px] sm:text-[14px] leading-[150%] tracking-[0.10em]`;

  return (
    <div
      className="
        w-full
        bg-white rounded-[16px]
        /* Figma: pt/pb 96 desktop, inner px approximated to preserve 1280 outer width */
        px-4 sm:px-6 md:px-[109px]
        pt-12 sm:pt-20 md:pt-[96px]
        pb-12 sm:pb-20 md:pb-[96px]
        flex flex-col items-center
        gap-[48px]
      "
    >
      {/* Title + date + tags */}
      <header className="w-full flex flex-col gap-4 sm:gap-6">
        <h1 className={titleCls}>{title}</h1>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <time className={dateCls} dateTime={date}>
            {formatDotDate(date)}
          </time>

          <div className="flex flex-wrap items-center gap-2">
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
      </header>

      {/* First image */}
      <div className="relative w-full h-[220px] sm:h-[320px] md:h-[450px] overflow-hidden rounded-[16px]">
        <Image
          src={heroSrc}
          alt={heroAlt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 720px, 1280px"
          priority
        />
      </div>

      {/* Rest of content */}
      {children}
    </div>
  );
}
