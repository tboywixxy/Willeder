// src/app/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div>
      <section className="bg-gray-50 min-[1024px]:min-h-[756px]">
        <div className="mx-auto w-full max-w-[1440px] px-4 md:px-18 py-10 md:py-10">
          {/* 1 col by default & 600–1023; 2 cols at ≥1024 */}
          <div className="grid gap-8 min-[1024px]:grid-cols-2 min-[1024px]:gap-16 place-items-center">
            {/* LEFT: image + (desktop CTA under this at ≥1024) */}
            <div className="order-1 w-full max-w-[640px]">
              {/* Image replacing the heading/paragraph */}
              <div className="relative w-full aspect-[640/327.2979125977] mx-auto bg-transparent">
                <Image
                  src="/ciff-2.png"
                  alt="Intro visual"
                  fill
                  className="object-contain ml-2 mt-1 origin-left scale-[1] min-[1280px]:scale-[1]"
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  priority
                />
              </div>

              {/* Desktop CTA ONLY (≥1024) */}
              <div className="mt-2 hidden min-[1024px]:flex items-center justify-start">
                <Link
                  href="/blog"
                  className="
                    group
                    inline-flex items-center justify-center
                    w-[382px] h-[64px]
                    px-2 py-4 gap-4
                    rounded-[16px]
                    bg-[#AD002D] text-white
                    shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-black
                    transition-colors duration-200 ease-out
                    hover:bg-[#921A31]
                  "
                  aria-label="See more"
                >
                  <span className="font-bold text-[19px] pr-1 leading-[150%] tracking-[0.25em]">
                    お問い合わせはこちら
                  </span>
                  <span className="relative inline-block w-[32px] h-[26px] transition-transform duration-200 ease-out group-hover:translate-x-2">
                    <Image
                      src="/images/services/arrow 2.png"
                      alt=""
                      fill
                      className="object-contain"
                      sizes="34px"
                    />
                  </span>
                </Link>
              </div>
            </div>

{/* RIGHT: video (replaces the image) */}
<div className="order-2 relative w-full  max-w-[640px] aspect-[640/695.04] rounded-lg overflow-hidden mx-auto">
  <video
    className="w-full h-full object-cover mt-8 block"
    autoPlay
    loop
    muted
    playsInline
    preload="metadata"            // good Lighthouse score & quick first frame
    aria-label="Hero animation"
  >
    <source src="/IT-video.webm" type="video/webm" />
    {/* Optional fallback for browsers without WebM */}
    <source src="/media/hero.mp4" type="video/mp4" />
    {/* If both fail */}
    Your browser does not support the video tag.
  </video>
</div>


            {/* Mobile/Tablet CTA (<1024) */}
            <div className="order-3 min-[1024px]:hidden w-full max-w-[640px] flex justify-center">
              <Link
                href="/blog"
                className="
                  group
                  inline-flex items-center justify-center
                  rounded-[16px] bg-[#AD002D] text-white shadow-sm
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-black
                  gap-4 px-6 py-4 w-[298px] h-[62px]
                  min-[600px]:gap-6 min-[600px]:px-12 min-[600px]:py-4
                  min-[600px]:w-[405px] min-[600px]:h-[68px]
                  transition-colors duration-200 ease-out
                  hover:bg-[#921A31]
                "
                aria-label="See more"
              >
                <span className="font-bold leading-[150%] tracking-[0.05em] text-[20px] min-[600px]:text-[24px]">
                  See more
                </span>
                <span className="relative inline-block w-[25px] h-[18px] min-[600px]:w-[34px] min-[600px]:h-[24px] transition-transform duration-200 ease-out group-hover:translate-x-2">
                  <Image
                    src="/images/services/arrow 2.png"
                    alt=""
                    fill
                    className="object-contain"
                    sizes="(max-width: 599px) 25px, 34px"
                  />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
