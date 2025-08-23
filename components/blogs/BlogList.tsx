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
  tags: string[];
  createdAt: string;
};

export default function BlogList({ posts, loading }: { posts: Blog[]; loading: boolean }) {
  const reduce = useReducedMotion();

  return (
    <div className="mx-auto w-full max-w-[1280px] relative min-h-[240px]">
      {loading && (
        <div className="absolute inset-0 grid place-items-center bg-white/70 z-10">
          <Spinner label="Searching…" />
        </div>
      )}

      {!loading && posts.length === 0 && (
        <div className="w-full py-16 text-center text-gray-600">No results found.</div>
      )}

      <motion.ul
        layout
        className="
          grid
          grid-cols-1
          min-[600px]:grid-cols-2
          min-[1024px]:grid-cols-3
          gap-x-6 gap-y-10
          mb-10
        "
        transition={reduce ? { duration: 0.2 } : { layout: { duration: 0.35 } }}
        aria-busy={loading}
        aria-live="polite"
      >
        <AnimatePresence mode="popLayout">
          {posts.map((p) => {
            const grayTags = FIXED_TAGS.filter((t) => !p.tags.includes(t));
            return (
              <motion.div
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
                className="flex justify-center"
              >
                <BlogCard
                  slug={p.slug}
                  title={p.title}
                  thumbnail={p.thumbnail}
                  createdAt={p.createdAt}
                  variant="showcase"
                  grayTags={grayTags}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
