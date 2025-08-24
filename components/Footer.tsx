import Image from "next/image";
import Link from "next/link";
import { notoSansJp, jost } from "@/app/fonts";

export default function Footer() {
  const navText = `${notoSansJp.className} font-bold text-[12px] leading-[150%] tracking-[0.05em] align-middle`;
  const smallText = `${notoSansJp.className} font-medium text-[12px] leading-[150%] tracking-[0.05em] align-middle`;
  const reservedText = `${jost.className} font-medium text-[10px] leading-[150%] tracking-[0.1em] text-center`;

  return (
    <footer className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1440px] h-auto min-[600px]:h-[301px] px-4 min-[600px]:px-20 py-4 flex flex-col gap-6">
        <div className="w-full max-w-[1280px] h-auto min-[600px]:h-[230px] pt-6 pb-4 flex flex-col gap-8">
          {/* Logo (no priority; explicit sizes to avoid unsized-images/CLS) */}
          <div className="flex items-center">
            <Image
              src="/Willeder-w.png"
              alt="Willeder"
              width={120}
              height={24}
              sizes="(min-width:600px) 120px, 120px"
              priority={false}
            />
          </div>

          {/* Links */}
          <nav className="flex items-center gap-[64px] h-8" aria-label="Footer navigation">
            <Link href="/" prefetch={false} className={`${navText} inline-block`}>Home</Link>
            <Link href="/blog" prefetch={false} className={`${navText} inline-block`}>Blogs</Link>
            <Link href="/contact" prefetch={false} className={`${navText} inline-block`}>Contact</Link>
          </nav>

          {/* Addresses (stacked on <600, columns ≥600) */}
          <div className="min-[600px]:hidden w-full max-w-[1280px]">
            <p className={`${smallText} break-words`}>
              Willeder Inc.（アメリカ法人）<br />
              501 Congress Avenue, Suite 150, Austin, Texas, 78701, USA
            </p>
            <span className="block h-[2px] w-full bg-white/60 my-2" aria-hidden="true" />
            <p className={`${smallText} break-words`}>
              ウィルダー株式会社（日本法人）<br />
              〒141-0022　東京都品川区東五反田1-4-9-606
            </p>
          </div>

          <div
            className="
              hidden min-[600px]:grid w-full max-w-[1280px]
              grid-cols-[minmax(0,1fr)_2px_minmax(0,1fr)]
              items-start
            "
          >
            <div className="pr-6">
              <p className={`${smallText} break-words`}>
                Willeder Inc.（アメリカ法人）<br />
                501 Congress Avenue, Suite 150, Austin, Texas, 78701, USA
              </p>
            </div>
            <span className="bg-white/70 self-stretch" aria-hidden="true" />
            <div className="pl-6">
              <p className={`${smallText} break-words`}>
                ウィルダー株式会社（日本法人）<br />
                〒141-0022　東京都品川区東五反田1-4-9-606
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="w-full max-w-[1280px]">
            <a
              href="mailto:hello@willeder.com"
              className={`${smallText} underline underline-offset-2 hover:no-underline break-words`}
            >
              hello@willeder.com
            </a>
          </div>
        </div>

        {/* Bottom row — reserved text centered */}
        <div className="w-full max-w-[1280px]">
          <p className={`${reservedText} text-white/70`}>
            © {new Date().getFullYear()} Willeder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
