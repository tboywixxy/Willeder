// app/loading.tsx
export default function Loading() {
  return (
    <div
      className="fixed inset-0 grid place-items-center bg-white/70 backdrop-blur-sm z-[1000]"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-black/20 border-t-black" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
