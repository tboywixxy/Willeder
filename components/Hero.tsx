// src/components/Hero.tsx  (SERVER component)
import Image from "next/image";
import Link from "next/link";
// local file in /public/images/hero-right.jpg (add your own image)
import heroRight from "../public/1.png";

export default function Hero() {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-20 py-10 md:py-16 grid gap-8 min-[1024px]:grid-cols-2 min-[1024px]:gap-16 place-items-center">
        {/* LEFT: real text becomes LCP */}
        <div className="w-full max-w-[640px]">
          <h1 className="font-sans font-extrabold text-black text-[clamp(28px,calc(100vw/1440*56),56px)] leading-[1.1]">
            Build, ship, and iterate — fast.
          </h1>
          <p className="mt-3 max-w-[60ch] text-black/70 font-sans text-[clamp(14px,calc(100vw/1440*18),18px)] leading-[1.6]">
            Design, engineering, and brand systems that scale from idea to launch.
          </p>

          {/* CTA */}
          <div className="mt-6 flex gap-4">
            <Link
              href="/blog"
              prefetch={false}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-[14px] bg-[#AD002D] text-white font-sans font-semibold hover:bg-[#bf1d43] focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              See more
              <svg width="28" height="20" viewBox="0 0 34 24" aria-hidden="true" className="shrink-0">
                <path d="M0 12h30" stroke="currentColor" strokeWidth="2" />
                <path d="M22 4l8 8-8 8" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </Link>
          </div>
        </div>

        {/* RIGHT: decorative image (lazy, not priority) */}
        <div className="relative w-full max-w-[640px] aspect-[640/695.04] rounded-lg overflow-hidden shadow mx-auto">
          <Image
            src={heroRight}
            alt="Product preview"
            fill
            className="object-cover"
            sizes="(max-width: 1023px) 100vw, 50vw"
            loading="lazy"
            decoding="async"
            placeholder="blur"
            style={{ display: "block", contain: "size layout paint" }}
          />
        </div>
      </div>
    </section>
  );
}
