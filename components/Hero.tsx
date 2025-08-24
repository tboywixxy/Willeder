// src/app/page.tsx
import Link from "next/link";
import Image from "next/image";

// If you also render other sections, keep the imports (uncomment):
// import ServiceSection from "@/components/ServiceSection";
// import LatestBlogShowcase from "@/components/LatestBlogShowcase";
// import StanSection from "@/components/StanSection";

export const dynamic = "force-static";
export const revalidate = false;

export default function HomePage() {
  return (
    <>
      {/* HERO — text-first (LCP becomes this H1), images are non-blocking */}
      <section className="bg-gray-50">
        <div className="mx-auto w-full max-w-[1440px] px-4 md:px-20 py-10 md:py-16">
          <div className="grid gap-8 min-[1024px]:grid-cols-2 min-[1024px]:gap-16 place-items-center">
            {/* LEFT: real text (replaces the image-of-text) */}
            <div className="order-1 w-full max-w-[640px]">
              <h1
                className="
                  font-sans font-extrabold text-black
                  text-[clamp(28px,calc(100vw/1440*56),56px)]
                  leading-[1.1] tracking-[-0.01em]
                "
              >
                Build, ship, and iterate — fast.
              </h1>

              <p
                className="
                  mt-3 max-w-[60ch] text-black/70
                  font-sans text-[clamp(14px,calc(100vw/1440*18),18px)] leading-[1.6]
                "
              >
                Design, engineering, and brand systems that scale from idea to launch.
              </p>

              {/* Desktop CTA (≥1024) */}
              <div className="mt-6 hidden min-[1024px]:flex items-center justify-start">
                <Link
                  href="/blog"
                  prefetch={false}
                  className="
                    group inline-flex items-center justify-center
                    w-[405px] h-[68px] px-12 py-4 gap-6 rounded-[16px]
                    bg-[#AD002D] text-white shadow-sm
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-black
                    transition-colors duration-200 ease-out hover:bg-[#921A31]
                  "
                  aria-label="See more"
                >
                  <span className="font-sans font-bold text-[24px] leading-[150%] tracking-[0.05em]">
                    See more
                  </span>
                  <span className="relative inline-block w-[34px] h-[24px] transition-transform duration-200 ease-out group-hover:translate-x-2">
                    <Image
                      src="/images/services/arrow 2.png"
                      alt=""
                      fill
                      className="object-contain"
                      sizes="34px"
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                </Link>
              </div>
            </div>

            {/* RIGHT: decorative hero image (lazy; not LCP) */}
            <div className="order-2 relative w-full max-w-[640px] aspect-[640/695.04] rounded-lg overflow-hidden shadow mx-auto">
              <Image
                // keep your remote if you like; local /images/hero.jpg is even faster
                src="https://picsum.photos/seed/hero/1200/1400"
                alt="Product preview"
                fill
                className="object-cover"
                sizes="(max-width: 1023px) 100vw, 50vw"
                loading="lazy"        // ← important
                decoding="async"
                // helps layout stability hints for browsers
                style={{ display: "block", contain: "size layout paint" }}
              />
            </div>

            {/* Mobile/Tablet CTA (<1024) */}
            <div className="order-3 min-[1024px]:hidden w-full max-w-[640px] flex justify-center">
              <Link
                href="/blog"
                prefetch={false}
                className="
                  group inline-flex items-center justify-center
                  rounded-[16px] bg-[#AD002D] text-white shadow-sm
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-black
                  gap-4 px-6 py-4 w-[298px] h-[62px]
                  min-[600px]:gap-6 min-[600px]:px-12 min-[600px]:py-4
                  min-[600px]:w-[405px] min-[600px]:h-[68px]
                  transition-colors duration-200 ease-out hover:bg-[#921A31]
                "
                aria-label="See more"
              >
                <span className="font-sans font-bold leading-[150%] tracking-[0.05em] text-[20px] min-[600px]:text-[24px]">
                  See more
                </span>
                <span className="relative inline-block w-[25px] h-[18px] min-[600px]:w-[34px] min-[600px]:h-[24px] transition-transform duration-200 ease-out group-hover:translate-x-2">
                  <Image
                    src="/images/services/arrow 2.png"
                    alt=""
                    fill
                    className="object-contain"
                    sizes="(max-width: 599px) 25px, 34px"
                    loading="lazy"
                    decoding="async"
                  />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BELOW THE FOLD — defer work so Speed Index/TBT drop */}
      {/*
      <div style={{ contentVisibility: 'auto', containIntrinsicSize: '1100px' }}>
        <ServiceSection />
      </div>
      <div style={{ contentVisibility: 'auto', containIntrinsicSize: '1000px' }}>
        <LatestBlogShowcase />
      </div>
      <div style={{ contentVisibility: 'auto', containIntrinsicSize: '900px' }}>
        <StanSection />
      </div>
      */}
    </>
  );
}
