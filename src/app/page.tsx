import Hero from "../../components/Hero";
import BlogSection from "../../components/BlogSection";
import ServiceSection from "../../components/ServiceSection";
import StanSection from "../../components/StanSection";
import { MOCK_BLOGS } from "../../lib/mockBlogs";

export default function HomePage() {
  const latest = MOCK_BLOGS.slice(0, 3);
  const displayDates = ["2025.08.10", "2025.08.03", "2025.08.10"];
  const graySets = [
    ["IT Consulting", "Engineering", "Other"],
    ["Engineering", "Branding", "Other"],
    ["Branding", "Other"],
  ];

  return (
    <div>
      <Hero />
      <ServiceSection />
      <BlogSection posts={latest} displayDates={displayDates} graySets={graySets} />
      <StanSection />
    </div>
  );
}
