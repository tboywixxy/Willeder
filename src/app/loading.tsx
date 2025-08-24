// /src/app/loading.tsx  (Server Component — do NOT add "use client")
export default function Loading() {
  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center bg-white/70">
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-black/20 border-t-black"
        role="status"
        aria-label="Loading"
      />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
