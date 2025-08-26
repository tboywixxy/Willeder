// app/blog/BlogIndexClient.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BlogTopBar from "../../components/blogs/BlogTopBar";
import BlogList from "../../components/blogs/BlogList";

const FIXED_TAGS = ["IT Consulting", "Engineering", "Branding", "Design", "Other"];
const PAGE_SIZE = 12;

type Blog = {
  id: string | number;
  slug: string;
  title: string;
  thumbnail: string;
  tags: string[];
  createdAt: string;
};

export default function BlogIndexClient() {
  const router = useRouter();
  const sp = useSearchParams();

  // URL → state (source of truth)
  const urlQ = sp.get("q") || "";
  const urlTagCSV = sp.get("tag") || "";
  const urlTags = urlTagCSV ? urlTagCSV.split(",").map((s) => s.trim()).filter(Boolean) : [];
  const urlPage = Math.max(1, parseInt(sp.get("page") || "1", 10));

  // Controlled inputs
  const [input, setInput] = useState(urlQ);
  const [query, setQuery] = useState(urlQ);
  const [selected, setSelected] = useState<string[]>(urlTags);
  const [page, setPage] = useState(urlPage);

  // Data
  const [items, setItems] = useState<Blog[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // Keep local controls in sync with URL (back/forward/share)
  useEffect(() => {
    setInput(urlQ);
    setQuery(urlQ);
    setSelected(urlTags);
    setPage(urlPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlQ, urlTagCSV, urlPage]);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / PAGE_SIZE)), [total]);

  // Build URL and push (keeps it shareable / crawlable) — always on /blog
  const pushState = (nextPage = page, nextQuery = query, nextTags = selected) => {
    const params = new URLSearchParams();
    if (nextQuery) params.set("q", nextQuery);
    if (nextTags.length) params.set("tag", nextTags.join(","));
    params.set("page", String(nextPage));
    router.push(`/blog?${params.toString()}`);
  };

  // Fetch blogs (API uses ISR; client fetch can be no-store)
  async function fetchBlogs() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", String(PAGE_SIZE));
      if (query) params.set("q", query);
      if (selected.length) params.set("tag", selected.join(","));

      const r = await fetch(`/api/blogs?${params.toString()}`, { cache: "no-store" });
      const data = await r.json();
      setItems(data.items || []);
      setTotal(data.total || 0);
    } finally {
      setLoading(false);
    }
  }

  // Initial + on changes
  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query, selected.join(",")]);

  // Clamp page if filters reduce total
  useEffect(() => {
    const newTotalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    if (page > newTotalPages) {
      setPage(newTotalPages);
      pushState(newTotalPages, query, selected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  // Actions
  function onSubmit() {
    setPage(1);
    setQuery(input);
    pushState(1, input, selected);
  }

  function onToggleTag(tag: string) {
    const next = selected.includes(tag) ? selected.filter((t) => t !== tag) : [...selected, tag];
    setSelected(next);
    setPage(1);
    pushState(1, query, next);
  }

  function onClearTags() {
    setSelected([]);
    setPage(1);
    pushState(1, query, []);
  }

  function goTo(p: number) {
    const next = Math.min(Math.max(1, p), totalPages);
    setPage(next);
    pushState(next, query, selected);
  }

  // Small “X–Y of Z” helper
  const fromIdx = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const toIdx = Math.min(page * PAGE_SIZE, total);

  // Moving window for page numbers
  const pageWindow = (() => {
    const span = 7;
    const half = Math.floor(span / 2);
    let start = Math.max(1, page - half);
    const end = Math.min(totalPages, start + span - 1);
    start = Math.max(1, end - span + 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  })();

  return (
    <div className="bg-[#F1F2F4] md:pb-[3px] md:pt-[85px]">
      <section className="pt-10 md:pt-[3px]">
        <div className="mx-auto w-full max-w-[1440px] px-4 md:px-20 space-y-8">
          <BlogTopBar
            inputValue={input}
            onInputChange={setInput}
            onSubmit={onSubmit}
            tags={FIXED_TAGS}
            selected={selected}
            onToggleTag={onToggleTag}
            onClearTags={onClearTags}
          />

          {/* Results summary */}
          <div className="mx-auto w-full max-w-[1280px] -mt-2 text-sm text-gray-600">
            {total > 0 ? (
              <span>
                Showing <strong>{fromIdx}</strong>–<strong>{toIdx}</strong> of <strong>{total}</strong>{" "}
                result{total === 1 ? "" : "s"}
              </span>
            ) : (
              <span>No results</span>
            )}
          </div>

          <BlogList posts={items} loading={loading} />

          {/* Pagination or spacer for bottom breathing room */}
          {Math.max(1, Math.ceil(total / PAGE_SIZE)) > 1 ? (
            <nav
              className="mx-auto w-full max-w-[1280px] flex items-center justify-center gap-2 pb-16"
              role="navigation"
              aria-label="Pagination"
            >
              <button
                type="button"
                onClick={() => goTo(page - 1)}
                disabled={page <= 1}
                className="px-3 py-2 rounded-md border border-black disabled:opacity-40 hover:bg-black hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
              >
                Prev
              </button>

              {pageWindow.map((n) => {
                const active = n === page;
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => goTo(n)}
                    aria-current={active ? "page" : undefined}
                    className={`px-3 py-2 rounded-md border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black ${
                      active ? "border-black bg-black text-white" : "border-black hover:bg.black hover:text-white"
                    }`.replace(".black", "black")} // keep classnames exact
                  >
                    {n}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => goTo(page + 1)}
                disabled={page >= totalPages}
                className="px-3 py-2 rounded-md border border-black disabled:opacity-40 hover:bg-black hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
              >
                Next
              </button>
            </nav>
          ) : (
            <div className="mx-auto w-full max-w-[1280px] pb-16" aria-hidden="true" />
          )}
        </div>
      </section>
    </div>
  );
}
