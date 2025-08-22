// src/components/blogDetail/DetailBlocks.tsx
"use client";

import Image from "next/image";

type DetailImage = { src: string; alt?: string; caption?: string };
type DetailPayload = {
  t1?: string; t2?: string; t5?: string; t6?: string; t7?: string; t8?: string;
  t11?: string; t12a?: string; t12c?: string; t12d?: string;
  t15a?: string; t15b?: string; t15c?: string;
  callout?: string;
  img1?: DetailImage; img2?: DetailImage; img3?: DetailImage;
};

export default function DetailBlocks({
  img1,
  img2,
  img3,
  detail,
}: {
  img1: string; // first inner image (543px tall)
  img2: string; // second inner image (628px tall)
  img3: string; // third inner image (508px tall)
  detail?: DetailPayload; // dynamic text/images/callout from DB
}) {
  // Text fallbacks keep your 15-block layout intact even if DB fields are missing.
  const T1   = detail?.t1   ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultrices arcu sit amet facilisis finibus. Integer a dictum arcu.";
  const T2   = detail?.t2   ?? "Suspendisse potenti. Sed vitae mi eros. Donec aliquet leo a lectus rutrum, a dictum ante sodales. Nulla facilisi.";
  const T5   = detail?.t5   ?? "Vivamus a interdum neque. Sed id justo quis urna luctus gravida. Curabitur et augue sed leo accumsan finibus.";
  const T6   = detail?.t6   ?? "Donec ac viverra nibh. Phasellus congue rutrum mi id posuere. Nam nec bibendum turpis.";
  const T7   = detail?.t7   ?? "Aliquam fringilla mi in nunc convallis, sit amet luctus dui congue.";
  const T8   = detail?.t8   ?? "Curabitur ac bibendum sapien. Duis ultricies, sapien et euismod volutpat, lorem lacus.";
  const T11  = detail?.t11  ?? "Sed non convallis sapien. Pellentesque in ultrices ipsum.";
  const T12a = detail?.t12a ?? "Integer pulvinar, tortor non posuere rhoncus.";
  const T12c = detail?.t12c ?? "Morbi auctor dignissim ipsum nec vehicula. In vitae tempor dui.";
  const T12d = detail?.t12d ?? "Integer pretium urna vitae nisl blandit, posuere tristique augue auctor. Nullam efficitur, neque at fermentum malesuada.";
  const T15a = detail?.t15a ?? "Aenean id vulputate mauris. Cras fermentum nulla at felis cursus.";
  const T15b = detail?.t15b ?? "Nunc at tellus sit amet neque dapibus congue. Praesent sagittis magna eu ultricies faucibus.";
  const T15c = detail?.t15c ?? "Mauris viverra rhoncus lacus, in luctus erat efficitur id.";

  const I1 = detail?.img1?.src ?? img1;
  const I1alt = detail?.img1?.alt ?? "";
  const I1cap = detail?.img1?.caption ?? "Caption or note explaining the image content.";

  const I2 = detail?.img2?.src ?? img2;
  const I2alt = detail?.img2?.alt ?? "";
  const I2cap = detail?.img2?.caption ?? "Small note / attribution";

  const I3 = detail?.img3?.src ?? img3;
  const I3alt = detail?.img3?.alt ?? "";
  const I3cap = detail?.img3?.caption ?? "Figure label or source";

  const CALL_OUT = detail?.callout ?? "Highlighted callout block — extra width (894px) per design.";

  return (
    // Center a column that’s 846px wide on desktop
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[846px]">
        {/* --- 1 --- Text box: h=128, pt=32, gap=10 */}
        <div className="pt-8 space-y-2 md:h-[128px]">
          <p className="text-base leading-relaxed">{T1}</p>
        </div>

        {/* --- 2 --- Text box: h=144, pt=96, gap=24 */}
        <div className="pt-24 space-y-6 md:h-[144px]">
          <p className="text-base leading-relaxed">{T2}</p>
        </div>

        {/* --- 3 --- Image: h=543.162, pt=32 */}
        <div className="pt-8 md:h-[543.1621px]">
          <div className="relative w-full h-[260px] sm:h-[380px] md:h-[543.1621px] rounded-md overflow-hidden">
            <Image src={I1} alt={I1alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 846px" />
          </div>
        </div>

        {/* --- 4 --- Text: h=45, pt=24 */}
        <div className="pt-6 md:h-[45px]">
          <p className="text-sm text-gray-600">{I1cap}</p>
        </div>

        {/* --- 5 --- Text: h=128, pt=32 */}
        <div className="pt-8 space-y-2 md:h-[128px]">
          <p className="text-base leading-relaxed">{T5}</p>
        </div>

        {/* --- 6 --- Text: h=144, pt=96 */}
        <div className="pt-24 space-y-6 md:h-[144px]">
          <p className="text-base leading-relaxed">{T6}</p>
        </div>

        {/* --- 7 --- Text: h=84, pt=48 */}
        <div className="pt-12 space-y-2 md:h-[84px]">
          <p className="text-base leading-relaxed">{T7}</p>
        </div>

        {/* --- 8 --- Text: h=104, pt=32 */}
        <div className="pt-8 space-y-2 md:h-[104px]">
          <p className="text-base leading-relaxed">{T8}</p>
        </div>

        {/* --- 9 --- Image: h=628.43, pt=32 */}
        <div className="pt-8 md:h-[628.43px]">
          <div className="relative w-full h-[300px] sm:h-[440px] md:h-[628.43px] rounded-md overflow-hidden">
            <Image src={I2} alt={I2alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 846px" />
          </div>
        </div>

        {/* --- 10 --- Small text bottom-left of image: w=210, h=45, pt=24 */}
        <div className="pt-6 md:h-[45px]">
          <div className="w-[210px]">
            <p className="text-sm text-gray-600">{I2cap}</p>
          </div>
        </div>

        {/* --- 11 --- Text: h=84, pt=48 */}
        <div className="pt-12 space-y-2 md:h-[84px]">
          <p className="text-base leading-relaxed">{T11}</p>
        </div>

        {/* --- 12a --- Text: h=80, pt=32 */}
        <div className="pt-8 space-y-2 md:h-[80px]">
          <p className="text-base leading-relaxed">{T12a}</p>
        </div>

        {/* --- 12b --- Text highlight: w=894, h=143, pt=32, bg #F1F2F4 */}
        <div className="pt-8 md:h-[143px] flex justify-center">
          <div className="w-full md:w-[894px] rounded-md bg-[#F1F2F4] p-4">
            <p className="text-base leading-relaxed">{CALL_OUT}</p>
          </div>
        </div>

        {/* --- 12c --- Text: h=104, pt=32 */}
        <div className="pt-8 space-y-2 md:h-[104px]">
          <p className="text-base leading-relaxed">{T12c}</p>
        </div>

        {/* --- 12d --- Text: h=144, pt=96 */}
        <div className="pt-24 space-y-6 md:h-[144px]">
          <p className="text-base leading-relaxed">{T12d}</p>
        </div>

        {/* --- 13 --- Image: h=507.589, pt=32 */}
        <div className="pt-8 md:h-[507.5892px]">
          <div className="relative w-full h-[260px] sm:h-[380px] md:h-[507.5892px] rounded-md overflow-hidden">
            <Image src={I3} alt={I3alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 846px" />
          </div>
        </div>

        {/* --- 14 --- Text below image left: w=391, h=21 */}
        <div className="pt-3 md:h-[21px]">
          <div className="w-[391px]">
            <p className="text-sm text-gray-600">{I3cap}</p>
          </div>
        </div>

        {/* --- 15a --- Text: h=128, pt=32 */}
        <div className="pt-8 space-y-2 md:h-[128px]">
          <p className="text-base leading-relaxed">{T15a}</p>
        </div>

        {/* --- 15b --- Text: h=144, pt=96 */}
        <div className="pt-24 space-y-6 md:h-[144px]">
          <p className="text-base leading-relaxed">{T15b}</p>
        </div>

        {/* --- 15c --- Text: h=104, pt=32 */}
        <div className="pt-8 space-y-2 md:h-[104px]">
          <p className="text-base leading-relaxed">{T15c}</p>
        </div>
      </div>
    </div>
  );
}
