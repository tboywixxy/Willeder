import type { Metadata } from "next";
import Image from "next/image";
import FormClient from "./FormClient";   // plain import (no next/dynamic)
import { jost } from "../fonts";

export const metadata: Metadata = {
  title: "Contact | Willeder",
  description: "Get in touch with Willeder",
};

// Make the route static + cacheable at the HTML level
export const dynamic = "force-static";
export const revalidate = false;

export default function ContactPage() {
  return (
    <section className="bg-white">
      <div
        className="
          mx-auto w-full max-w-[1440px]
          px-[clamp(16px,calc(100vw/1440*80),80px)]
          py-[clamp(24px,calc(100vw/1440*96),96px)]
        "
      >
        {/* Heading */}
        <div className="mx-auto w-full max-w-[1280px] flex flex-col items-center gap-4 mb-12">
          <h1
            className={`
              ${jost.className} font-bold
              text-[clamp(24px,calc(100vw/1440*32),32px)]
              leading-[1.5] tracking-[0.05em] text-center
            `}
          >
            お問い合わせ
          </h1>

        {/* Divider + subheading + divider */}
          <div className="w-full flex items-center gap-4 justify-center" role="presentation" aria-hidden="true">
            <span className="h-px w-[clamp(120px,calc(100vw/1440*571.5),571.5px)] bg-black" />
            <div
              className="
                font-sans font-medium
                text-[clamp(16px,calc(100vw/1440*20),20px)]
                leading-[1.5] tracking-[0.05em] text-center
              "
            >
              CONTACT
            </div>
            <span className="h-px w-[clamp(120px,calc(100vw/1440*571.5),571.5px)] bg-black" />
          </div>
        </div>

        {/* Form container */}
        <div
          className="
            mx-auto w-full max-w-[1280px] bg-[#F1F2F4] rounded-[16px]
            p-[clamp(24px,calc(100vw/1440*100),100px)]
            min-h-[clamp(640px,calc(100vw/1440*1099),1099px)]
          "
        >
          <FormClient>
            {/* Honeypot */}
            <div className="hidden">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            {/* Name */}
            <div className="w-full max-w-[1080px] space-y-2">
              <label
                htmlFor="name"
                className="block font-sans font-medium text-black text-[clamp(18px,calc(100vw/1440*24),24px)] leading-[1]"
              >
                お名前*
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="お名前をご入力ください"
                className="w-full rounded-[8px] border border-black bg-white outline-none focus:ring-2 focus:ring-black
                           min-h-[clamp(48px,calc(100vw/1440*55),55px)] px-4
                           font-sans placeholder:font-sans placeholder:font-medium placeholder:text-[#B5B5B5]
                           placeholder:text-[clamp(16px,calc(100vw/1440*18),18px)] placeholder:leading-[1.25]"
              />
            </div>

            {/* Email */}
            <div className="w-full max-w-[1080px] space-y-2">
              <label
                htmlFor="email"
                className="block font-sans font-medium text-black text-[clamp(18px,calc(100vw/1440*24),24px)] leading-[1]"
              >
                メールアドレス*
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                placeholder="メールアドレスをご入力ください"
                className="w-full rounded-[8px] border border-black bg-white outline-none focus:ring-2 focus:ring-black
                           min-h-[clamp(48px,calc(100vw/1440*55),55px)] px-4
                           font-sans placeholder:font-sans placeholder:font-medium placeholder:text-[#B5B5B5]
                           placeholder:text-[clamp(16px,calc(100vw/1440*18),18px)] placeholder:leading-[1.25]"
              />
            </div>

            {/* Phone */}
            <div className="w-full max-w-[1080px] space-y-2">
              <label
                htmlFor="phone"
                className="block font-sans font-medium text-black text-[clamp(18px,calc(100vw/1440*24),24px)] leading-[1]"
              >
                電話番号*
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                inputMode="tel"
                placeholder="電話番号をご入力ください"
                className="w-full rounded-[8px] border border-black bg-white outline-none focus:ring-2 focus:ring-black
                           min-h-[clamp(48px,calc(100vw/1440*55),55px)] px-4
                           font-sans placeholder:font-sans placeholder:font-medium placeholder:text-[#B5B5B5]
                           placeholder:text-[clamp(16px,calc(100vw/1440*18),18px)] placeholder:leading-[1.25]"
              />
            </div>

            {/* Message */}
            <div className="w-full max-w-[1080px] space-y-2">
              <label
                htmlFor="message"
                className="block font-sans font-medium text-black text-[clamp(18px,calc(100vw/1440*24),24px)] leading-[1]"
              >
                お問い合わせ内容*
              </label>
              <textarea
                id="message"
                name="message"
                required
                autoComplete="on"
                placeholder="お問い合わせ内容をご入力ください"
                className="w-full rounded-[8px] border border-black bg-white outline-none focus:ring-2 focus:ring-black resize-y
                           min-h-[clamp(140px,calc(100vw/1440*160),160px)] px-4 py-4
                           font-sans placeholder:font-sans placeholder:font-medium placeholder:text-[#B5B5B5]
                           placeholder:text-[clamp(16px,calc(100vw/1440*18),18px)] placeholder:leading-[1.25]"
              />
            </div>

            {/* Checkbox */}
            <div className="w-full max-w-[1080px] flex items-start gap-3">
              <input
                id="agree"
                name="agree"
                type="checkbox"
                required
                className="w-[30px] h-[30px] border border-black rounded-[4px] accent-black"
              />
              <label
                htmlFor="agree"
                className="font-sans font-medium underline underline-offset-0 decoration-solid
                           text-[clamp(18px,calc(100vw/1440*24),24px)] leading-[1.25]"
              >
                プライバシーポリシーに同意する
              </label>
            </div>

            {/* Submit */}
            <div className="w-full flex items-center justify-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-[16px] text-white bg-[#AD002D]
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-black
                           w-[clamp(193px,calc(100vw/1440*279),279px)]
                           gap-[clamp(16px,calc(100vw/1440*24),24px)]
                           px-[clamp(24px,calc(100vw/1440*48),48px)] py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                aria-label="Submit contact form"
              >
                <span className="font-sans font-bold leading-[1.5] tracking-[0.05em]
                                 text-[clamp(20px,calc(100vw/1440*24),24px)]">
                  Submit
                </span>
                <span className="relative block -top-[0.12px]
                                 w-[clamp(25px,calc(100vw/1440*34),34px)]
                                 h-[clamp(18px,calc(100vw/1440*24),24px)]" aria-hidden="true">
                  <Image
                    src="/images/services/arrow 2.png"
                    alt=""
                    fill
                    className="object-contain"
                    sizes="(max-width: 599px) 25px, 34px"
                    decoding="async"
                    loading="lazy"
                  />
                </span>
              </button>
            </div>
          </FormClient>
        </div>
      </div>
    </section>
  );
}
