"use client";

import { notoSansJp, jost } from "@/app/fonts";

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
  headingTop = "ブログ",
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

  const topTextCls  = `${notoSansJp.className} font-bold text-[32px] leading-[150%] tracking-[0.05em] text-center`;
  const mainTextCls = `${jost.className}      font-medium text-[20px] leading-[150%] tracking-[0.05em] text-center`;

  // Responsive text sizes so the controls shrink on small screens
  const inputTextCls  = `${notoSansJp.className} font-bold leading-[150%] tracking-[0.05em] text-left text-[14px] min-[600px]:text-[16px]`;
  const buttonTextCls = `${notoSansJp.className} font-bold leading-[150%] tracking-[0.05em] text-center text-[16px] min-[600px]:text-[18px] min-[1024px]:text-[20px]`;

  return (
    <div className="mx-auto w-full max-w-[1280px] flex flex-col items-center gap-6">
      {/* Heading (top + BLOG between lines) */}
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <div className={topTextCls}>{headingTop}</div>
        <div className="w-full flex items-center gap-4">
          <span className="hidden md:block w-[592px] h-px bg-black" aria-hidden="true" />
          <span className="md:hidden flex-1 h-px bg-black" aria-hidden="true" />
          <h1 className={mainTextCls}>{headingMain}</h1>
          <span className="hidden md:block w-[592px] h-px bg-black" aria-hidden="true" />
          <span className="md:hidden flex-1 h-px bg-black" aria-hidden="true" />
        </div>
      </div>

      {/* Search group – shrinks on small screens */}
      <form
        className="mx-auto w-full max-w-full min-[600px]:max-w-[720px] flex items-stretch"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <label htmlFor="blog-search" className="sr-only">Search blogs</label>

        <input
          id="blog-search"
          type="search"
          placeholder="Search blog titles or tags…"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          className={[
            "min-w-0 flex-1 h-11 rounded-l-md border border-black bg-transparent",
            "px-3 outline-none placeholder-black/50 focus:ring-2 focus:ring-black",
            inputTextCls,
          ].join(" ")}
        />

        <button
          type="submit"
          className={[
            "shrink-0 h-11 rounded-r-md bg-black text-white border border-black border-l-0",
            "inline-flex items-center justify-center gap-2",
            // tighter padding on small screens so it never overflows
            "px-3 min-[600px]:px-4",
            buttonTextCls,
          ].join(" ")}
          title="Search"
        >
          <span>Search</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="relative"
            style={{ top: 3, left: 2.01 }}
            width="20.5084"
            height="20.5198"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </form>

      {/* Tags – shrink font/height/padding, wrap nicely */}
      <div className="w-full max-w-[1280px] flex flex-wrap items-center justify-center gap-2">
        <TagChip
          label="All"
          active={allActive}
          onClick={onClearTags}
        />
        {tags.map((t) => (
          <TagChip
            key={t}
            label={t}
            active={selected.includes(t)}
            onClick={() => onToggleTag(t)}
          />
        ))}
      </div>
    </div>
  );
}

function TagChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  const base =
    "inline-flex items-center rounded-[4px] border " +
    // shrink height/font/padding on tiny screens
    "h-[26px] min-[600px]:h-[28px] " +
    "px-3 min-[600px]:px-4 " +
    "text-[11px] min-[600px]:text-[12px] " +
    "leading-[1]";

  const style = active
    ? "border-black text-black"
    : "border-[#B9BDC6] text-[#B9BDC6]";

  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`${base} ${style}`}
    >
      {label}
    </button>
  );
}
