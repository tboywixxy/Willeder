// src/app/page.tsx
import Hero from "../../components/Hero";
import ServiceSection from "../../components/ServiceSection";
import StanSection from "../../components/StanSection";
import LatestBlogShowcase from "../../components/LatestBlogShowcase";
import { MOCK_BLOGS } from "../../lib/mockBlogs";

// Make the homepage fully static for faster TTFB and stable LCP
export const dynamic = "force-static";
export const revalidate = false;

export default function HomePage() {
  // Use just what you need (avoid unused vars)
  const posts = MOCK_BLOGS.slice(0, 3);
  const displayDates = posts.map((p) =>
    p.createdAt.includes("-") ? p.createdAt.replaceAll("-", ".") : p.createdAt
  );
  const graySets = [
    ["IT Consulting", "Engineering", "Other"],
    ["Engineering", "Branding", "Other"],
    ["Branding", "Other"],
  ];

  return (
    <>
      {/* Keep Hero minimal + server-only (no "use client" inside Hero) */}
      <Hero />

      {/* Defer layout/paint for off-screen sections without causing CLS */}
      <div style={{ contentVisibility: "auto", containIntrinsicSize: "1100px" }}>
        <ServiceSection />
      </div>

      <div style={{ contentVisibility: "auto", containIntrinsicSize: "1000px" }}>
        <LatestBlogShowcase
          posts={posts}
          displayDates={displayDates}
          graySets={graySets}
        />
      </div>

      <div style={{ contentVisibility: "auto", containIntrinsicSize: "900px" }}>
        <StanSection />
      </div>
    </>
  );
}
