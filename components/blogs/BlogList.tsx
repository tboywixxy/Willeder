// src/components/blogs/BlogList.tsx
"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Spinner from "../../components/ui/Spinner";
import BlogCard from "../../components/BlogCard";

const FIXED_TAGS = ["IT Consulting", "Engineering", "Branding", "Design", "Other"];

type Blog = {
  id: string | number;
  slug: string;
  title: string;
  thumbnail: string;
  tags: string[];    // available (black) tags
  createdAt: string;
};

export default function BlogList({ posts, loading }: { posts: Blog[]; loading: boolean }) {
  const reduce = useReducedMotion();

  // section wrapper controls spinner & empty states
  return (
    <div className="mx-auto w-full max-w-[1280px] relative min-h-[240px]">
      {/* Section-only spinner */}
      {loading && (
        <div className="absolute inset-0 grid place-items-center bg-white/70 z-10">
          <Spinner label="Searching…" />
        </div>
      )}

      {/* No results (only when not loading) */}
      {!loading && posts.length === 0 && (
        <div className="w-full py-16 text-center text-gray-600">
          No results found.
        </div>
      )}

      {/* Grid (animated) */}
      <motion.ul
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        transition={reduce ? { duration: 0.2 } : { layout: { duration: 0.35 } }}
        aria-busy={loading}
        aria-live="polite"
      >
        <AnimatePresence mode="popLayout">
          {posts.map((p) => {
            const grayTags = FIXED_TAGS.filter((t) => !p.tags.includes(t));
            return (
              <motion.li
                key={p.id}
                layout
                initial={{ opacity: 0, y: 10, rotate: reduce ? 0 : (Math.random() * 2 - 1) * 1.2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={
                  reduce
                    ? { duration: 0.2 }
                    : { type: "spring", stiffness: 500, damping: 34, mass: 0.5 }
                }
                className="will-change-transform"
              >
                <BlogCard
                  slug={p.slug}
                  title={p.title}
                  thumbnail={p.thumbnail}
                  createdAt={p.createdAt}
                  variant="showcase"
                  grayTags={grayTags}
                />
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
