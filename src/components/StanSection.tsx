// src/components/StanSection.tsx
import Image from "next/image";
import Link from "next/link";
import { notoSansJp } from "@/app/fonts";
import Reveal from "@/components/Reveal";

// ✅ define props
type Props = {
  heading?: string;
  buttonText?: string;
  buttonHref?: string;
  iconSrc?: string;
};

export default function StanSection({
  heading = "どんな内容でも、お気軽にご相談ください。",
  buttonText = "お問い合わせはこちら",
  buttonHref = "/blog",
  iconSrc = "/images/services/arrow 2.png",
}: Props) {
  const figmaTextCommon =
    `${notoSansJp.className} font-bold leading-[130%] tracking-[0.0009em] text-center`;

  return (
    <section className="bg-[#B9BDC6] dark:bg-[#B9BDC6]">
      <div
        className="
          mx-auto w-full max-w-[1440px]
          h-[324px] sm:h-[328px] md:h-[306px]
          pt-22 pb-24
          px-4 sm:px-6 md:px-6 lg:px-20
          space-y-7
        "
      >
        {/* Heading: slide in from LEFT, and slide back out when leaving */}
        <Reveal
          as="div"
          x={-40}
          y={0}
          duration={600}
          once={false}
          threshold={0.35}
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
        </Reveal>

        {/* Button row: slide in from RIGHT, and slide back out when leaving */}
        <Reveal
          as="div"
          x={40}
          y={0}
          delay={80}
          duration={600}
          once={false}
          threshold={0.35}
          className="mx-auto w-full flex items-center justify-center"
        >
          <Link
            href={buttonHref}
            className="
              inline-flex items-center justify-center
              gap-2 sm:gap-2
              w-[278px] h-[62px] sm:w-[375px] sm:h-[64px]
              px-2 py-4 sm:px-12 sm:py-4
              rounded-[16px]
              bg-[#AD002D] dark:bg-[#AD002D]
              text-white dark:text-white
              shadow-sm
              focus:outline-none focus-visible:ring-2 focus-visible:ring-black
            "
            aria-label={buttonText}
          >
            <span
              className={`${figmaTextCommon} text-white dark:text-white text-[16px] sm:text-[24px] whitespace-nowrap`}
              style={{ lineHeight: "150%" }}
            >
              {buttonText}
            </span>

            <span className="relative block">
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
        </Reveal>
      </div>
    </section>
  );
}
