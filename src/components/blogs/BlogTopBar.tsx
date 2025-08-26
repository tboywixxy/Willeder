// components/blogs/BlogTopBar.tsx
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

  const topTextCls  = `${notoSansJp.className} font-bold text-[clamp(24px,calc(100vw/1440*32),32px)] leading-[1.5] tracking-[0.05em] text-center`;
  const mainTextCls = `${jost.className}      font-medium text-[clamp(16px,calc(100vw/1440*20),20px)] leading-[1.5] tracking-[0.05em] text-center`;

  const inputTextCls  = `${notoSansJp.className} font-bold leading-[1.5] tracking-[0.05em] text-left  text-[clamp(14px,calc(100vw/1440*16),16px)]`;
  const buttonTextCls = `${notoSansJp.className} font-bold leading-[1.5] tracking-[0.05em] text-center text-[clamp(16px,calc(100vw/1440*20),20px)]`;

  return (
    <div className="mx-auto w-full max-w-[1280px] flex flex-col items-center gap-[60px]">
      {/* Heading */}
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <div className={topTextCls}>{headingTop}</div>
        <div className="w-full flex items-center gap-4">
          <span className="hidden md:block h-px bg-black w-[clamp(120px,calc(100vw/1440*592),592px)]" aria-hidden="true" />
          <span className="md:hidden flex-1 h-px bg-black" aria-hidden="true" />
          <h1 className={mainTextCls}>{headingMain}</h1>
          <span className="hidden md:block h-px bg-black w-[clamp(120px,calc(100vw/1440*592),592px)]" aria-hidden="true" />
          <span className="md:hidden flex-1 h-px bg-black" aria-hidden="true" />
        </div>
      </div>

      {/* Search */}
      <form
        className="mx-auto w-full max-w-full min-[600px]:max-w-[720px] flex items-stretch"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <label htmlFor="blog-search" className="sr-only">検索</label>

        <input 
          id="blog-search"
          type="search"
          placeholder="キーワードを入力"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          className={[
            "min-w-0 flex-1 rounded-l-md bg-[#F2F4F1]",
            "px-3 outline-none placeholder-black/50  appearance-none",
             "focus:outline-none focus:ring-0 focus:border-transparent active:outline-none",
            "min-h-[clamp(40px,calc(100vw/1440*44),44px)]",
            inputTextCls,
          ].join(" ")}
          enterKeyHint="search"
        />

        <button
          type="submit"
          className={[
            "shrink-0 rounded-r-md bg-black text-white border border-black border-l-0",
            "inline-flex items-center justify-center gap-2",
            "px-[clamp(12px,calc(100vw/1440*16),16px)]",
            "min-h-[clamp(40px,calc(100vw/1440*44),44px)]",
            buttonTextCls,
          ].join(" ")}
          title="Search"
        >
          <span>検索</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="relative"
            style={{ top: 3, left: 2.01 }}
            width="20.5"
            height="20.5"
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

      {/* Tags */}
      <div className="w-full max-w-[1280px] flex flex-wrap items-center justify-center gap-6">
        <TagChip label="All" active={allActive} onClick={onClearTags} />
        {tags.map((t) => (
          <TagChip key={t} label={t} active={selected.includes(t)} onClick={() => onToggleTag(t)} />
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
    "h-[clamp(26px,calc(100vw/1440*28),28px)] " +
    "px-[clamp(12px,calc(100vw/1440*16),16px)] " +
    "text-[clamp(11px,calc(100vw/1440*12),12px)] " +
    "leading-[1]";

  const style = active ? "border-black text-black" : "border-[#B9BDC6] text-[#B9BDC6]";

  return (
    <button type="button" aria-pressed={active} onClick={onClick} className={`${base} ${style}`}>
      {label}
    </button>
  );
}
