"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute -top-24 left-[-120px] h-[420px] w-[420px] rounded-full bg-[#A228BB]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 right-[-140px] h-[520px] w-[520px] rounded-full bg-[#A228BB]/10 blur-3xl" />

      <div className="mx-auto w-full max-w-[1440px] px-4 pt-10 sm:px-6 md:pt-12">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h1 className="text-[30px] leading-[1.08] font-extrabold tracking-tight text-slate-900 sm:text-[40px]">
              Experience <span className="text-[#A228BB]">Swift</span> and{" "}
              <span className="text-[#A228BB]">Seamless</span> Transactions
              <br className="hidden sm:block" /> with EasyLife Exchange
            </h1>

            <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-slate-600 sm:text-base">
              EasyLife Exchange makes it seamless to buy and trade bitcoin and
              other cryptocurrencies from any location, at your convenience.
            </p>

            <div className="mt-7">
              <a
                id="download"
                href="#"
                className="inline-flex h-11 items-center justify-center rounded-full bg-[#A228BB] px-7 text-sm font-semibold text-white shadow-sm transition-all hover:brightness-110 active:scale-[0.98] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#A228BB]/25"
              >
                Download app now
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[640px]">
            <div className="absolute -bottom-6 left-1/2 h-32 w-[88%] -translate-x-1/2 rounded-[999px] bg-[#A228BB]/55" />

            <div className="relative z-10">
              <Image
                src="/images/hero-phone.png"
                alt="EasyLife Exchange app preview"
                width={1000}
                height={800}
                priority
                className="h-auto w-full object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
