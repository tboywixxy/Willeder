import Image from "next/image";

type Service = {
  title: string;
  kicker: string;
  description: string;
  img: string;
  alt: string;
};

const SERVICES: Service[] = [
  {
    title: "UI/UX Design",
    kicker: "Human-centered product design",
    description:
      "Wireframes, visual systems, and prototypes that translate requirements into intuitive flows.",
    img: "/images/services/1.png",
    alt: "UI/UX Design icon",
  },
  {
    title: "Engineering",
    kicker: "Reliable builds & integrations",
    description:
      "Frontend with Next.js + TypeScript, scalable APIs, and CI/CD tuned for fast releases.",
    img: "/images/services/1.png",
    alt: "Engineering icon",
  },
  {
    title: "Brand Strategy",
    kicker: "Identity & positioning",
    description:
      "Naming, tone, and visual language that align your product with audience and goals.",
    img: "/images/services/1.png",
    alt: "Brand Strategy icon",
  },
];

export default function ServiceSection() {
  return (
    <section className="bg-[#FFC8D7]">
      {/* Full section box */}
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-20 pt-24 pb-40 space-y-16 md:h-[866px]">
        {/* Header */}
        <div className="mx-auto w-full max-w-[1280px] h-auto md:h-[86px] flex flex-col items-center justify-center gap-2">
          <div className="text-sm tracking-widest">HHS</div>
          <div className="w-full flex items-center gap-4">
            <span className="h-px flex-1 bg-black" aria-hidden="true" />
            <h2 className="text-2xl font-semibold">SERVICE</h2>
            <span className="h-px flex-1 bg-black" aria-hidden="true" />
          </div>
        </div>

        {/* Cards area */}
        <div className="mx-auto w-full max-w-[1280px]">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center md:h-[460px]">
            {SERVICES.map((s) => (
              <li
                key={s.title}
                className="
                  w-full md:w-[410px]
                  h-auto md:h-[460px]
                  flex flex-col items-center
                "
              >
                {/* Image */}
                <div className="relative w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px]">
                  <Image
                    src={s.img}
                    alt={s.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 50vw, 280px"
                  />
                </div>

                {/* Text container */}
                <div className="w-full mt-4 md:mt-6 flex flex-col gap-[8px]">
                  {/* Top block — centered */}
                  <div className="w-full md:h-[116px] py-2 flex flex-col items-center justify-center text-center px-2">
                    <p className="text-sm text-black/70">{s.kicker}</p>
                    <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                  </div>

                  {/* Bottom block — left, vertically centered */}
                  <div className="w-full md:h-[60px] px-2 flex items-center">
                    <p className="text-sm leading-relaxed text-black/80">{s.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
