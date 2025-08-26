// src/components/Footer.tsx  (Server Component)
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const navText = `font-sans font-bold text-[12px] leading-[150%] tracking-[0.05em] align-middle`;
  const smallText = `font-sans font-medium text-[11.4px] leading-[150%] tracking-[0.05em] align-middle`;
  const reservedText = `font-sans font-medium text-[10px] leading-[150%] tracking-[0.1em] text-center`;

  return (
    <footer className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1440px] h-auto min-[600px]:h-[301px] px-4 min-[600px]:px-[77px] py-4 flex flex-col gap-6">
        <div className="w-full max-w-[1280px] h-auto min-[600px]:h-[212px] pt-6 pb-4 flex flex-col gap-[38px]">
          <div className="flex items-center">
            <Image
              src="/Willeder-w.png"
              alt="Willeder"
              width={115}
              height={20}
              sizes="120px"
              decoding="async"
              priority={false}
              style={{ display: "block", contain: "size layout", paddingRight: "4px" }}
            />
          </div>

          <nav className="flex items-center gap-[55px] h-[20px]" aria-label="Footer navigation">
            <Link href="/" prefetch={false} className={`${navText} inline-block`}>TOP</Link>
            <Link href="/blog" prefetch={false} className={`${navText} inline-block`}>ブログ</Link>
            <Link href="/contact" prefetch={false} className={`${navText} inline-block`}>お問い合わせ</Link>
          </nav>

          {/* Addresses (mobile) */}
          <div className="min-[600px]:hidden w-full max-w-[1280px]">
            <p className={`${smallText} break-words min-h-[36px]`} style={{ contain: "layout" }}>
              Willeder Inc.（アメリカ法人）<br />
              501 Congress Avenue, Suite 150, Austin, Texas, 78701, USA
            </p>
            <span className="block h-[2px] w-full bg-white/60" aria-hidden="true" />
            <p className={`${smallText} break-words min-h-[36px]`} style={{ contain: "layout" }}>
              ウィルダー株式会社（日本法人）<br />
              〒141-0022 東京都品川区東五反田1-4-9-606
            </p>
          </div>

{/* Addresses (≥600px) — independently adjustable */}
<div
  className="
    hidden min-[600px]:grid w-full max-w-[1280px] items-start gap-0 pb-[0px]
    [--left-gap:6px] md:[--left-gap:45px]
    [--right-gap:10px] md:[--right-gap:14px] -translate-y-[3px]
    [--divider-w:1px]
    [--left-shift:0px]   /* nudge LEFT text horizontally (+right / -left) */
    [--right-shift:0px]  /* nudge RIGHT text horizontally (+right / -left) */
    [grid-template-columns:max-content_var(--left-gap)_var(--divider-w)_var(--right-gap)_minmax(0,1fr)]
  "
>
  {/* LEFT text (you can also nudge via --left-shift) */}
  <div className="pr-0 ml-[var(--left-shift)]">
    <p className={`${smallText} break-words min-h-[36px]`} style={{ contain: "layout" }}>
      Willeder Inc.（アメリカ法人）<br />
      501 Congress Avenue, Suite 150, Austin, Texas, 78701, USA
    </p>
  </div>

  {/* spacer before the divider (width = --left-gap) */}
  <div aria-hidden className="pointer-events-none" />

  {/* divider (width = --divider-w) */}
  <span className="self-stretch bg-white/70 w-[var(--divider-w)]" aria-hidden="true" />

  {/* spacer after the divider (width = --right-gap) */}
  <div aria-hidden className="pointer-events-none" />

  {/* RIGHT text (you can also nudge via --right-shift) */}
  <div className="pl-0 mr-[var(--right-shift)]">
    <p className={`${smallText} break-words min-h-[36px]`} style={{ contain: "layout" }}>
      ウィルダー株式会社（日本法人）<br />
      〒141-0022　東京都品川区東五反田1-4-9-606
    </p>
  </div>
</div>


          <div className="w-full max-w-[1280px] -mt-[32px] min-[600px]:-mt-[30px]">
            <a href="mailto:support@willeder.com" className={`${smallText} underline-none underline-offset-2 hover:no-underline break-words`}>
              support@willeder.com
            </a>
          </div>
        </div>

        <div className="w-full max-w-[1280px]">
          <p className={`${reservedText} text-white/70 min-h-[15px]`} style={{ contain: "layout" }}>
            Willeder Inc. all rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
