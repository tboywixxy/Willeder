"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

type OfferItem = {
  q: string;
  a: string;
  src: string;
  alt: string;
};

export default function WhatWeOfferSection() {
  const items: OfferItem[] = useMemo(
    () => [
      {
        q: "Buy and Sell Crypto",
        a: "Buy and sell Bitcoin and other cryptocurrencies quickly, with simple steps and clear rates.",
        src: "/1i.png",
        alt: "Buy and Sell Crypto",
      },
      {
        q: "Send and Receive Money",
        a: "Send money to friends and family and receive payments easily, anytime you need it.",
        src: "/2i.png",
        alt: "Send and Receive Money",
      },
      {
        q: "Refer and Earn",
        a: "Invite others to EasyLife Exchange and earn rewards when they start using the platform.",
        src: "/3i.png",
        alt: "Refer and Earn",
      },
      {
        q: "Pay Bills Easily",
        a: "Pay your bills in a few taps with a smooth, reliable payment flow.",
        src: "/4.png",
        alt: "Pay Bills Easily",
      },
    ],
    []
  );

  const [active, setActive] = useState(0);

  return (
    <section id="offers" className="bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8 md:py-16 lg:px-12">
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          What We Offer
        </h2>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="space-y-3">
            {items.map((it, idx) => {
              const open = idx === active;

              return (
                <div key={it.q} className="border-b border-slate-200 pb-3">
                  <button
                    type="button"
                    onClick={() => setActive(idx)}
                    className="flex w-full items-center justify-between py-3 text-left"
                    aria-expanded={open}
                  >
                    <span className="text-sm font-semibold text-slate-900">
                      {it.q}
                    </span>
                    <span className="text-[#A228BB]">{open ? "–" : "+"}</span>
                  </button>

                  <div
                    className={[
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    ].join(" ")}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-3 text-sm leading-relaxed text-slate-600">
                        {it.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center">
            <div className="relative h-[320px] w-full max-w-[520px] sm:h-[360px]">
              <Image
                src={items[active].src}
                alt={items[active].alt}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 520px"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
