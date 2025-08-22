// src/app/blogs/page.tsx
"use client";

import { useEffect, useState } from "react";
import BlogTopBar from "../../../components/blogs/BlogTopBar";
import BlogList from "../../../components/blogs/BlogList";
import { firstImageSrcs } from "../lib/htmlUtils"; // optional utility (available if you need it)

const FIXED_TAGS = ["IT Consulting", "Engineering", "Branding", "Design", "Other"];

type Blog = {
  id: string;
  slug: string;
  title: string;
  thumbnail: string;
  tags: string[];
  createdAt: string;
  content: string; // returned by the API (used if you want to derive images)
};

export default function BlogsPage() {
  // search UX: user types in `input`; pressing Search applies it to `query`
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");

  // tag filter (OR semantics)
  const [selected, setSelected] = useState<string[]>([]);

  // pagination
  const [page, setPage] = useState(1);
  const limit = 9;

  // data + ui
  const [items, setItems] = useState<Blog[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch blogs from unified API (dev: proxies JSON Server; prod: in-repo data)
  const fetchBlogs = async () => {
    setLoading(true);

    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", String(limit));
    if (query) params.set("q", query);
    if (selected.length) params.set("tag", selected.join(","));

    try {
      const r = await fetch(`/api/blogs?${params.toString()}`, { cache: "no-store" });
      const data = await r.json();
      setItems(data.items || []);
      setTotal(Number(data.total || 0));
    } finally {
      setLoading(false);
    }
  };

  // Apply the text search
  const runSearch = () => {
    setPage(1);
    setQuery(input);
  };

  // Re-fetch when filters or page change
  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, selected, page]);

  const pageCount = Math.max(1, Math.ceil(total / limit));
  const hasPrev = page > 1;
  const hasNext = page < pageCount;

  // Example of using firstImageSrcs (not required for the grid):
  items.forEach(b => {
    // you could choose to override thumbnail with firstImg if desired
  });

  return (
    <section>
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-20 pt-24 pb-40 space-y-12">
        <BlogTopBar
          headingTop="GGS"
          headingMain="BLOG"
          inputValue={input}
          onInputChange={setInput}
          onSubmit={runSearch}
          tags={FIXED_TAGS}
          selected={selected}
          onToggleTag={(t) => {
            setSelected((prev) =>
              prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
            );
            setPage(1); // reset when filters change
          }}
          onClearTags={() => {
            setSelected([]);
            setPage(1);
          }}
        />

        <BlogList posts={items} loading={loading} />

        {/* Bottom-right pager */}
        <div className="w-full flex justify-end">
          <div className="flex items-center gap-3">
            <button
              className="border px-3 py-1 rounded disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={!hasPrev || loading}
              aria-disabled={!hasPrev}
            >
              Prev
            </button>

            <span className="text-sm tabular-nums">{page} / {pageCount}</span>

            <button
              className="border px-3 py-1 rounded disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              disabled={!hasNext || loading}
              aria-disabled={!hasNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
