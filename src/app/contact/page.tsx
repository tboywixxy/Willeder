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
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-20 py-16 md:py-24">
        {/* Heading */}
        <div className="mx-auto w-full max-w-[1280px] flex flex-col items-center gap-4 mb-12">
          {/* Top text */}
          <h1 className="font-['Noto_Sans_JP'] font-bold text-[32px] leading-[150%] tracking-[0.05em] text-center">
            お問い合わせ
          </h1>

          {/* Divider + subheading + divider */}
          <div className="w-full flex items-center gap-4 justify-center">
            <span className="h-px w-[571.5px] bg-black opacity-100" />
            <div className="font-['Jost'] font-medium text-[20px] leading-[150%] tracking-[0.05em] text-center">
              CONTACT
            </div>
            <span className="h-px w-[571.5px] bg-black opacity-100" />
          </div>
        </div>

        {/* Form container box */}
        <div className="mx-auto w-full max-w-[1280px] bg-[#F1F2F4] rounded-[16px] md:min-h-[1099px] p-6 sm:p-10 md:p-[100px]">
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
                className="block font-['Noto_Sans_JP'] font-medium text-[24px] leading-[100%] text-black"
              >
                お名前*
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="お名前をご入力ください"
                className="w-full h-[55px] rounded-[8px] border border-black px-4 bg-white outline-none focus:ring-2 focus:ring-black
                           placeholder:font-['Noto_Sans_JP'] placeholder:font-medium placeholder:text-[18px] placeholder:leading-[125%] placeholder:text-[#B5B5B5]"
              />
            </div>

            {/* Email */}
            <div className="w-full max-w-[1080px] space-y-2">
              <label
                htmlFor="email"
                className="block font-['Noto_Sans_JP'] font-medium text-[24px] leading-[100%] text-black"
              >
                メールアドレス*
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                inputMode="email"
                placeholder="メールアドレスをご入力ください"
                className="w-full h-[55px] rounded-[8px] border border-black px-4 bg-white outline-none focus:ring-2 focus:ring-black
                           placeholder:font-['Noto_Sans_JP'] placeholder:font-medium placeholder:text-[18px] placeholder:leading-[125%] placeholder:text-[#B5B5B5]"
              />
            </div>

            {/* Subject */}
            <div className="w-full max-w-[1080px] space-y-2">
              <label
                htmlFor="subject"
                className="block font-['Noto_Sans_JP'] font-medium text-[24px] leading-[100%] text-black"
              >
                電話番号*
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                placeholder="電話番号をご入力ください"
                className="w-full h-[55px] rounded-[8px] border border-black px-4 bg-white outline-none focus:ring-2 focus:ring-black
                           placeholder:font-['Noto_Sans_JP'] placeholder:font-medium placeholder:text-[18px] placeholder:leading-[125%] placeholder:text-[#B5B5B5]"
              />
            </div>

            {/* Message */}
            <div className="w-full max-w-[1080px] space-y-2">
              <label
                htmlFor="message"
                className="block font-['Noto_Sans_JP'] font-medium text-[24px] leading-[100%] text-black"
              >
                お問い合わせ内容*
              </label>
              <textarea
                id="message"
                name="message"
                required
                placeholder="お問い合わせ内容をご入力ください"
                className="w-full h-[160px] rounded-[8px] border border-black px-4 py-4 bg-white outline-none focus:ring-2 focus:ring-black resize-y
                           placeholder:font-['Noto_Sans_JP'] placeholder:font-medium placeholder:text-[18px] placeholder:leading-[125%] placeholder:text-[#B5B5B5]"
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
                className="font-['Noto_Sans_JP'] font-medium text-[24px] leading-[125%] underline underline-offset-0 decoration-solid"
              >
                プライバシーポリシーに同意する
              </label>
            </div>

            {/* Submit (red button only) */}
            <div className="w-full flex items-center justify-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-6 px-12 py-4 text-white bg-[#AD002D] rounded-[16px]
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
              >
                <span className="font-['Noto_Sans_JP'] font-bold text-[24px] leading-[150%] tracking-[0.05em] align-middle">
                  Submit
                </span>
                <span className="relative block w-[21px] h-[24.2483px] -top-[0.12px]">
                  <Image
                    src="/images/services/arrow 2.png"
                    alt=""
                    fill
                    className="object-contain"
                    sizes="21px"
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
