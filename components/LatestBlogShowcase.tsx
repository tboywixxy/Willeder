// src/components/LatestBlogShowcase.tsx
import { headers } from "next/headers";
import BlogSection from "../components/BlogSection"; // <-- your existing component

type Teaser = {
  slug: string;
  title: string;
  thumbnail: string;
  createdAt: string;
};

const FIXED_TAGS = ["IT Consulting", "Engineering", "Branding", "Design", "Other"];

function formatDateDotYYYYMMDD(d: string) {
  const dt = new Date(d);
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const dd = String(dt.getDate()).padStart(2, "0");
  return `${y}.${m}.${dd}`;
}

function baseUrlFromHeaders() {
  const h = headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}

export default async function LatestBlogShowcase() {
  // Always hit your API so ordering/filter logic is identical to /blogs
  const res = await fetch(`${baseUrlFromHeaders()}/api/blogs?limit=3&page=1`, {
    cache: "no-store",
    // If you prefer light ISR instead, use:
    // next: { revalidate: 60 },
  });

  if (!res.ok) {
    // Fallback: render nothing (or you could render an empty state)
    return null;
  }

  const data = await res.json() as {
    items: Array<{
      slug: string;
      title: string;
      thumbnail: string;
      createdAt: string;
      tags?: string[];
    }>;
  };

  const items = data.items ?? [];

  // Adapt to BlogSection props
  const posts: Teaser[] = items.map((p) => ({
    slug: p.slug,
    title: p.title,
    thumbnail: p.thumbnail,
    createdAt: p.createdAt,
  }));

  const displayDates = items.map((p) => formatDateDotYYYYMMDD(p.createdAt));

  // BlogSection expects "graySets": which tags should be gray
  const graySets = items.map((p) => {
    const active = (p.tags ?? []).map((t) => t.toLowerCase());
    return FIXED_TAGS.filter((t) => !active.includes(t.toLowerCase()));
  });

  return <BlogSection posts={posts} displayDates={displayDates} graySets={graySets} />;
}
