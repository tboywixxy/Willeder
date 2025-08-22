import Link from "next/link";
import Image from "next/image";

type Props = {
  heading?: string;         // centered text in the top bar
  buttonText?: string;      // CTA text
  buttonHref?: string;      // link target
  iconSrc?: string;         // small icon (34x24)
};

export default function StanSection({
  heading = "STAN here to shine big bigger biggest",
  buttonText = "See more things here at the road",
  buttonHref = "/blogs",
  iconSrc = "/images/services/arrow 2.png",
}: Props) {
  return (
    <section className="bg-[#B9BDC6]">
      {/* Full section box — 1440×328 with paddings: pt=96, pr=80, pb=96, pl=80; gap=32 */}
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-20 pt-24 pb-24 space-y-8 md:h-[328px]">
        {/* Centered heading box — 1280×36 */}
        <div className="mx-auto w-full max-w-[1280px] md:h-[36px] flex items-center justify-center">
          <h2 className="text-black text-[clamp(18px,2vw,24px)] font-semibold text-center">
            {heading}
          </h2>
        </div>

        {/* Button row (centered). Button — 405×68; pY=16, pX=48; gap=24; radius=16; bg #AD002D, white text */}
        <div className="mx-auto w-full flex items-center justify-center">
          <Link
            href={buttonHref}
            className="
              inline-flex items-center justify-center gap-6
              px-12 py-4
              text-white font-medium
              bg-[#AD002D]
              rounded-[16px]
              shadow-sm
              focus:outline-none focus-visible:ring-2 focus-visible:ring-black
            "
          >
            <span>{buttonText}</span>
            <span className="relative block w-[34px] h-[24px]">
              <Image
                src={iconSrc}
                alt=""
                fill
                className="object-contain"
                sizes="34px"
                priority={false}
              />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
