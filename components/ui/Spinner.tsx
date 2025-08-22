// src/components/ui/Spinner.tsx
export default function Spinner({
  size = 48,
  stroke = 4,
  label = "Loading…",
}: { size?: number; stroke?: number; label?: string }) {
  return (
    <div role="status" aria-label={label} aria-live="polite">
      <div
        className="animate-spin rounded-full border-black/20 border-t-black"
        style={{
          width: size,
          height: size,
          borderWidth: stroke,
        }}
      />
    </div>
  );
}
