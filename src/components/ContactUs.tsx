"use client";

import Image from "next/image";

export default function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute -top-28 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#A228BB]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-[-120px] h-[520px] w-[520px] rounded-full bg-[#A228BB]/10 blur-3xl" />

      <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="text-center">

          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Contact Us
          </h2>

          <p className="mx-auto mt-2 max-w-[560px] text-sm text-slate-600">
            Feel free to reach out to us — we typically respond within 24 hours.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <div
            className={[
              "w-full max-w-[860px] rounded-2xl bg-white p-5 sm:p-7",
              "shadow-[0_18px_55px_-30px_rgba(15,23,42,0.35)]",
              "ring-1 ring-slate-200/70",
            ].join(" ")}
          >
            <label className="block text-sm font-semibold text-slate-900">
              Your message
            </label>

            <textarea
              rows={5}
              placeholder="Enter message or enquiry"
              className={[
                "mt-3 w-full resize-none rounded-xl border border-slate-200 bg-white px-5 py-4",
                "text-sm text-slate-900 placeholder:text-slate-400 outline-none",
                "focus:border-[#A228BB]/40 focus:ring-4 focus:ring-[#A228BB]/15",
              ].join(" ")}
            />

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-slate-500">
                Please don’t share sensitive personal information here.
              </p>

              <button
                type="button"
                className={[
                  "inline-flex h-12 items-center justify-center rounded-full px-10",
                  "text-sm font-semibold text-white",
                  "bg-[#A228BB] shadow-sm",
                  "transition-all hover:brightness-110 active:scale-[0.98]",
                  "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#A228BB]/25",
                ].join(" ")}
              >
                Send message
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
