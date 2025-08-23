import { Suspense } from "react";
import BlogIndexClient from "./BlogIndexClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Loading…</div>}>
      <BlogIndexClient />
    </Suspense>
  );
}
