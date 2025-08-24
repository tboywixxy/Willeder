// src/components/Header.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { notoSansJp } from "@/app/fonts";

export default function Header() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  // Close menu when viewport crosses >= 600
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 600px)");
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Close on scroll, outside tap, Esc; lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const onScroll = () => setOpen(false);
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node | null;
      const el = headerRef.current;
      if (el && t && el.contains(t)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const BASE = 1440;

  const navText =
    `${notoSansJp.className} font-bold ` +
    `text-[clamp(14px,calc(100vw/${BASE}*16),16px)] ` +
    `leading-[1.5] tracking-[0.05em] align-middle`;

  const mobileCtaText =
    `font-bold text-[clamp(18px,calc(100vw/${BASE}*24),24px)] leading-[1.5] tracking-[0.05em]`;

  // Same clamp used for header height; use as a string for CSS top
  const headerHClamp = "clamp(48px,calc(100vw/1440*64),64px)";

  return (
    <header ref={headerRef} className="sticky top-0 z-50 overflow-x-clip">
      <div className="relative mx-auto w-full max-w-[1440px] bg-white border-b">
        {/* Frame */}
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
                priority
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
                  <Link
                    href="/"
                    className={`${navText} text-[#AD002D] hover:underline`}
                  >
                    Home
                  </Link>
                  <Link
                    href="/blog"
                    className={`${navText} text-black hover:underline`}
                  >
                    Blogs
                  </Link>
                </div>
              </nav>

              {/* Contact (desktop) with hover animation */}
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
                  className={`group flex h-full w-full items-center justify-center gap-3 text-white ${navText} transition-colors duration-200 hover:bg-[#1a1a1a]`}
                >
                  <span>Contact</span>
                  <span className="relative block w-[34px] h-[24px]">
                    <Image
                      src="/images/services/arrow 2.png"
                      alt="Contact icon"
                      fill
                      className="object-contain transition-transform duration-200 group-hover:translate-x-1"
                      sizes="34px"
                    />
                  </span>
                </Link>
              </div>
            </div>

            {/* <600: Hamburger */}
            <div className="ml-auto h-full min-[600px]:hidden flex items-center">
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="w-12 h-12 flex items-center justify-center"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
              >
                <span className="sr-only">Menu</span>
                <div className="relative h-5 w-6">
                  <motion.span
                    className="absolute left-0 right-0 top-1/2 block h-0.5 bg-black"
                    initial={false}
                    animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    style={{ transformOrigin: "50% 50%" }}
                  />
                  <motion.span
                    className="absolute left-0 right-0 top-1/2 block h-0.5 bg-black"
                    initial={false}
                    animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    style={{ transformOrigin: "50% 50%" }}
                  />
                </div>
              </button>
            </div>

            {/* Mobile menu (edge-to-edge, fixed) */}
            <AnimatePresence>
              {open && (
                <motion.div
                  id="mobile-menu"
                  key="mobile-menu"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  className="
                    fixed inset-x-0
                    min-[600px]:hidden
                    bg-white text-black shadow-lg border-b
                    z-[100]
                  "
                  role="dialog"
                  aria-modal="true"
                  style={{ top: headerHClamp }}
                >
                  <ul className="flex flex-col items-center justify-center text-center divide-y divide-black/10">
                    <li className="w-full">
                      <Link
                        href="/"
                        className={`${navText} block px-4 py-3 text-black`}
                        onClick={() => setOpen(false)}
                      >
                        Home
                      </Link>
                    </li>
                    <li className="w-full">
                      <Link
                        href="/blog"
                        className={`${navText} block px-4 py-3 text-black`}
                        onClick={() => setOpen(false)}
                      >
                        Blogs
                      </Link>
                    </li>
                    <li className="w-full">
                      {/* Contact CTA (mobile) with hover motion */}
                      <Link
                        href="/contact"
                        onClick={() => setOpen(false)}
                        className="
                          group my-3
                          mx-4
                          flex items-center justify-center gap-4 px-12 py-4
                          bg-[#AD002D] text-white rounded-[16px]
                          transition-colors duration-200 hover:bg-[#c51644]
                        "
                      >
                        <span className={mobileCtaText}>Contact</span>
                        <span className="relative block w-[21px] h-[24.25px] -top-[0.12px]">
                          <Image
                            src="/images/services/arrow 2.png"
                            alt="Contact icon"
                            fill
                            className="object-contain transition-transform duration-200 group-hover:translate-x-1"
                            sizes="21px"
                          />
                        </span>
                      </Link>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
