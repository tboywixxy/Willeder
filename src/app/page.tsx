// src/app/page.tsx
import Hero from "../../components/Hero";
import ServiceSection from "../../components/ServiceSection";
import StanSection from "../../components/StanSection";
import LatestBlogShowcase from "../../components/LatestBlogShowcase";
import { MOCK_BLOGS } from "../../lib/mockBlogs";

export const dynamic = "force-static";
export const revalidate = false;

export default function HomePage() {
  // Build the props LatestBlogShowcase expects
  const posts = MOCK_BLOGS.slice(0, 3).map(p => ({
    slug: p.slug,
    title: p.title,
    thumbnail: p.thumbnail,
    createdAt: p.createdAt,
  }));
  const displayDates = posts.map(p =>
    p.createdAt.includes("-") ? p.createdAt.replaceAll("-", ".") : p.createdAt
  );
  const graySets = [
    ["IT Consulting", "Engineering", "Other"],
    ["Engineering", "Branding", "Other"],
    ["Branding", "Other"],
  ];

  return (
    <>
      <Hero />
      <ServiceSection />
      <LatestBlogShowcase posts={posts} displayDates={displayDates} graySets={graySets} />
      <StanSection />
    </>
  );
}
