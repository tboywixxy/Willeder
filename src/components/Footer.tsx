"use client";

import Image from "next/image";
import Link from "next/link";
import { FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

type Social = {
  label: string;
  href: string;
  icon: React.ReactNode;
  bg: string;
};

export default function FooterEasyLife() {
  const socials: Social[] = [
    {
      label: "LinkedIn",
      href: "https://linkedin.com",
      icon: <FaLinkedinIn size={20} />,
      bg: "bg-[#0A66C2]",
    },
    {
      label: "X",
      href: "https://x.com",
      icon: <FaXTwitter size={18} />,
      bg: "bg-black",
    },
    {
      label: "Instagram",
      href: "https://instagram.com",
      icon: <FaInstagram size={20} />,
      bg: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#515BD4]",
    },
    {
      label: "Facebook",
      href: "https://facebook.com",
      icon: <FaFacebookF size={20} />,
      bg: "bg-[#1877F2]",
    },
  ];

  return (
    <footer className="w-full bg-[#A228BB] text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <Image
                src="/logo.png"
                alt="EasyLife Exchange"
                width={72}
                height={44}
                className="h-auto w-[72px]"
                priority
              />
              <div className="leading-tight">
                <p className="text-lg font-semibold">EasyLife Exchange</p>
                <p className="text-xs text-white/80">Fast. Simple. Secure.</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-sm text-white/90">
                Follow us on our socials for daily updates:
              </p>

              <div className="flex items-center gap-4">
                {socials.map((s) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noreferrer"
                    className={[
                      "grid h-11 w-11 place-items-center rounded-xl",
                      "ring-1 ring-white/20 shadow-sm",
                      "transition-transform hover:scale-[1.03] active:scale-[0.98]",
                      s.bg,
                    ].join(" ")}
                  >
                    {s.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 md:items-center">
            <p className="text-sm font-semibold">Get the app:</p>

            <div className="flex flex-wrap items-center gap-6">
              <Link
                href="https://play.google.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Get it on Google Play"
                className="group"
              >
                <div className="relative h-[68px] w-[140px]">
                  <Image
                    src="/google.png"
                    alt="Get it on Google Play"
                    fill
                    className="object-contain transition-transform group-hover:scale-[1.02]"
                    sizes="220px"
                  />
                </div>
              </Link>

              <Link
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noreferrer"
                aria-label="Download on the App Store"
                className="group"
              >
                <div className="relative h-[68px] w-[140px]">
                  <Image
                    src="/apple.png"
                    alt="Download on the App Store"
                    fill
                    className="object-contain transition-transform group-hover:scale-[1.02]"
                    sizes="220px"
                  />
                </div>
              </Link>
            </div>

            <p className="max-w-[440px] text-xs text-white/85 md:text-center">
              Download EasyLife Exchange to buy/sell crypto, pay bills, send money,
              and trade giftcards — anywhere, anytime.
            </p>
          </div>

          <div className="text-left md:text-right">
            <p className="text-sm text-white/90">Copyright © 2022</p>
            <p className="text-sm font-semibold">EasyLifeExchange</p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/15">
              <span className="h-2 w-2 rounded-full bg-white" />
              <span className="text-xs text-white/90">Support available 24/7</span>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6">
          <div className="flex flex-col gap-3 text-xs text-white/80 md:flex-row md:items-center md:justify-between">
            <p>Built for seamless exchange & payments.</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <a href="#privacy" className="hover:text-white">
                Privacy
              </a>
              <a href="#terms" className="hover:text-white">
                Terms
              </a>
              <a href="#contact" className="hover:text-white">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
