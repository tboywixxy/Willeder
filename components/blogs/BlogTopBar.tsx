// src/components/blogs/BlogTopBar.tsx
"use client";

type Props = {
  headingTop?: string;
  headingMain?: string;
  inputValue: string;
  onInputChange: (v: string) => void;
  onSubmit: () => void;
  tags: string[];
  selected: string[];
  onToggleTag: (tag: string) => void;
  onClearTags: () => void;
};

export default function BlogTopBar({
  headingTop = "GGS",
  headingMain = "BLOG",
  inputValue,
  onInputChange,
  onSubmit,
  tags,
  selected,
  onToggleTag,
  onClearTags,
}: Props) {
  const allActive = selected.length === 0;

  return (
    <div className="mx-auto w-full max-w-[1280px] flex flex-col items-center gap-6">
      {/* Heading (center + lines) */}
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <div className="text-sm tracking-widest">{headingTop}</div>
        <div className="w-full flex items-center gap-4">
          <span className="h-px flex-1 bg-black" aria-hidden="true" />
          <h1 className="text-2xl md:text-3xl font-semibold">{headingMain}</h1>
          <span className="h-px flex-1 bg-black" aria-hidden="true" />
        </div>
      </div>

      {/* Search group: transparent input + black button flush on the right */}
<form
  className="mx-auto w-full max-w-[720px] flex items-stretch"
  role="search"
  onSubmit={(e) => {
    e.preventDefault();
    onSubmit();
  }}
>
  <label htmlFor="blog-search" className="sr-only">Search blogs</label>

  {/* INPUT: transparent, takes remaining width */}
  <input
    id="blog-search"
    type="search"
    placeholder="Search blog titles or tags…"
    value={inputValue}
    onChange={(e) => onInputChange(e.target.value)}
    className="
      flex-1 h-11
      rounded-l-md
      border border-black
      bg-transparent
      px-3 outline-none
      placeholder-black/50
      focus:ring-2 focus:ring-black
    "
  />

  {/* BUTTON: black, fixed size, never shrinks */}
  <button
    type="submit"
    className="
      shrink-0
      h-11 px-4
      rounded-r-md
      bg-black text-white font-medium
      border border-black border-l-0
      inline-flex items-center gap-2
    "
    title="Search"
  >
    <span>Search</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  </button>
</form>


      {/* Tags row + All chip (unchanged) */}
      <div className="w-full max-w-[1280px] flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={onClearTags}
          aria-pressed={allActive}
          className={[
            "inline-flex h-[28px] items-center rounded-[4px] border px-4 text-[12px] leading-[28px]",
            allActive ? "border-black bg-black text-white" : "border-black text-black",
          ].join(" ")}
        >
          All
        </button>
        {tags.map((t) => {
          const active = selected.includes(t);
          return (
            <button
              key={t}
              type="button"
              onClick={() => onToggleTag(t)}
              aria-pressed={active}
              className={[
                "inline-flex h-[28px] items-center rounded-[4px] border px-4 text-[12px] leading-[28px]",
                active ? "border-black bg-black text-white" : "border-black text-black",
              ].join(" ")}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}
