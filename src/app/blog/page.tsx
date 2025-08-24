// app/blogs/page.tsx
import { Suspense } from "react";
import BlogIndexClient from "../blog/BlogIndexClient"; // reuse your client component
export const metadata = { title: "Blogs" };
export default function Page() {
  return <Suspense fallback={<div className="py-24 text-center">Loading…</div>}><BlogIndexClient /></Suspense>;
}
