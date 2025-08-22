"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  // Close mobile menu when crossing up to tablet (≥600px)
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 600px)");
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return (
    <header className="border-b">
      {/* Full header box */}
      <div className="relative mx-auto w-full max-w-[1440px] h-12 sm:h-16 pl-4 sm:pl-6 pr-4 sm:pr-0 flex items-stretch justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center w-[176px] h-10 px-2 py-1 gap-[10px] font-semibold tracking-tight shrink-0"
        >
          <Image src="/logo.png" alt="Willeder logo" width={24} height={24} priority />
          <span>Willeder</span>
        </Link>

        {/* Right side */}
        <div className="flex items-stretch">
          {/* Nav links (show ≥600) */}
          <nav
            className="hidden sm:flex items-center h-16 sm:gap-12 md:w-[443px] md:gap-[96px]"
            aria-label="Primary"
          >
            <Link href="/" className="block hover:underline">Home</Link>
            <Link href="/blogs" className="block hover:underline">Blogs</Link>
          </nav>

          {/* Contact / hamburger */}
          <div className="bg-black h-full w-12 sm:w-[198px] sm:pl-8 sm:pr-4 sm:py-2 shrink-0">
            {/* Contact (≥600) */}
            <Link href="/contact" className="hidden sm:flex h-full items-center text-white">
              Contact
            </Link>

            {/* Hamburger (≤599) */}
            <button
              type="button"
              onClick={() => setOpen(v => !v)}
              className="sm:hidden flex h-full w-full items-center justify-center"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Menu</span>
              <div className="flex flex-col items-center gap-1">
                <span className="block w-6 h-0.5 bg-white" />
                <span className="block w-6 h-0.5 bg-white" />
              </div>
            </button>
          </div>

          {/* Mobile menu (only renders visibly on <600) */}
          <div
            id="mobile-menu"
            className={[
              "absolute left-4 right-4 bg-black text-white shadow-lg",
              "top-12",          // aligns under 48px header on mobile
              open ? "" : "hidden",
              "sm:hidden",       // hard-hide above 600 even if 'open' is true
            ].join(" ")}
            role="dialog"
            aria-modal="true"
          >
            <ul className="flex flex-col divide-y divide-white/10">
              <li>
                <Link href="/" className="block px-4 py-3" onClick={() => setOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="block px-4 py-3" onClick={() => setOpen(false)}>
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="block px-4 py-3" onClick={() => setOpen(false)}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
