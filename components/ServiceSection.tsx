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
    img: "/images/services/1.png",
    alt: "UI/UX Design icon",
  },
  {
    title: "Engineering",
    kicker: "Reliable builds & integrations",
    description:
      "Frontend with Next.js + TypeScript, scalable APIs, and CI/CD tuned for fast releases.",
    img: "/images/services/1.png",
    alt: "Engineering icon",
  },
  {
    title: "Brand Strategy",
    kicker: "Identity & positioning",
    description:
      "Naming, tone, and visual language that align your product with audience and goals.",
    img: "/images/services/1.png",
    alt: "Brand Strategy icon",
  },
];

export default function ServiceSection() {
  const headerJP = `${notoSansJp.className} font-bold text-[32px] leading-[150%] tracking-[0.05em] text-[#AD002D] text-center`;
  const serviceWord = `${jost.className} font-medium text-[20px] leading-[150%] tracking-[0.05em] text-[#AD002D] text-center`;

  const cardTopBig = `${notoSansJp.className} font-bold leading-[125%] text-center break-words hyphens-auto`;
  const cardTitle = `${notoSansJp.className} font-bold leading-[125%] text-center break-words hyphens-auto`;
  const cardDesc = `${notoSansJp.className} font-medium leading-[150%] break-words hyphens-auto`;

  return (
    <section className="bg-[#FFC8D7]">
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-6 lg:px-20 pt-24 pb-40 space-y-16">
        {/* Header */}
        <div className="mx-auto w-full max-w-[1280px] h-auto flex flex-col items-center justify-center gap-2">
          <div className="w-fit h-auto">
            <div className={`${headerJP} whitespace-nowrap`}>サービス内容</div>
          </div>

          <div className="w-full max-w-[1280px] h-[30px] flex items-center justify-center gap-4">
            <span className="hidden md:block w-[577px] h-px bg-[#AD002D]" aria-hidden="true" />
            <span className="md:hidden flex-1 h-px bg-[#AD002D]" aria-hidden="true" />
            <div className="w-auto md:w-[86px] h-[30px] flex items-center justify-center">
              <span className={serviceWord}>SERVICE</span>
            </div>
            <span className="hidden md:block w-[577px] h-px bg-[#AD002D]" aria-hidden="true" />
            <span className="md:hidden flex-1 h-px bg-[#AD002D]" aria-hidden="true" />
          </div>
        </div>

        {/* Cards */}
        <div className="mx-auto w-full max-w-[1280px]">
          <ul
            className="
              grid
              grid-cols-1                       /* default + 600–1023 + 1024–1362: 1 col */
              min-[1363px]:grid-cols-3           /* ≥1363: 3 cols */
              place-items-stretch min-[1363px]:place-items-center
              gap-10 min-[1363px]:gap-16
            "
          >
            {SERVICES.map((s) => (
              <li
                key={s.title}
                className="
                  min-w-0
                  w-full min-[1363px]:w-[410px]
                  h-auto
                  flex flex-col items-stretch
                  px-2
                "
              >
                {/* Image */}
                <div className="relative mx-auto w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px]">
                  <Image
                    src={s.img}
                    alt={s.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1362px) 90vw, 280px"
                  />
                </div>

                {/* Texts */}
                <div className="min-w-0 w-full min-[1363px]:w-[410px] mt-4 md:mt-6 flex flex-col items-center gap-3">
                  {/* Kicker */}
                  <div className="min-w-0 w-full min-[1363px]:w-[240px] flex items-center justify-center">
                    <p
                      className={`
                        ${cardTopBig}
                        text-center whitespace-normal [overflow-wrap:anywhere]
                        text-[clamp(14px,4vw,18px)] md:text-[20px] min-[1363px]:text-[22px]
                        max-w-full
                      `}
                    >
                      {s.kicker}
                    </p>
                  </div>

                  {/* Title */}
                  <div className="min-w-0 w-full min-[1363px]:w-[150px] flex items-center justify-center">
                    <h3
                      className={`
                        ${cardTitle}
                        text-center whitespace-normal [overflow-wrap:anywhere]
                        text-[clamp(16px,4vw,20px)] md:text-[22px]
                        max-w-full
                      `}
                    >
                      {s.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <div className="min-w-0 w-full min-[1363px]:w-[410px] flex items-center justify-center">
                    <p
                      className={`
                        ${cardDesc}
                        text-center whitespace-normal [overflow-wrap:anywhere] break-words
                        text-[clamp(12px,3.2vw,15px)]
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
