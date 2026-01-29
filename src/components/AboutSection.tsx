"use client";

import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="bg-[#FBF7FF]">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-12 sm:px-8 md:py-16 lg:px-12">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative mx-auto w-full max-w-[520px]">
            <div className="relative aspect-[560/520] w-full">
              <Image
                src="/phone-way.png"
                alt="EasyLife Exchange app screen"
                fill
                priority={false}
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="w-full max-w-[560px]">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              About EasyLife Exchange
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
              Easylife makes it seamless to buy and trade bitcoin and other
              cryptocurrencies, pay bills, send and receive money, and trade
              giftcards from any location, at your convenience.
            </p>

            <div className="mt-6">
              <a
                href="#download"
                className="inline-flex h-11 items-center justify-center rounded-full bg-[#A228BB] px-9 text-sm font-semibold text-white shadow-sm transition-all hover:brightness-110 active:scale-[0.98] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#A228BB]/25"
              >
                Download app now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
