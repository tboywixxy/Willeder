import Image from "next/image";
import Link from "next/link";
import { notoSansJp } from "@/app/fonts";

type Props = {
  heading?: string;     // centered text in the top bar
  buttonText?: string;  // CTA text
  buttonHref?: string;  // link target
  iconSrc?: string;     // icon path
};

export default function StanSection({
  heading = "どんな内容でも、お気軽にご相談ください。",
  buttonText = "お問い合わせはこちら",
  buttonHref = "/blog",
  iconSrc = "/images/services/arrow 2.png",
}: Props) {
  // Figma text style: Noto Sans JP, 700, line-height 150%, letter-spacing 5%, centered
  const figmaTextCommon =
    `${notoSansJp.className} font-bold leading-[130%] tracking-[0.0009em] text-center`;

  return (
    <section className="bg-[#B9BDC6] dark:bg-[#B9BDC6]">
      {/* Whole box
          - Mobile (375–600): 375×334, p: 96/16, gap: 32
          - 600–1024: 768×328, p: 96/24, gap: 32
          - Desktop: 1440×328, p: 96/80, gap: 32
      */}
      <div
        className="
          mx-auto w-full max-w-[1440px]
          h-[324px] sm:h-[328px] md:h-[306px]
          pt-22 pb-24
          px-4 sm:px-6 md:px-6 lg:px-20
          space-y-7
        "
      >
        {/* Centered heading box
            - Mobile: max-w 343, h 48
            - ≥600: max-w 720, h 36
            - ≥1024: max-w 1280, h 36
        */}
        <div
          className="
            mx-auto w-full
            max-w-[345px] h-12
            sm:max-w-[720px] sm:h-9
            lg:max-w-[1280px]
            flex items-center justify-center
          "
        >
          <h2
            className={`
              ${figmaTextCommon}
              text-[16px] sm:text-[24px]
              text-black dark:text-black
            `}
          >
            {heading}
          </h2>
        </div>

        {/* Button row (centered) */}
        <div className="mx-auto w-full flex items-center justify-center">
          <Link
            href={buttonHref}
            className={`
              inline-flex items-center justify-center
              gap-2 sm:gap-2 
              w-[278px] h-[62px] sm:w-[375px] sm:h-[64px]
              px-2 py-4 sm:px-12 sm:py-4
              rounded-[16px]
              bg-[#AD002D] dark:bg-[#AD002D]
              text-white dark:text-white
              shadow-sm
              focus:outline-none focus-visible:ring-2 focus-visible:ring-black
            `}
            aria-label={buttonText}
          >
            {/* Button text (Figma: Noto Sans JP 700, 24 on ≥600; 16 on mobile) */}
            <span
              className={`${figmaTextCommon} text-white dark:text-white text-[16px] sm:text-[24px]`}
              style={{ lineHeight: "150%" }}
            >
              {buttonText}
            </span>

            {/* Icon:
               - Mobile: 25×18
               - ≥600: 21×24.248… with tiny upward nudge (-0.12px)
            */}
            <span className="relative block">
              {/* Mobile icon */}
              <span className="sm:hidden inline-block align-middle">
                <Image
                  src={iconSrc}
                  alt=""
                  width={25}
                  height={18}
                  className="object-contain"
                  priority={false}
                />
              </span>

              {/* ≥600 icon */}
              <span className="hidden sm:inline-block align-middle relative top-[-0.12px]">
                <Image
                  src={iconSrc}
                  alt=""
                  width={21}
                  height={24.24825668334961}
                  className="object-contain"
                  priority={false}
                />
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
