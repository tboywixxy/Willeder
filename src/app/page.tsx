// src/app/page.tsx
import Hero from "../components/Hero";
import ServiceSection from "../components/ServiceSection";
import StanSection from "../components/StanSection";
import LatestBlogShowcase from "../components/LatestBlogShowcase";
import { absoluteUrl } from "@/lib/absolute-url";

type Teaser = { slug: string; title: string; thumbnail: string; createdAt: string };

async function getLatest(limit = 3): Promise<Teaser[]> {
  const r = await fetch(
    absoluteUrl(`/api/blogs?page=1&limit=${limit}`),
    { cache: "no-store" } // same as your blog list client fetch => always fresh in dev
  );
  if (!r.ok) throw new Error(`Failed to load blogs: ${r.status}`);
  const data = (await r.json()) as { items?: Teaser[] };
  return data.items ?? [];
}

export default async function HomePage() {
  // set to 12 if you want 12 cards on the homepage:
  const posts = await getLatest(3);

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
