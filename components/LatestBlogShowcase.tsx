import BlogSection from "../components/BlogSection";
import { absoluteUrl } from "@/lib/absolute-url";

type Teaser = { slug: string; title: string; thumbnail: string; createdAt: string };

const FIXED_TAGS = ["IT Consulting", "Engineering", "Branding", "Design", "Other"];

function formatDateDotYYYYMMDD(d: string) {
  const dt = new Date(d);
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const dd = String(dt.getDate()).padStart(2, "0");
  return `${y}.${m}.${dd}`;
}

export default async function LatestBlogShowcase() {
  try {
    const api = absoluteUrl("/api/blogs?limit=3&page=1");
    const res = await fetch(api, { next: { revalidate: 60 } });
    if (!res.ok) return null;

    const data = (await res.json()) as {
      items: Array<{ slug: string; title: string; thumbnail: string; createdAt: string; tags?: string[] }>;
    };

    const items = data.items ?? [];

    const posts: Teaser[] = items.map((p) => ({
      slug: p.slug,
      title: p.title,
      thumbnail: p.thumbnail,
      createdAt: p.createdAt,
    }));

    const displayDates = items.map((p) => formatDateDotYYYYMMDD(p.createdAt));
    const graySets = items.map((p) => {
      const active = (p.tags ?? []).map((t) => t.toLowerCase());
      return FIXED_TAGS.filter((t) => !active.includes(t.toLowerCase()));
    });

    return <BlogSection posts={posts} displayDates={displayDates} graySets={graySets} />;
  } catch {
    return null; // fail-quietly on build/ISR
  }
}
