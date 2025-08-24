"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { notoSansJp } from "@/app/fonts";

export default function Header() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  // Auto-close the menu when viewport crosses ≥ 600px
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 600px)");
    const handler = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Close on outside click / Escape; lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node | null;
      const el = headerRef.current;
      if (el && t && el.contains(t)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);

    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const BASE = 1440;
  const navText =
    `${notoSansJp.className} font-bold ` +
    `text-[clamp(14px,calc(100vw/${BASE}*16),16px)] leading-[1.5] tracking-[0.05em] align-middle`;

  const headerHClamp = "clamp(48px,calc(100vw/1440*64),64px)";

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-white border-b">
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
                priority
                sizes="(min-width:600px) 176px, 128px"
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
                  whitespace-nowrap shrink-0 min-[600px]:mr-8 min-[768px]:mr-[96px]
                "
                aria-label="Primary"
              >
                <div className="flex items-center gap-[96px]">
                  <Link href="/" prefetch={false} className={`${navText} text-[#AD002D] hover:underline`}>Home</Link>
                  <Link href="/blog" prefetch={false} className={`${navText} text-black hover:underline`}>Blogs</Link>
                </div>
              </nav>

              {/* Contact (desktop) */}
              <div
                className="
                  hidden min-[600px]:flex shrink-0 w-[198px]
                  h-[clamp(48px,calc(100vw/1440*64),64px)]
                  pt-2 pr-4 pb-2 pl-8 gap-4 bg-black
                "
              >
                <Link
                  href="/contact"
                  prefetch={false}
                  className={`group flex h-full w-full items-center justify-center gap-3 text-white ${navText}`}
                >
                  <span>Contact</span>
                  <span className="relative block w-[34px] h-[24px]">
                    <Image
                      src="/images/services/arrow 2.png"
                      alt=""
                      fill
                      className="object-contain group-hover:translate-x-1 transition-transform duration-200"
                      sizes="34px"
                      priority={false}
                    />
                  </span>
                </Link>
              </div>
            </div>

            {/* <600: Hamburger */}
            <div className="ml-auto h-full min-[600px]:hidden flex items-center">
              <button
                type="button"
                onClick={() => setOpen(v => !v)}
                className="w-12 h-12 flex items-center justify-center"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
              >
                <span className="sr-only">Menu</span>
                <div className="relative h-5 w-6">
                  {/* top */}
                  <span
                    className={[
                      "absolute left-0 right-0 top-1/2 block h-0.5 bg-black transition-transform duration-200",
                      open ? "rotate-45 translate-y-0" : "-translate-y-1.5",
                    ].join(" ")}
                    style={{ transformOrigin: "50% 50%" }}
                  />
                  {/* bottom */}
                  <span
                    className={[
                      "absolute left-0 right-0 top-1/2 block h-0.5 bg-black transition-transform duration-200",
                      open ? "-rotate-45 translate-y-0" : "translate-y-1.5",
                    ].join(" ")}
                    style={{ transformOrigin: "50% 50%" }}
                  />
                </div>
              </button>
            </div>

            {/* Mobile menu (fixed) */}
            <div
              id="mobile-menu"
              className={[
                "fixed inset-x-0 min-[600px]:hidden bg-white text-black shadow-lg border-b z-[100] will-change-transform",
                open ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-2",
                "transition-all duration-200",
              ].join(" ")}
              role="dialog"
              aria-modal="true"
              style={{ top: headerHClamp }}
            >
              <ul className="flex flex-col items-center justify-center text-center divide-y divide-black/10">
                <li className="w-full">
                  <Link href="/" prefetch={false} className={`${navText} block px-4 py-3 text-black`} onClick={() => setOpen(false)}>
                    Home
                  </Link>
                </li>
                <li className="w-full">
                  <Link href="/blog" prefetch={false} className={`${navText} block px-4 py-3 text-black`} onClick={() => setOpen(false)}>
                    Blogs
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    href="/contact"
                    prefetch={false}
                    onClick={() => setOpen(false)}
                    className="group my-3 mx-4 flex items-center justify-center gap-4 px-12 py-4 bg-[#AD002D] text-white rounded-[16px] hover:bg-[#c51644] transition-colors duration-200"
                  >
                    <span className={`${notoSansJp.className} font-bold text-[clamp(18px,calc(100vw/1440*24),24px)] leading-[1.5] tracking-[0.05em]`}>Contact</span>
                    <span className="relative block w-[21px] h-[24.25px] -top-[0.12px]">
                      <Image
                        src="/images/services/arrow 2.png"
                        alt=""
                        fill
                        className="object-contain group-hover:translate-x-1 transition-transform duration-200"
                        sizes="21px"
                        priority={false}
                      />
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
