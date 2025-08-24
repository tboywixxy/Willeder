// /app/contact/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import FormClient from "./FormClient";

export const metadata: Metadata = {
  title: "Contact | Willeder",
  description: "Get in touch with Willeder",
};

export default function ContactPage() {
  return (
    <section className="bg-white">
      <div
        className="
          mx-auto w-full max-w-[1440px]
          /* Figma: px 16 → 80, py 24 → 96 */
          px-[clamp(16px,calc(100vw/1440*80),80px)]
          py-[clamp(24px,calc(100vw/1440*96),96px)]
        "
      >
        {/* Heading */}
        <div className="mx-auto w-full max-w-[1280px] flex flex-col items-center gap-4 mb-12">
          <h1
            className="
              font-['Noto_Sans_JP'] font-bold
              /* 24 → 32 */
              text-[clamp(24px,calc(100vw/1440*32),32px)]
              leading-[1.5] tracking-[0.05em] text-center
            "
          >
            お問い合わせ
          </h1>

          {/* Divider + subheading + divider */}
          <div className="w-full flex items-center gap-4 justify-center" role="presentation" aria-hidden="true">
            {/* line widths scale up to the Figma 571.5px */}
            <span className="h-px w-[clamp(120px,calc(100vw/1440*571.5),571.5px)] bg-black" />
            <div
              className="
                font-['Jost'] font-medium
                /* 16 → 20 */
                text-[clamp(16px,calc(100vw/1440*20),20px)]
                leading-[1.5] tracking-[0.05em] text-center
              "
            >
              CONTACT
            </div>
            <span className="h-px w-[clamp(120px,calc(100vw/1440*571.5),571.5px)] bg-black" />
          </div>
        </div>

        {/* Form container box */}
        <div
          className="
            mx-auto w-full max-w-[1280px] bg-[#F1F2F4] rounded-[16px]
            /* p: 24 → 100 */
            p-[clamp(24px,calc(100vw/1440*100),100px)]
            /* min-height can stay large on md if you want, but fluid is nicer */
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
                className="
                  block font-['Noto_Sans_JP'] font-medium text-black
                  /* 18 → 24 */
                  text-[clamp(18px,calc(100vw/1440*24),24px)]
                  leading-[1]
                "
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
                className="
                  w-full rounded-[8px] border border-black bg-white outline-none focus:ring-2 focus:ring-black
                  /* height via min-h; 48 → 55 */
                  min-h-[clamp(48px,calc(100vw/1440*55),55px)]
                  px-4
                  placeholder:font-['Noto_Sans_JP'] placeholder:font-medium placeholder:text-[#B5B5B5]
                  /* 16 → 18 */
                  placeholder:text-[clamp(16px,calc(100vw/1440*18),18px)]
                  placeholder:leading-[1.25]
                "
              />
            </div>

            {/* Email */}
            <div className="w-full max-w-[1080px] space-y-2">
              <label
                htmlFor="email"
                className="
                  block font-['Noto_Sans_JP'] font-medium text-black
                  text-[clamp(18px,calc(100vw/1440*24),24px)]
                  leading-[1]
                "
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
                className="
                  w-full rounded-[8px] border border-black bg-white outline-none focus:ring-2 focus:ring-black
                  min-h-[clamp(48px,calc(100vw/1440*55),55px)]
                  px-4
                  placeholder:font-['Noto_SANS_JP'] placeholder:font-medium placeholder:text-[#B5B5B5]
                  placeholder:text-[clamp(16px,calc(100vw/1440*18),18px)]
                  placeholder:leading-[1.25]
                "
              />
            </div>

            {/* Phone */}
            <div className="w-full max-w-[1080px] space-y-2">
              <label
                htmlFor="phone"
                className="
                  block font-['Noto_Sans_JP'] font-medium text-black
                  text-[clamp(18px,calc(100vw/1440*24),24px)]
                  leading-[1]
                "
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
                className="
                  w-full rounded-[8px] border border-black bg-white outline-none focus:ring-2 focus:ring-black
                  min-h-[clamp(48px,calc(100vw/1440*55),55px)]
                  px-4
                  placeholder:font-['Noto_Sans_JP'] placeholder:font-medium placeholder:text-[#B5B5B5]
                  placeholder:text-[clamp(16px,calc(100vw/1440*18),18px)]
                  placeholder:leading-[1.25]
                "
              />
            </div>

            {/* Message */}
            <div className="w-full max-w-[1080px] space-y-2">
              <label
                htmlFor="message"
                className="
                  block font-['Noto_Sans_JP'] font-medium text-black
                  text-[clamp(18px,calc(100vw/1440*24),24px)]
                  leading-[1]
                "
              >
                お問い合わせ内容*
              </label>
              <textarea
                id="message"
                name="message"
                required
                autoComplete="on"
                placeholder="お問い合わせ内容をご入力ください"
                className="
                  w-full rounded-[8px] border border-black bg-white outline-none focus:ring-2 focus:ring-black resize-y
                  /* 140 → 160 */
                  min-h-[clamp(140px,calc(100vw/1440*160),160px)]
                  px-4 py-4
                  placeholder:font-['Noto_Sans_JP'] placeholder:font-medium placeholder:text-[#B5B5B5]
                  placeholder:text-[clamp(16px,calc(100vw/1440*18),18px)]
                  placeholder:leading-[1.25]
                  whitespace-normal break-words [overflow-wrap:anywhere] [word-break:break-word] [hyphens:auto]
                "
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
                className="
                  font-['Noto_Sans_JP'] font-medium underline underline-offset-0 decoration-solid
                  /* 18 → 24 */
                  text-[clamp(18px,calc(100vw/1440*24),24px)]
                  leading-[1.25]
                "
              >
                プライバシーポリシーに同意する
              </label>
            </div>

            {/* Submit (all clamp’d) */}
            <div className="w-full flex items-center justify-center">
              <button
                type="submit"
                className="
                  inline-flex items-center justify-center rounded-[16px] text-white bg-[#AD002D]
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-black
                  /* width: 193 → 279, gap: 16 → 24, px: 24 → 48; uniform py-4 */
                  w-[clamp(193px,calc(100vw/1440*279),279px)]
                  gap-[clamp(16px,calc(100vw/1440*24),24px)]
                  px-[clamp(24px,calc(100vw/1440*48),48px)]
                  py-4
                "
                aria-label="Submit contact form"
              >
                <span
                  className="
                    font-['Noto_Sans_JP'] font-bold leading-[1.5] tracking-[0.05em]
                    /* 20 → 24 */
                    text-[clamp(20px,calc(100vw/1440*24),24px)]
                  "
                >
                  Submit
                </span>
                <span
                  className="
                    relative block -top-[0.12px]
                    /* 25×18 → 34×24 */
                    w-[clamp(25px,calc(100vw/1440*34),34px)]
                    h-[clamp(18px,calc(100vw/1440*24),24px)]
                  "
                  aria-hidden="true"
                >
                  <Image
                    src="/images/services/arrow 2.png"
                    alt=""
                    fill
                    className="object-contain"
                    sizes="(max-width: 599px) 25px, 34px"
                    decoding="async"
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
