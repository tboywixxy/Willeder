// components/ServiceSection.tsx
import Image from "next/image";
import { notoSansJp, jost } from "@/app/fonts";
import Reveal from "@/components/Reveal";

type Service = {
  title: string;
  kicker: string;
  description: string;
  img: string;
  alt: string;
};

const SERVICES: Service[] = [
  {
    title: "高速PDCA",
    kicker: "クリエイト",
    description:
      "多数のクリエイティブを用意。トーナメント方式で広告クリエイティブを高速で比較・テスト。最も高いCV率を素早く見極め、効果的な広告運用を実現。",
    img: "/1.png",
    alt: "UI/UX Design icon",
  },
  {
    title: "高速PDCA",
    kicker: "配信面",
    description:
      "キャンペーンの再構築、配信チャネルの見直し、入札単価の調整などを迅速に行い、広告配信を最適化。",
    img: "/2.png",
    alt: "Engineering icon",
  },
  {
    title: "高速PDCA",
    kicker: "LPO",
    description:
      "ヒートマップ等ユーザー動線を分析し、迅速にLPを修正。ページの精読率やクロール率を改善し、より高いCVを実現。",
    img: "/3.png",
    alt: "Brand Strategy icon",
  },
];

// Per-card offsets relative to the first card (index 0)
const CARD_OFFSETS = [
  { base: { x: 0,  y: 0  }, lg: { x: 30,  y: 0   } },   // 1st card (anchor)
  { base: { x: 0,  y: 0  }, lg: { x: 14,  y: -11 } },   // 2nd card
  { base: { x: 0,  y: 0  }, lg: { x: 0,   y: 0   } },   // 3rd card
] as const;

type CardStyleVars = React.CSSProperties & {
  "--tx": string;
  "--ty": string;
  "--tx-lg": string;
  "--ty-lg": string;
};


export default function ServiceSection() {
  const headerJP = `${notoSansJp.className} font-bold text-[32px] leading-[150%] tracking-[0.05em] text-[#AD002D] text-center`;
  const serviceWord = `${jost.className} font-medium text-[17px] leading-[150%] tracking-[0.05em] text-[#AD002D] text-center`;

  const cardKicker = `${notoSansJp.className} font-bold leading-[125%] text-center break-words [overflow-wrap:anywhere] hyphens-auto`;
  const cardTitle  = `${notoSansJp.className} font-bold leading-[125%] text-center break-words [overflow-wrap:anywhere] hyphens-auto`;
  const cardDesc   = `${notoSansJp.className} font-medium leading-[130%] text-left break-words [overflow-wrap:anywhere] hyphens-auto`;

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
          <Reveal className="w-full flex flex-col items-center justify-center gap-2">
            <h2 className={`${headerJP} whitespace-nowrap`}>サービス内容</h2>
            <div className="w-full h-[19px] flex items-center justify-center gap-1">
              <span className="flex-1 max-w-[clamp(56px,calc(1120vw/1440*230),740px)] h-px bg-[#AD002D]" aria-hidden="true" />
              <span className="w-auto min-w-[96px] h-[30px] grid place-items-center">
                <span className={serviceWord}>SERVICE</span>
              </span>
<span className="flex-1 max-w-[clamp(56px,calc(1120vw/1440*230),740px)] h-px bg-[#AD002D]" aria-hidden="true" />
            </div>
          </Reveal>

          <ul
            className="
              mt-[clamp(24px,calc(80vw/1440*72),72px)]
              pr-0 min-[1024px]:pr-8     /* keep desktop as-is; remove padding on small screens */
              grid
              grid-cols-1
              min-[1024px]:grid-cols-3
              place-items-center
              gap-y-[clamp(20px,calc(100vw/1440*40),40px)]
              gap-x-[clamp(10px,calc(10vw/1440*20),20px)]
            "
          >
            {SERVICES.map((s, i) => {
              const off = CARD_OFFSETS[i] ?? CARD_OFFSETS[0];
              // AFTER
              const style: CardStyleVars = {
                "--tx": `${off.base.x}px`,
                "--ty": `${off.base.y}px`,
                "--tx-lg": `${off.lg.x}px`,
                "--ty-lg": `${off.lg.y}px`,
              };
              return (
                <Reveal key={s.title} className="w-full flex justify-center">
                  {/* Card widths per breakpoint (centered via parent flex) */}
                  <div
                    style={style}
                    className="
                      w-[343px]               /* ≤599 */
                      min-[600px]:w-[672px]   /* 600–1023, centered within 720 */
                      min-[1024px]:w-[410px]  /* ≥1024, fits 3 across */
                      box-border
                      flex flex-col items-center
                      px-[clamp(8px,calc(100vw/1440*12),12px)]
                      transform-gpu
                      translate-x-[var(--tx)] translate-y-[var(--ty)]
                      min-[1024px]:translate-x-[var(--tx-lg)] min-[1024px]:translate-y-[var(--ty-lg)]
                    "
                  >
                    {/* Image */}
                    <div className="relative mx-auto w-[200px] h-[200px] min-[600px]:w-[240px] min-[600px]:h-[240px] min-[1024px]:w-[260px] min-[1024px]:h-[280px]">
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
                    <div className="w-full mt-0 min-[1024px]:-mt-4 flex flex-col items-center gap-[clamp(8px,calc(100vw/1440*8),8px)]">
                      <p
                        className={`
                          ${cardKicker}
                          text-[clamp(14px,calc(100vw/1440*18),18px)]
                          min-[600px]:text-[20px]
                          min-[1024px]:text-[42px]
                          max-w-full
                        `}
                      >
                        {s.kicker}
                      </p>
                      <h3
                        className={`
                          ${cardTitle}
                          text-[clamp(16px,calc(100vw/1440*20),20px)]
                          min-[1024px]:text-[28px]
                          max-w-full
                        `}
                      >
                        {s.title}
                      </h3>

                      {/* Gradient bar (stay inside card on mobile; keep original on ≥600) */}
                      <div
                        className="
                          w-[343px] min-[600px]:w-[385px]
                          h-[4px] opacity-100 mt-1
                        "
                        style={{
                          background:
                            "linear-gradient(270deg, #99FF66 0.11%, #55FF00 50.05%, #DCFFCA 100%)",
                        }}
                      />

                      <p
                        className={`
                          ${cardDesc}
                          text-[clamp(12px,calc(100vw/1440*15),15px)]
                          w-full max-w-[410px] mx-auto
                          pr-2
                        `}
                      >
                        {s.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
