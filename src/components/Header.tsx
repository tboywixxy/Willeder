// src/components/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname() || "/";

  // Active states
  const isBlogActive =
    pathname === "/blog" ||
    pathname === "/blog" ||
    pathname.startsWith("/blog/");
  const isHomeActive = pathname === "/" && !isBlogActive;

  const BASE = 1440;
  const headerHClamp = "clamp(48px,calc(100vw/1440*64),64px)";

  const navText =
    `font-sans font-bold ` +
    `text-[clamp(14px,calc(100vw/${BASE}*16),16px)] ` +
    `leading-[1.5] tracking-[0.05em] align-middle`;

  const linkCls = (active: boolean) =>
    `${navText} ${active ? "text-[#AD002D]" : "text-black"} hover:underline`;

  const mobileCtaText =
    `font-sans font-bold text-[clamp(18px,calc(100vw/${BASE}*24),24px)] leading-[1.5] tracking-[0.05em]`;

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
              className="
                flex items-center
                h-10
                w-[clamp(128px,calc(100vw/1440*176),176px)]
                p-1 min-[600px]:py-1 min-[600px]:px-2
                gap-[10px]
              "
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
                className="block"
              />
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-stretch flex-1 min-w-0">
            {/* ≥600: Nav + Contact */}
            <div className="hidden min-[600px]:flex items-stretch ml-auto">
              <nav
                className="
                  flex items-center h-[clamp(48px,calc(100vw/1440*64),64px)]
                  whitespace-nowrap shrink-0
                  min-[600px]:mr-8 min-[768px]:mr-[96px]
                "
                aria-label="Primary"
              >
                <div className="flex items-center gap-[96px]">
                  <Link href="/" prefetch={false} className={linkCls(isHomeActive)}>
                    Home
                  </Link>
                  {/* Point Blogs to /blogs (list) but keep active for /blog/[slug] too */}
                  <Link href="/blog" prefetch={false} className={linkCls(isBlogActive)}>
                    Blogs
                  </Link>
                </div>
              </nav>

              {/* Contact (desktop) — CTA stays the same regardless of route */}
              <div
                className="
                  hidden min-[600px]:flex shrink-0
                  w-[198px]
                  h-[clamp(48px,calc(100vw/1440*64),64px)]
                  pt-2 pr-4 pb-2 pl-8 gap-4
                  bg-black
                "
              >
                <Link
                  href="/contact"
                  prefetch={false}
                  className={`group flex h-full w-full items-center justify-center gap-3 text-white ${navText} transition-colors duration-200 hover:bg-[#1a1a1a]`}
                >
                  <span>Contact</span>
                  <span className="relative block w-[34px] h-[24px]">
                    <Image
                      src="/images/services/arrow 2.png"
                      alt=""
                      fill
                      sizes="34px"
                      className="object-contain transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </div>
            </div>

            {/* <600: Hamburger (CSS-only) */}
            <details className="ml-auto min-[600px]:hidden group relative">
              <summary
                className="
                  w-12 h-12 flex items-center justify-center
                  list-none cursor-pointer select-none
                  [&::-webkit-details-marker]:hidden
                "
                aria-label="Toggle menu"
              >
                <span className="sr-only">Menu</span>
                <span className="relative h-5 w-6 block">
                  {/* top bar */}
                  <span
                    className="
                      absolute left-0 right-0 top-1/2 block h-0.5 bg-black
                      -translate-y-1.5 transition-transform duration-200
                      group-open:translate-y-0 group-open:rotate-45
                    "
                  />
                  {/* bottom bar */}
                  <span
                    className="
                      absolute left-0 right-0 top-1/2 block h-0.5 bg-black
                      translate-y-1.5 transition-transform duration-200
                      group-open:translate-y-0 group-open:-rotate-45
                    "
                  />
                </span>
              </summary>

              {/* Mobile sheet */}
              <div
                className="
                  fixed inset-x-0 z-[100] border-b bg-white text-black shadow-lg
                  opacity-0 -translate-y-2 pointer-events-none
                  transition-[opacity,transform] duration-200
                  group-open:opacity-100 group-open:translate-y-0 group-open:pointer-events-auto
                "
                style={{ top: headerHClamp }}
                role="dialog"
                aria-modal="true"
              >
                <ul className="flex flex-col items-center justify-center text-center divide-y divide-black/10">
                  <li className="w-full">
                    <Link
                      href="/"
                      prefetch={false}
                      className={`${linkCls(isHomeActive)} block px-4 py-3`}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="w-full">
                    <Link
                      href="/blog"
                      prefetch={false}
                      className={`${linkCls(isBlogActive)} block px-4 py-3`}
                    >
                      Blogs
                    </Link>
                  </li>
                  <li className="w-full">
                    {/* Contact CTA (mobile) — not "active" colored */}
                    <Link
                      href="/contact"
                      prefetch={false}
                      className="
                        group my-3 mx-4 flex items-center justify-center gap-4
                        px-12 py-4 bg-[#AD002D] text-white rounded-[16px]
                        transition-colors duration-200 hover:bg-[#c51644]
                      "
                    >
                      <span className={mobileCtaText}>Contact</span>
                      <span className="relative block w-[21px] h-[24.25px] -top-[0.12px] transition-transform duration-200 group-hover:translate-x-1">
                        <Image
                          src="/images/services/arrow 2.png"
                          alt=""
                          fill
                          sizes="21px"
                          className="object-contain"
                        />
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}
