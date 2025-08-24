// src/components/Header.tsx  (Server Component – NO "use client")
import Link from "next/link";
import Image from "next/image";

const BASE = 1440;
const headerHClamp = "clamp(48px,calc(100vw/1440*64),64px)";
// System fonts → no layout-wide webfont cost
const navText =
  `font-sans font-bold text-[clamp(14px,calc(100vw/${BASE}*16),16px)] leading-[1.5] tracking-[0.05em] align-middle`;

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="mx-auto w-full max-w-[1440px]">
        <div
          className="
            flex items-stretch justify-between
            h-[clamp(48px,calc(100vw/1440*64),64px)]
            pl-[clamp(16px,calc(100vw/1440*24),24px)]
            pr-4 min-[600px]:pr-0
          "
        >
          {/* Brand */}
          <div className="flex items-center h-full shrink-0">
            <Link
              href="/"
              prefetch={false}
              className="flex items-center h-10 w-[clamp(128px,calc(100vw/1440*176),176px)] p-1 min-[600px]:py-1 min-[600px]:px-2 gap-[10px]"
              aria-label="Willeder Home"
            >
              <Image
                src="/willeder-logo.png"
                alt="Willeder logo"
                width={176}
                height={40}
                sizes="(max-width:600px) 128px, 176px"
                decoding="async"
                priority={false}
                style={{ display: "block", contain: "size layout" }}
              />
            </Link>
          </div>

          {/* ≥600: inline nav */}
          <div className="hidden min-[600px]:flex items-center gap-[96px] ml-auto">
            <nav aria-label="Primary" className="flex items-center">
              <Link href="/" prefetch={false} className={`${navText} text-[#AD002D] hover:underline`}>Home</Link>
              <Link href="/blog" prefetch={false} className={`${navText} text-black hover:underline`}>Blogs</Link>
            </nav>
            <Link
              href="/contact"
              prefetch={false}
              className={`inline-flex items-center justify-center gap-3 text-white ${navText}
                         w-[198px] h-[clamp(48px,calc(100vw/1440*64),64px)] px-8 bg-black hover:bg-[#1a1a1a] rounded-none`}
            >
              <span>Contact</span>
              <span className="relative block w-[34px] h-[24px]">
                <Image src="/images/services/arrow 2.png" alt="" fill className="object-contain" sizes="34px" />
              </span>
            </Link>
          </div>

          {/* <600: details/summary = hamburger (pure CSS, accessible) */}
          <details className="ml-auto min-[600px]:hidden">
            <summary
              className="w-12 h-12 flex items-center justify-center list-none cursor-pointer"
              aria-label="Toggle menu"
            >
              <span className="sr-only">Menu</span>
              <span className="relative h-5 w-6 block">
                {/* top bar */}
                <span className="absolute left-0 right-0 top-1/2 block h-0.5 bg-black transition-transform duration-200 group-open:rotate-45 -translate-y-1.5" />
                {/* bottom bar */}
                <span className="absolute left-0 right-0 top-1/2 block h-0.5 bg-black transition-transform duration-200 group-open:-rotate-45 translate-y-1.5" />
              </span>
            </summary>

            <div
              className="fixed inset-x-0 bg-white text-black shadow-lg border-b z-[100] transition-transform duration-200 translate-y-0"
              style={{ top: headerHClamp }}
              role="dialog"
              aria-modal="true"
            >
              <ul className="flex flex-col items-center justify-center text-center divide-y divide-black/10">
                <li className="w-full">
                  <Link href="/" prefetch={false} className={`${navText} block px-4 py-3 text-black`}>Home</Link>
                </li>
                <li className="w-full">
                  <Link href="/blog" prefetch={false} className={`${navText} block px-4 py-3 text-black`}>Blogs</Link>
                </li>
                <li className="w-full">
                  <Link
                    href="/contact"
                    prefetch={false}
                    className="group my-3 mx-4 flex items-center justify-center gap-4 px-12 py-4 bg-[#AD002D] text-white rounded-[16px] hover:bg-[#c51644] transition-colors duration-200"
                  >
                    <span className="font-sans font-bold text-[clamp(18px,calc(100vw/1440*24),24px)] leading-[1.5] tracking-[0.05em]">
                      Contact
                    </span>
                    <span className="relative block w-[21px] h-[24.25px] -top-[0.12px]">
                      <Image src="/images/services/arrow 2.png" alt="" fill className="object-contain" sizes="21px" />
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
