"use client";
import DOMPurify from "isomorphic-dompurify";

export default function PostContent({ html }: { html: string }) {
  const safe = DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
  return (
    <article
      className="prose max-w-none prose-img:rounded-md prose-img:mx-auto"
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
}
