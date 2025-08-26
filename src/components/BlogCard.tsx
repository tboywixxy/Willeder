import Link from "next/link";
import Image from "next/image";
import { jost, notoSansJp } from "@/app/fonts";

const ALL_TAGS = ["IT Consulting", "Engineering", "Branding", "Design", "Other"];

function formatDotDate(input: string) {
  return input.includes("-") ? input.replaceAll("-", ".") : input;
}

type ResponsiveHeights = Partial<{
  base: number | string;
  sm: number | string;
  md: number | string;
  lg: number | string;
  xl: number | string;
}>;

type Props = {
  slug: string;
  title: string;
  thumbnail: string;
  createdAt: string;
  displayDate?: string;
  grayTags?: string[];
  variant?: "showcase" | "compact";
  className?: string;
  fromSlug?: string;

  imgHeights?: ResponsiveHeights;
  textMinHeights?: ResponsiveHeights;
  cardMinHeights?: ResponsiveHeights;
};

function toCssUnit(v?: number | string): string | undefined {
  if (v === undefined) return undefined;
  return typeof v === "number" ? `${v}px` : v;
}

function varsFromResponsive(prefix: string, values?: ResponsiveHeights) {
  const out: Record<string, string> = {};
  const m = { "": values?.base, "-sm": values?.sm, "-md": values?.md, "-lg": values?.lg, "-xl": values?.xl };
  Object.entries(m).forEach(([suffix, val]) => {
    const cssVal = toCssUnit(val);
    if (cssVal !== undefined) out[`--${prefix}${suffix}`] = cssVal;
  });
  return out;
}

export default function BlogCard({
  slug,
  title,
  thumbnail,
  createdAt,
  displayDate,
  grayTags = [],
  variant = "showcase",
  className = "",
  imgHeights,
  textMinHeights,
  cardMinHeights,
}: Props) {
  const titleCls = `
    ${notoSansJp.className} font-bold
    text-[clamp(16px,calc(100vw/1440*20),20px)]
    leading-[150%] tracking-[0.05em]
  `;
  const dateCls = `
    ${jost.className} font-medium
    text-[clamp(12px,calc(100vw/1440*15),15px)]
    leading-[150%] text-[#737B8C]
  `;

  const shownDate = displayDate ?? formatDotDate(createdAt);
  const graySet = new Set((grayTags ?? []).map((t) => t.toLowerCase()));

  // Defaults
  const defaultImgHeights: ResponsiveHeights =
    variant === "compact"
      ? { base: 160, sm: 190, md: 320 }
      : { base: 180, sm: 220, md: 289 };

  // NEW: give the text block a baseline min-height so you see the effect immediately
  const defaultTextMinHeights: ResponsiveHeights = { base: 120, md: 140 };

  const styleVars = {
    ...varsFromResponsive("img-h", { ...defaultImgHeights, ...imgHeights }),
    ...varsFromResponsive("text-min-h", { ...defaultTextMinHeights, ...textMinHeights }),
    ...varsFromResponsive("card-min-h", cardMinHeights),
  } as React.CSSProperties;

  return (
    <article
      style={styleVars}
      className={[
        "relative w-full max-w-[410px] rounded-[16px] bg-white overflow-hidden",
        "border border-transparent",
        "shadow-[0_14px_28px_-10px_rgba(0,0,0,0.18),-6px_10px_16px_-12px_rgba(0,0,0,0.12),6px_10px_16px_-12px_rgba(0,0,0,0.12)]",
        "min-h-[var(--card-min-h,0px)]",
        "mx-auto min-[600px]:mx-0",
        className,
      ].join(" ")}
    >
      <Link
        href={`/blog/${encodeURIComponent(slug)}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
      >
        {/* IMAGE AREA */}
        <div
          className={[
            "relative w-full overflow-hidden",
            "h-[var(--img-h,180px)]",
            "sm:h-[var(--img-h-sm,var(--img-h,180px))]",
            "md:h-[var(--img-h-md,var(--img-h-sm,var(--img-h,180px)))]",
            "lg:h-[var(--img-h-lg,var(--img-h-md,var(--img-h-sm,var(--img-h,180px))))]",
            "xl:h-[var(--img-h-xl,var(--img-h-lg,var(--img-h-md,var(--img-h-sm,var(--img-h,180px)))))]", // ← fixed extra bracket
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

        {/* TEXT AREA */}
        <div
          className={[
            "px-1 pt-[22px] pb-4", // was pt-5.5 (invalid in default Tailwind)
            "min-h-[var(--text-min-h,0px)]",
            "sm:min-h-[var(--text-min-h-sm,var(--text-min-h,0px))]",
            "md:min-h-[var(--text-min-h-md,var(--text-min-h-sm,var(--text-min-h,0px)))]",
            "lg:min-h-[var(--text-min-h-lg,var(--text-min-h-md,var(--text-min-h-sm,var(--text-min-h,0px))))]",
            "xl:min-h-[var(--text-min-h-xl,var(--text-min-h-lg,var(--text-min-h-md,var(--text-min-h-sm,var(--text-min-h,0px)))))]", // ← fixed extra bracket
          ].join(" ")}
        >
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
