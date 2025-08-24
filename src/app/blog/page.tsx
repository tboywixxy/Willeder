// app/blogs/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import BlogIndexClient from "@/app/blog/BlogIndexClient"; // absolute alias
import StanSection from "../../components/StanSection";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Browse all posts, filter by tags, and search titles.",
  // relative canonical resolves against metadataBase in layout.tsx
  alternates: { canonical: "/blogs" },
  openGraph: { url: "/blogs", title: "Blogs" },
  twitter: { card: "summary_large_image", title: "Blogs" },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Loading…</div>}>
      <BlogIndexClient />
      <StanSection />
    </Suspense>
  );
}
