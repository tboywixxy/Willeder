// src/app/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div>
<section className="bg-gray-50">
  <div className="mx-auto w-full max-w-[1440px] px-4 md:px-20 py-10 md:py-16">
    {/* 1 col by default; 2 cols at ≥md (your 1024px breakpoint) */}
    <div className="grid gap-8 md:grid-cols-2 md:gap-16 place-items-center">
      {/* TEXT (always first) */}
      <div className="order-1 w-full max-w-[640px]">
        <h1 className="text-[clamp(24px,3vw,40px)] font-bold tracking-tight">
          Welcome to Willeder
        </h1>

        <p className="mt-4 text-[clamp(14px,1.4vw,18px)] text-gray-600 max-w-prose">
          Pixel-perfect, responsive blog built with Next.js. This is a static
          skeleton—no APIs yet.
        </p>

        {/* Desktop/Tablet CTA (visible only on horizontal layout) */}
        <div className="mt-6 hidden md:block">
          <Link href="/blogs" className="inline-block bg-black text-white px-4 py-2">
            View Blogs
          </Link>
        </div>
      </div>

      {/* IMAGE (second on both layouts) */}
      <div className="order-2 relative w-full max-w-[640px] aspect-[640/695.04] rounded-lg overflow-hidden shadow mx-auto">
        <Image
          src="https://picsum.photos/seed/hero/1200/630"
          alt="Hero"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Mobile CTA (under the image, centered; hidden on horizontal) */}
      <div className="order-3 md:hidden w-full max-w-[640px]">
        <Link
          href="/blogs"
          className="mt-4 mx-auto block text-center bg-black text-white px-4 py-2"
        >
          View Blogs
        </Link>
      </div>
    </div>
  </div>
</section>

    </div>
  );
}
