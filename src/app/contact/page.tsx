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
        <div className="mx-auto w-full max-w-[1280px] flex flex-col items-center gap-2 mb-12">
          <div className="text-sm tracking-widest">CONTACT</div>
          <div className="w-full flex items-center gap-4">
            <span className="h-px flex-1 bg-black" />
            <h1 className="text-2xl md:text-3xl font-semibold">Get in touch</h1>
            <span className="h-px flex-1 bg-black" />
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
              <label htmlFor="name" className="block text-sm font-medium text-black">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Jane Doe"
                className="w-full h-[55px] rounded-[8px] border border-black px-4 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Email */}
            <div className="w-full max-w-[1080px] space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-black">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                inputMode="email"
                placeholder="jane@example.com"
                className="w-full h-[55px] rounded-[8px] border border-black px-4 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Subject */}
            <div className="w-full max-w-[1080px] space-y-2">
              <label htmlFor="subject" className="block text-sm font-medium text-black">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                placeholder="New website consultation"
                className="w-full h-[55px] rounded-[8px] border border-black px-4 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Message */}
            <div className="w-full max-w-[1080px] space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-black">Message</label>
              <textarea
                id="message"
                name="message"
                required
                placeholder="Write your message here…"
                className="w-full h-[160px] rounded-[8px] border border-black px-4 py-4 outline-none focus:ring-2 focus:ring-black resize-y"
              />
            </div>

            {/* Checkbox */}
            <div className="w-full max-w-[1080px] flex items-start gap-3">
              <input
                id="agree"
                name="agree"
                type="checkbox"
                required
                className="h-5 w-5 border border-black rounded-[4px] accent-black"
              />
              <label htmlFor="agree" className="text-sm leading-6">
                I agree to the processing of my information according to the privacy policy.
              </label>
            </div>

            {/* Submit */}
            <div className="w-full flex items-center justify-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-6 px-12 py-4 text-white font-medium bg-[#AD002D] rounded-[16px] focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
              >
                <span>Submit</span>
                <span className="relative block w-[34px] h-[24px]">
                  <Image
                    src="/images/services/arrow 2.png"
                    alt=""
                    fill
                    className="object-contain"
                    sizes="34px"
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
