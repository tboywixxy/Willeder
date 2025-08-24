// components/ServiceSection.tsx
import Image from "next/image";
import { notoSansJp, jost } from "@/app/fonts";

type Service = {
  title: string;
  kicker: string;
  description: string;
  img: string;
  alt: string;
};

const SERVICES: Service[] = [
  {
    title: "UI/UX Design",
    kicker: "Human-centered product design",
    description:
      "Wireframes, visual systems, and prototypes that translate requirements into intuitive flows.",
    img: "/1.png",
    alt: "UI/UX Design icon",
  },
  {
    title: "Engineering",
    kicker: "Reliable builds & integrations",
    description:
      "Frontend with Next.js + TypeScript, scalable APIs, and CI/CD tuned for fast releases.",
    img: "/2.png",
    alt: "Engineering icon",
  },
  {
    title: "Brand Strategy",
    kicker: "Identity & positioning",
    description:
      "Naming, tone, and visual language that align your product with audience and goals.",
    img: "/3.png",
    alt: "Brand Strategy icon",
  },
];

export default function ServiceSection() {
  const headerJP = `${notoSansJp.className} font-bold text-[32px] leading-[150%] tracking-[0.05em] text-[#AD002D] text-center`;
  const serviceWord = `${jost.className} font-medium text-[20px] leading-[150%] tracking-[0.05em] text-[#AD002D] text-center`;

  const cardKicker = `${notoSansJp.className} font-bold leading-[125%] text-center break-words [overflow-wrap:anywhere] hyphens-auto`;
  const cardTitle  = `${notoSansJp.className} font-bold leading-[125%] text-center break-words [overflow-wrap:anywhere] hyphens-auto`;
  const cardDesc   = `${notoSansJp.className} font-medium leading-[150%] text-center break-words [overflow-wrap:anywhere] hyphens-auto`;

  return (
    <section className="bg-[#FFC8D7]">
      {/* Page wrapper (safe gutter) */}
      <div
        className="
          mx-auto w-full max-w-[1440px]
          px-[clamp(16px,calc(100vw/1440*20),20px)]
          pt-[clamp(64px,calc(100vw/1440*96),96px)]
          pb-[clamp(80px,calc(100vw/1440*160),160px)]
        "
      >
        {/* Inner widths: 343 / 720 / 1280 (centered) */}
        <div
          className="
            mx-auto w-full
            max-w-[343px]               /* 375–599  */
            min-[600px]:max-w-[720px]   /* 600–1023 */
            min-[1024px]:max-w-[1280px] /* ≥1024    */
            space-y-[clamp(16px,calc(100vw/1440*24),24px)]
          "
        >
          {/* Header */}
          <div className="w-full flex flex-col items-center justify-center gap-2">
            <h2 className={`${headerJP} whitespace-nowrap`}>サービス内容</h2>
            <div className="w-full h-[30px] flex items-center justify-center gap-4">
              <span className="flex-1 h-px bg-[#AD002D]" aria-hidden="true" />
              <span className="w-auto min-w-[86px] h-[30px] grid place-items-center">
                <span className={serviceWord}>SERVICE</span>
              </span>
              <span className="flex-1 h-px bg-[#AD002D]" aria-hidden="true" />
            </div>
          </div>

          {/* GRID: 1×1 (mobile) → 1×1 (tablet) → 3 across (desktop) */}
          <ul
            className="
              grid
              grid-cols-1
              min-[1024px]:grid-cols-3
              place-items-center           /* <— hard-center each cell */
              gap-y-[clamp(16px,calc(100vw/1440*32),32px)]
              gap-x-[clamp(12px,calc(100vw/1440*24),24px)]
            "
          >
            {SERVICES.map((s) => (
              <li key={s.title} className="w-full flex justify-center">
                {/* Card widths per breakpoint (centered via parent flex) */}
                <div
                  className="
                    w-[343px]               /* ≤599 */
                    min-[600px]:w-[672px]   /* 600–1023, centered within 720 */
                    min-[1024px]:w-[410px]  /* ≥1024, fits 3 across */
                    box-border
                    flex flex-col items-center
                    px-[clamp(8px,calc(100vw/1440*12),12px)]
                  "
                >
                  {/* Image */}
                  <div className="relative mx-auto w-[200px] h-[200px] min-[600px]:w-[240px] min-[600px]:h-[240px] min-[1024px]:w-[280px] min-[1024px]:h-[280px]">
                    <Image
                      src={s.img}
                      alt={s.alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 599px) 200px, (max-width: 1023px) 240px, 280px"
                      decoding="async"
                    />
                  </div>

                  {/* Texts */}
                  <div className="w-full mt-[clamp(12px,calc(100vw/1440*16),16px)] flex flex-col items-center gap-[clamp(8px,calc(100vw/1440*12),12px)]">
                    <p
                      className={`
                        ${cardKicker}
                        text-[clamp(14px,calc(100vw/1440*18),18px)]
                        min-[600px]:text-[20px]
                        min-[1024px]:text-[22px]
                        max-w-full
                      `}
                    >
                      {s.kicker}
                    </p>
                    <h3
                      className={`
                        ${cardTitle}
                        text-[clamp(16px,calc(100vw/1440*20),20px)]
                        min-[1024px]:text-[22px]
                        max-w-full
                      `}
                    >
                      {s.title}
                    </h3>
                    <p
                      className={`
                        ${cardDesc}
                        text-[clamp(12px,calc(100vw/1440*15),15px)]
                        max-w-full
                      `}
                    >
                      {s.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
