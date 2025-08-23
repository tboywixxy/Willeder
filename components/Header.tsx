"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { notoSansJp } from "@/app/fonts";

export default function Header() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  // Close on ≥600, scroll, outside tap, Esc
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 600px)");
    const handler = (e: MediaQueryListEvent) => { if (e.matches) setOpen(false); };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onScroll = () => setOpen(false);
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node | null;
      const el = headerRef.current;
      if (el && t && el.contains(t)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const figmaText =
    `${notoSansJp.className} font-bold text-base leading-[150%] ` +
    `tracking-[0.05em] text-center align-middle`;

  return (
    <header ref={headerRef} className="sticky top-0 z-50 overflow-x-clip">
      <div className="relative mx-auto w-full max-w-[1440px] bg-white dark:bg-white border-b">
        <div className="h-12 min-[600px]:h-16 pl-4 min-[600px]:pl-6 pr-4 min-[600px]:pr-0 flex items-stretch">
          {/* Brand */}
          <div className="flex items-center h-full shrink-0">
            <Link
              href="/"
              className="flex items-center h-10 w-[176px] px-2 py-1 gap-[10px]"
              aria-label="Willeder Home"
            >
              <Image src="/willeder-logo.png" alt="Willeder logo" width={176} height={40} priority />
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-stretch flex-1 min-w-0">
            {/* ≥600: Nav + Contact pinned right */}
            <div className="hidden min-[600px]:flex items-stretch ml-auto">
              <nav
                className="
                  flex items-center h-16 whitespace-nowrap shrink-0
                  min-[600px]:mr-8
                  min-[768px]:mr-[96px]
                "
                aria-label="Primary"
              >
                <div
                  className="
                    flex items-center py-2
                    min-[600px]:gap-8
                    min-[768px]:gap-[64px]
                  "
                >
                  <Link href="/" className={`${figmaText} text-black hover:underline`}>Home</Link>
                  <Link href="/blog" className={`${figmaText} text-black hover:underline`}>Blogs</Link>
                </div>
              </nav>

              <div className="h-16 w-[198px] pl-8 pr-4 py-2 shrink-0 bg-black">
                <Link href="/contact" className={`flex h-full items-center justify-center gap-3 text-white ${figmaText}`}>
                  <span>Contact</span>
                  <Image src="/images/services/arrow 2.png" alt="Contact icon" width={34} height={24} />
                </Link>
              </div>
            </div>

            {/* <600: Hamburger — now visible at ALL widths below 600 */}
            <div className="ml-auto h-full w-12 flex min-[600px]:hidden shrink-0">
              <button
                type="button"
                onClick={() => setOpen(v => !v)}
                className="flex h-full w-full items-center justify-center"
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

{/* Mobile menu */}
<AnimatePresence>
  {open && (
    <motion.div
      id="mobile-menu"
      key="mobile-menu"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
      className="absolute left-4 right-4 top-12 min-[600px]:hidden bg-white text-black shadow-lg rounded-md overflow-hidden"
      role="dialog"
      aria-modal="true"
    >
      <ul className="flex flex-col divide-y divide-black/10">
        <li>
          <Link
            href="/"
            className={`${figmaText} block px-4 py-3 text-black`}
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/blog"
            className={`${figmaText} block px-4 py-3 text-black`}
            onClick={() => setOpen(false)}
          >
            Blogs
          </Link>
        </li>
        <li>
          {/* Contact styled like the red submit button */}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="
              flex items-center justify-center gap-4 px-12 py-4
              bg-[#AD002D] text-white rounded-[16px] mx-4 my-3
              font-['Noto_Sans_JP'] font-bold text-[24px] leading-[150%] tracking-[0.05em]
            "
          >
            <span>Contact</span>
            <span className="relative block w-[21px] h-[24.25px] -top-[0.12px]">
              <Image
                src="/images/services/arrow 2.png"
                alt="Contact icon"
                fill
                className="object-contain"
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
