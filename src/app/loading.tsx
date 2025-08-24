// app/loading.tsx
export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[1000] grid place-items-center bg-white/80"
      role="status"
      aria-label="Loading"
      aria-live="polite"
    >
      <div className="h-10 w-10 rounded-full border-4 border-black/20 border-t-black animate-spin" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
