// src/components/LatestBlogShowcase.tsx
import BlogSection from "./BlogSection";

type Teaser = { slug: string; title: string; thumbnail: string; createdAt: string };

type Props = {
  posts?: Teaser[];          // ← optional
  displayDates?: string[];   // ← optional
  graySets?: string[][];     // ← optional
};

export default function LatestBlogShowcase({
  posts = [],
  displayDates = [],
  graySets = [],
}: Props) {
  // If any array is shorter, we only render up to the common length
  const count = Math.min(posts.length, displayDates.length, graySets.length);

  // Nothing to show? Render nothing safely.
  if (count === 0) return null;

  return (
    <BlogSection
      posts={posts.slice(0, count)}
      displayDates={displayDates.slice(0, count)}
      graySets={graySets.slice(0, count)}
    />
  );
}
