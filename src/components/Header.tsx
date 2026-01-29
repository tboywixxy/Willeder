"use client";

import Link from "next/link";
import Image from "next/image";

const nav = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Rate Calculator", href: "#rate" },
  { label: "Contact Us", href: "#contact" },
  { label: "About Us", href: "#about2" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-[#FBF7FF]/90 backdrop-blur-md">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="#"
            className="flex items-center gap-3"
            aria-label="EasyLife Exchange"
          >
            <div className="relative h-9 w-14">
              <Image
                src="/logo.png"
                alt="EasyLife Exchange logo"
                fill
                className="object-contain"
                sizes="56px"
                priority
              />
            </div>

            <span className="hidden sm:block text-[15px] font-semibold tracking-tight text-slate-900">
              EasyLife Exchange
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {nav.map((item) => (
              <a
                key={`${item.label}-${item.href}`}
                href={item.href}
                className="text-[13.5px] font-medium text-slate-700 transition-colors hover:text-slate-950"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#download"
            className="
              inline-flex h-10 items-center justify-center rounded-full px-6
              text-sm font-semibold text-white
              bg-[#A228BB] shadow-sm
              transition-all hover:brightness-110 active:scale-[0.98]
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A228BB]/40 focus-visible:ring-offset-2
            "
          >
            Download app now
          </a>
        </div>
      </div>
    </header>
  );
}
