// src/components/LatestBlogShowcase.tsx
import BlogSection from "./BlogSection";

type Teaser = { slug: string; title: string; thumbnail: string; createdAt: string };

type Props = {
  posts: Teaser[];
  displayDates: string[];
  graySets: string[][];
};

export default function LatestBlogShowcase({ posts, displayDates, graySets }: Props) {
  const count = Math.min(posts.length, displayDates.length, graySets.length);
  return (
    <BlogSection
      posts={posts.slice(0, count)}
      displayDates={displayDates.slice(0, count)}
      graySets={graySets.slice(0, count)}
    />
  );
}
