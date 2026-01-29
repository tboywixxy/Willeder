"use client";

type Testimonial = {
  id: string;
  quote: string;
  name: string;
};

const QUOTE =
  "This is literally the best app ever. Sending and receiving money has never been easier. It simply makes my life better and more productive! I’d recommend any day, any time.";

const TESTIMONIALS: Testimonial[] = [
  { id: "t1", quote: QUOTE, name: "Amina" },
  { id: "t2", quote: QUOTE, name: "Tunde" },
  { id: "t3", quote: QUOTE, name: "Kemi" },
  { id: "t4", quote: QUOTE, name: "David" },
  { id: "t5", quote: QUOTE, name: "Zainab" },
  { id: "t6", quote: QUOTE, name: "Chidi" },
  { id: "t7", quote: QUOTE, name: "Chioma" },
];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article
      className={[
        "group relative w-[260px] sm:w-[300px]",
        "rounded-2xl bg-white/92 backdrop-blur",
        "ring-1 ring-slate-200/70",
        "shadow-[0_16px_45px_-32px_rgba(2,6,23,0.45)]",
        "p-5",
        "transition-transform duration-300 hover:-translate-y-1",
      ].join(" ")}
    >
      <div className="pointer-events-none absolute -inset-1 rounded-[18px] bg-gradient-to-br from-[#A228BB]/16 via-transparent to-transparent opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute left-0 right-0 top-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-[#A228BB] via-white/25 to-[#A228BB]" />

      <p className="relative z-10 mt-1 text-[12.5px] leading-[1.65] text-slate-700">
        {t.quote}
      </p>

      <div className="relative z-10 mt-4 flex items-center justify-between">
        <div className="leading-tight">
          <p className="text-[12.5px] font-semibold text-slate-900">
            - {t.name}
          </p>
          <p className="text-[10.5px] text-slate-500">Verified user</p>
        </div>

        <span className="rounded-full bg-[#A228BB]/10 px-2.5 py-1 text-[10.5px] font-semibold text-[#A228BB]">
          5.0
        </span>
      </div>
    </article>
  );
}

function MarqueeRow({
  items,
  direction,
  seconds,
}: {
  items: Testimonial[];
  direction: "left" | "right";
  seconds: number;
}) {
  const loop = [...items, ...items];

  return (
    <div className="relative overflow-hidden py-2">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-14 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-14 bg-gradient-to-l from-white to-transparent" />

      <div className="marquee-hover">
        <div
          className={[
            "marquee-track flex w-max gap-5 will-change-transform",
            direction === "left" ? "marquee-left" : "marquee-right",
          ].join(" ")}
          style={{ ["--dur" as any]: `${seconds}s` }}
        >
          {loop.map((t, idx) => (
            <TestimonialCard key={`${t.id}-${idx}`} t={t} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          animation-duration: var(--dur, 28s);
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .marquee-hover:hover .marquee-track {
          animation-play-state: paused;
        }
        .marquee-left {
          animation-name: leftScroll;
        }
        @keyframes leftScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .marquee-right {
          animation-name: rightScroll;
        }
        @keyframes rightScroll {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function TestimonialsSection() {
  const topRow = TESTIMONIALS.slice(0, 3);
  const bottomRow = TESTIMONIALS.slice(3, 7);

  return (
    <section className="relative bg-white" id="testimonials">
      <div className="pointer-events-none absolute -top-24 left-[-120px] h-[420px] w-[420px] rounded-full bg-[#A228BB]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 right-[-140px] h-[520px] w-[520px] rounded-full bg-[#A228BB]/10 blur-3xl" />

      <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full bg-[#A228BB]/10 px-4 py-1 text-xs font-semibold text-[#A228BB]">
            Testimonials
          </span>

          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            From the mouth of Our Users
          </h2>

          <p className="mx-auto mt-2 max-w-[680px] text-sm text-slate-600">
            Real feedback from people using EasyLife Exchange every day.
          </p>
        </div>

        <div className="mt-12 space-y-6">
          <MarqueeRow items={topRow} direction="right" seconds={20} />
          <MarqueeRow items={bottomRow} direction="left" seconds={26} />
        </div>
      </div>
    </section>
  );
}
