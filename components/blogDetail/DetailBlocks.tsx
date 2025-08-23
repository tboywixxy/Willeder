"use client";

import Image from "next/image";
import { notoSansJp } from "@/app/fonts";

type DetailImage = { src: string; alt?: string; caption?: string };
type DetailPayload = {
  t1?: string; t2?: string; t5?: string; t6?: string; t7?: string; t8?: string;
  t11?: string; t12a?: string; t12c?: string; t12d?: string;
  t15a?: string; t15b?: string; t15c?: string;
  callout?: string;
  img1?: DetailImage; img2?: DetailImage; img3?: DetailImage;
};

/** Inline {{red}}...{{/red}} helper */
function renderWithRed(text: string) {
  const nodes: React.ReactNode[] = [];
  const re = /\{\{red\}\}([\s\S]*?)\{\{\/red\}\}/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) nodes.push(<span key={last}>{text.slice(last, m.index)}</span>);
    nodes.push(
      <span key={m.index} className="text-[#AD002D]">
        {m[1]}
      </span>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(<span key={last}>{text.slice(last)}</span>);
  return nodes;
}

export default function DetailBlocks({
  img1,
  img2,
  img3,
  detail,
}: {
  img1: string;
  img2: string;
  img3: string;
  detail?: DetailPayload;
}) {
  const T1   = detail?.t1   ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  const T2   = detail?.t2   ?? "Section heading with accent bar";
  const T5   = detail?.t5   ?? "This line includes {{red}}emphasized words{{/red}} inside.";
  const T6   = detail?.t6   ?? "Another large accent heading";
  const T7   = detail?.t7   ?? "Red subheading";
  const T8   = detail?.t8   ?? "Body paragraph with regular styling.";
  const T11  = detail?.t11  ?? "Another red subheading";
  const T12a = detail?.t12a ?? "Normal and {{red}}highlighted{{/red}} parts inline here.";
  const T12c = detail?.t12c ?? "Standard body paragraph as requested.";
  const T12d = detail?.t12d ?? "Big accent heading again";
  const T15a = detail?.t15a ?? "This has {{red}}red spans{{/red}} mixed with normal text.";
  const T15b = detail?.t15b ?? "Large accent heading again";
  const T15c = detail?.t15c ?? "Closing paragraph content.";

  const I1 = detail?.img1?.src ?? img1;
  const I1alt = detail?.img1?.alt || detail?.img1?.caption || "Related illustration for the article";
  const I1cap = detail?.img1?.caption ?? "Caption or note explaining the image content.";

  const I2 = detail?.img2?.src ?? img2;
  const I2alt = detail?.img2?.alt || detail?.img2?.caption || "Supporting image for the article";
  const I2cap = detail?.img2?.caption ?? "Small note / attribution";

  const I3 = detail?.img3?.src ?? img3;
  const I3alt = detail?.img3?.alt || detail?.img3?.caption || "Figure illustration for the article";
  const I3cap = detail?.img3?.caption ?? "Figure label or source";

  const CALL_OUT = detail?.callout ?? "Highlighted callout block — extra width (up to 894px) per design.";

  // Typography — scale down on small screens, wrap long words safely
  const tBase16 = `${notoSansJp.className} font-medium text-[15px] sm:text-[16px] leading-[155%] sm:leading-[150%] break-words overflow-wrap-anywhere hyphens-auto`;
  const tBoldBoxed = `${notoSansJp.className} font-bold text-[20px] sm:text-[24px] md:text-[32px] leading-[145%] sm:leading-[150%] tracking-[0.05em] break-words overflow-wrap-anywhere hyphens-auto`;
  const tBold24Red = `${notoSansJp.className} font-bold text-[18px] sm:text-[22px] md:text-[24px] leading-[150%] text-[#AD002D] break-words overflow-wrap-anywhere hyphens-auto`;
  const capGray14 = `${notoSansJp.className} font-medium text-[13px] sm:text-[14px] leading-[150%] text-[#393E46] break-words overflow-wrap-anywhere hyphens-auto`;
  const cap14 = `${notoSansJp.className} font-medium text-[13px] sm:text-[14px] leading-[150%] break-words overflow-wrap-anywhere hyphens-auto`;

  const LeftBar = () => <span aria-hidden="true" className="shrink-0 w-2 self-stretch bg-[#AD002D]" />;

  return (
    <div className="w-full overflow-x-hidden flex justify-center px-4 sm:px-6">
      {/* Content container */}
      <div className="w-full max-w-[846px]">
        {/* 1 Intro */}
        <div className="pt-6 sm:pt-8">
          <p className={tBase16}>{T1}</p>
        </div>

        {/* 2 Boxed heading */}
        <div className="pt-6 sm:pt-8">
          <div className="flex items-start gap-3">
            <LeftBar />
            <p className={tBoldBoxed}>{T2}</p>
          </div>
        </div>

        {/* 3 Image 1 — responsive wrapper (aspect on mobile, fixed height on md+) */}
        <div className="pt-6 sm:pt-8">
          <div className="relative w-full mx-auto overflow-hidden rounded-[16px] aspect-[16/10] md:h-[450px] md:max-w-[720px]">
            <Image
              src={I1}
              alt={I1alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 720px, 720px"
            />
          </div>
        </div>

        {/* 4 Caption 1 */}
        <div className="mt-[4px] mx-auto w-full md:max-w-[720px]">
          <p className={capGray14}>{I1cap}</p>
        </div>

        {/* 5 Body */}
        <div className="pt-6 sm:pt-8">
          <p className={tBase16}>{renderWithRed(T5)}</p>
        </div>

        {/* 6 Boxed heading */}
        <div className="pt-6 sm:pt-8">
          <div className="flex items-start gap-3">
            <LeftBar />
            <p className={tBoldBoxed}>{T6}</p>
          </div>
        </div>

        {/* 7 Red subheading */}
        <div className="pt-6 sm:pt-8">
          <p className={tBold24Red}>{T7}</p>
        </div>

        {/* 8 Body */}
        <div className="pt-6 sm:pt-8">
          <p className={tBase16}>{T8}</p>
        </div>

        {/* 9 Image 2 */}
        <div className="pt-6 sm:pt-8">
          <div className="relative w-full mx-auto overflow-hidden rounded-[16px] aspect-[3/2] md:h-[406px] md:max-w-[672px]">
            <Image
              src={I2}
              alt={I2alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 672px"
            />
          </div>
        </div>

        {/* 10 Caption 2 */}
        <div className="mt-[4px] mx-auto w-full md:max-w-[672px]">
          <p className={cap14}>{I2cap}</p>
        </div>

        {/* 11 Red subheading */}
        <div className="pt-6 sm:pt-8">
          <p className={tBold24Red}>{T11}</p>
        </div>

        {/* 12a Body with red spans */}
        <div className="pt-6 sm:pt-8">
          <p className={tBase16}>{renderWithRed(T12a)}</p>
        </div>

        {/* 12b Callout — was md:w-[894px] (caused overflow); now fluid with max-w */}
        <div className="pt-6 sm:pt-8 flex justify-center">
          <div className="w-full max-w-[894px] rounded-[8px] bg-[#F1F2F4] p-4 sm:p-6">
            <p className={cap14}>{CALL_OUT}</p>
          </div>
        </div>

        {/* 12c Body */}
        <div className="pt-6 sm:pt-8">
          <p className={tBase16}>{T12c}</p>
        </div>

        {/* 12d Boxed heading */}
        <div className="pt-6 sm:pt-8">
          <div className="flex items-start gap-3">
            <LeftBar />
            <p className={tBoldBoxed}>{T12d}</p>
          </div>
        </div>

        {/* 13 Image 3 */}
        <div className="pt-6 sm:pt-8">
          <div className="relative w-full mx-auto overflow-hidden rounded-[16px] aspect-[4/3] md:h-[474px] md:max-w-[672px]">
            <Image
              src={I3}
              alt={I3alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 672px"
            />
          </div>
        </div>

        {/* 14 Caption 3 */}
        <div className="mt-[4px] mx-auto w-full md:max-w-[672px]">
          <p className={capGray14}>{I3cap}</p>
        </div>

        {/* 15a Body */}
        <div className="pt-6 sm:pt-8">
          <p className={tBase16}>{renderWithRed(T15a)}</p>
        </div>

        {/* 15b Boxed heading */}
        <div className="pt-6 sm:pt-8">
          <div className="flex items-start gap-3">
            <LeftBar />
            <p className={tBoldBoxed}>{T15b}</p>
          </div>
        </div>

        {/* 15c Closing */}
        <div className="pt-6 sm:pt-8 pb-2">
          <p className={tBase16}>{T15c}</p>
        </div>
      </div>
    </div>
  );
}
