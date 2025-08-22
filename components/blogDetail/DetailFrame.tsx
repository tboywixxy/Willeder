// src/components/blogDetail/DetailFrame.tsx
import Image from "next/image";

const FIXED_TAGS = ["IT Consulting", "Engineering", "Branding", "Design", "Other"];

function formatDotDate(input: string) {
  return input.includes("-") ? input.replaceAll("-", ".") : input;
}

export default function DetailFrame({
  title,
  heroSrc,
  heroAlt,
  date,
  tags,          // active tags for this post
  allTags = FIXED_TAGS, // render ALL chips (black if active, gray if not)
  children,
}: {
  title: string;
  heroSrc: string;
  heroAlt: string;
  date: string;
  tags: string[];        // active/included tags for this post
  allTags?: string[];    // full list to render (defaults to FIXED_TAGS)
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        mx-auto w-full max-w-[1280px]
        bg-white rounded-[16px]
        pt-[96px] pb-[96px]
        flex flex-col items-center gap-12
      "
    >
      {/* Title area box: 1280×198; inner: 1062×144 (title), then 1062×30 (date+tags) */}
      <header className="w-full h-auto md:h-[198px] px-0 md:px-[109px] flex flex-col gap-6">
        <div className="w-full md:w-[1062px] h-auto md:h-[144px]">
          <h1 className="text-left text-[clamp(22px,3.2vw,36px)] font-semibold leading-tight">
            {title}
          </h1>
        </div>

        <div className="w-full md:w-[1062px] h-auto md:h-[30px] flex items-center gap-12">
          <time className="text-sm text-[#737B8C]" dateTime={date}>
            {formatDotDate(date)}
          </time>

          {/* Render all chips; black if active, gray if not */}
          <div className="flex flex-wrap items-center gap-2">
            {allTags.map((t) => {
              const active = tags.includes(t);
              const color = active ? "#000000" : "#B9BDC6";
              return (
                <span
                  key={t}
                  className="inline-flex h-[22px] items-center rounded-[4px] border px-3 text-xs leading-[22px]"
                  style={{ borderColor: color, color }}
                >
                  {t}
                </span>
              );
            })}
          </div>
        </div>
      </header>

      {/* Hero image */}
      <div className="relative w-full h-[280px] sm:h-[420px] md:h-[800px] overflow-hidden rounded-md">
        <Image
          src={heroSrc}
          alt={heroAlt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 1280px"
          priority
        />
      </div>

      {children}
    </div>
  );
}
