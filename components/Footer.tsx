import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Full footer box
         - Mobile: h-auto, px-4 (16px)
         - ≥sm (600+): exact Figma: h=301px, px-20 (80px)
      */}
      <div className="mx-auto w-full max-w-[1440px] h-auto sm:h-[301px] px-4 sm:px-20 py-4 flex flex-col">
        {/* Content box
           - Mobile: h-auto
           - ≥sm: exact Figma: h=230px
        */}
        <div className="w-full max-w-[1280px] h-auto sm:h-[230px] pt-6 pb-4 flex flex-col gap-6 sm:gap-8">
          {/* Row 1: Brand (top-left) */}
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Willeder logo"
              width={24}
              height={24}
              priority
            />
            <span className="font-semibold tracking-tight">Willeder</span>
          </div>

          {/* Row 2: Links (horizontal, left) */}
          <nav className="flex gap-6 text-sm" aria-label="Footer navigation">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/blogs" className="hover:underline">Blogs</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </nav>

          {/* Row 3: Two sections
             - Mobile: stack vertically (no divider)
             - ≥sm: two columns with thin vertical divider
          */}
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 sm:gap-6">
            <div className="min-w-0">
              <h3 className="text-sm font-medium">Section One</h3>
              <p className="mt-2 text-sm text-white/80 break-words">
                Brief copy goes here. Add any description or links you want to show in this column.
              </p>
            </div>

            {/* Divider only on ≥sm */}
            <span className="hidden sm:block w-px bg-white/30" aria-hidden="true" />

            <div className="min-w-0 sm:pl-6">
              <h3 className="text-sm font-medium">Section Two</h3>
              <p className="mt-2 text-sm text-white/80 break-words">
                More info here. This column is separated with a thin vertical line.
              </p>
            </div>
          </div>

          {/* Row 4: Email (left) */}
          <div>
            <a
              href="mailto:hello@willeder.com"
              className="text-sm underline underline-offset-2 hover:no-underline break-words"
            >
              hello@willeder.com
            </a>
          </div>
        </div>

        {/* Bottom: centered fine print */}
        <div className="mt-auto w-full">
          <p className="text-center text-xs text-white/70">
            © {new Date().getFullYear()} Willeder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
