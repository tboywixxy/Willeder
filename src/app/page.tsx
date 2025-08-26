// src/app/page.tsx
import Hero from "../components/Hero";
import ServiceSection from "../components/ServiceSection";
import StanSection from "../components/StanSection";
import LatestBlogShowcase from "../components/LatestBlogShowcase";
import { getLatestTeasers } from "@/app/lib/server/blogSource";

export const revalidate = 60; // optional: ISR for the homepage

export default async function HomePage() {
  // set to 12 if you want 12 cards on the homepage:
  const posts = await getLatestTeasers(3);

  const displayDates = posts.map(p =>
    p.createdAt.includes("-") ? p.createdAt.replaceAll("-", ".") : p.createdAt
  );
  const graySets = posts.map(() => [] as string[]);

  return (
    <>
      <Hero />

      <div style={{ contentVisibility: "auto", containIntrinsicSize: "1100px" }}>
        <ServiceSection />
      </div>

      <div style={{ contentVisibility: "auto", containIntrinsicSize: "1000px" }}>
        <LatestBlogShowcase posts={posts} displayDates={displayDates} graySets={graySets} />
      </div>

      <div style={{ contentVisibility: "auto", containIntrinsicSize: "900px" }}>
        <StanSection />
      </div>
    </>
  );
}
