"use client";

import Image from "next/image";
import { notoSansJp } from "@/app/fonts";
import Reveal from "@/components/Reveal";

type DetailImage = { src: string; alt?: string; caption?: string };
type DetailPayload = {
  t1?: string; t2?: string; t5?: string; t6?: string; t7?: string; t8?: string;
  t11?: string; t12a?: string; t12c?: string; t12d?: string;
  t15a?: string; t15b?: string; t15c?: string;
  callout?: string;
  img1?: DetailImage; img2?: DetailImage; img3?: DetailImage;
};

function renderWithRed(text: string) {
  const nodes: React.ReactNode[] = [];
  const re = /\{\{red\}\}([\s\S]*?)\{\{\/red\}\}/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) nodes.push(<span key={last}>{text.slice(last, m.index)}</span>);
    nodes.push(<span key={m.index} className="text-[#AD002D]">{m[1]}</span>);
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

  const CALL_OUT = detail?.callout ?? "Highlighted callout block — width matches text/images.";

  const tBase16     = `${notoSansJp.className} font-medium text-[15px] sm:text-[14px] leading-[135%] sm:leading-[150%] break-words [overflow-wrap:anywhere] hyphens-auto`;
  const tBoldBoxed  = `${notoSansJp.className} font-bold text-[20px] sm:text-[24px] md:text-[32px] leading-[145%] sm:leading-[130%] tracking-[0.01em] break-words [overflow-wrap:anywhere] hyphens-auto`;
  const tBold24Red  = `${notoSansJp.className} font-bold text-[18px] sm:text-[22px] md:text-[24px] leading-[150%] text-[#AD002D] break-words [overflow-wrap:anywhere] hyphens-auto`;
  const capGray14   = `${notoSansJp.className} font-medium text-[13px] sm:text-[14px] leading-[150%] text-[#393E46] break-words [overflow-wrap:anywhere] hyphens-auto`;
  const cap14       = `${notoSansJp.className} font-medium text-[13px] sm:text-[13px] leading-[150%] break-words [overflow-wrap:anywhere] hyphens-auto`;

  const LeftBar = () => <span aria-hidden="true" className="shrink-0 w-[6px] self-stretch bg-[#AD002D]" />;

  return (
    <Reveal className="w-full flex justify-center">
      <div className="w-full max-w-[327px] min-[600px]:max-w-[672px] min-[1024px]:max-w-[790px]">
        <div className="pt-6 sm:pt-[29px]">
          <p className={tBase16}>{T1}</p>
        </div>

        <div className="pt-6 sm:pt-[93px]">
          <div className="flex items-start gap-6">
            <LeftBar />
            <p className={tBoldBoxed}>{T2}</p>
          </div>
        </div>

        <div className="pt-6 sm:pt-[35px]">
          <div className="relative w-full overflow-hidden rounded-[16px] aspect-[16/10]">
            <Image
              src={I1}
              alt={I1alt}
              fill
              className="object-cover"
              sizes="(max-width: 599px) 327px, (max-width: 1023px) 672px, 846px"
            />
          </div>
        </div>

        <div className="mt-[4px] w-full">
          <p className={capGray14}>{I1cap}</p>
        </div>

        <div className="pt-6 sm:pt-8">
          <p className={tBase16}>{renderWithRed(T5)}</p>
        </div>

        <div className="pt-6 sm:pt-24">
          <div className="flex items-start gap-5">
            <LeftBar />
            <p className={tBoldBoxed}>{T6}</p>
          </div>
        </div>

        <div className="pt-6 sm:pt-[42px]">
          <p className={tBold24Red}>{T7}</p>
        </div>

        <div className="pt-6 sm:pt-8">
          <p className={tBase16}>{T8}</p>
        </div>

        <div className="pt-6 sm:pt-8">
          <div className="relative w-full overflow-hidden rounded-[16px] aspect-[7.1/5]">
            <Image
              src={I2}
              alt={I2alt}
              fill
              className="object-cover"
              sizes="(max-width: 599px) 327px, (max-width: 1023px) 672px, 846px"
            />
          </div>
        </div>

        <div className="mt-[25px] w-full">
          <p className={cap14}>{I2cap}</p>
        </div>

        <div className="pt-6 sm:pt-[44px]">
          <p className={tBold24Red}>{T11}</p>
        </div>

        <div className="pt-6 sm:pt-8">
          <p className={tBase16}>{renderWithRed(T12a)}</p>
        </div>

        <div className="pt-6 sm:pt-8">
          <div className="w-full rounded-[8px] bg-[#F1F2F4] p-4 sm:p-[20px]">
            <p className={cap14}>{CALL_OUT}</p>
          </div>
        </div>

        <div className="pt-6 sm:pt-4">
          <p className={tBase16}>{T12c}</p>
        </div>

        <div className="pt-6 sm:pt-[72px]">
          <div className="flex items-start gap-[12px]">
            <LeftBar /> 
            <p className={tBoldBoxed}>{T12d}</p>
          </div>
        </div>

        <div className="pt-6 sm:pt-8">
          <div className="relative w-full overflow-hidden rounded-[16px] aspect-[7.1/4]">
            <Image
              src={I3}
              alt={I3alt}
              fill
              className="object-cover"
              sizes="(max-width: 599px) 327px, (max-width: 1023px) 672px, 846px"
            />
          </div>
        </div>

        <div className="mt-[22px] w-full">
          <p className={capGray14}>{I3cap}</p>
        </div>

        <div className="pt-6 sm:pt-8">
          <p className={tBase16}>{renderWithRed(T15a)}</p>
        </div>

        <div className="pt-6 sm:pt-[93px]">
          <div className="flex items-start gap-5">
            <LeftBar />
            <p className={tBoldBoxed}>{T15b}</p>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 -pb-3">
          <p className={tBase16}>{T15c}</p>
        </div>
      </div>
    </Reveal>
  );
}
