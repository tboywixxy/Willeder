// src/app/blog/[slug]/page.tsx
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import DetailFrame from "../../../../components/blogDetail/DetailFrame";
import DetailBlocks from "../../../../components/blogDetail/DetailBlocks";

type DetailImage = { src: string; alt?: string; caption?: string };
type DetailPayload = {
  t1?: string; t2?: string; t5?: string; t6?: string; t7?: string; t8?: string;
  t11?: string; t12a?: string; t12c?: string; t12d?: string;
  t15a?: string; t15b?: string; t15c?: string;
  callout?: string;
  img1?: DetailImage; img2?: DetailImage; img3?: DetailImage;
};

type Blog = {
  id: string;
  slug: string;
  title: string;
  thumbnail: string;
  tags: string[];
  createdAt: string;
  content?: string;
  detail?: DetailPayload;
};

function baseUrlFromHeaders() {
  const h = headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}

async function getPost(base: string, slug: string): Promise<Blog | null> {
  const r = await fetch(`${base}/api/blogs/${encodeURIComponent(slug)}`, {
    next: { revalidate: 60 },
  });
  if (!r.ok) return null;
  return r.json();
}

// 👇 Next.js 15: params is a Promise — await it.
export default async function BlogDetailPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  const base = baseUrlFromHeaders();

  const post = await getPost(base, slug);
  if (!post) return notFound();

  const d = post.detail || {};
  const img1 = d.img1?.src || post.thumbnail;
  const img2 = d.img2?.src || post.thumbnail;
  const img3 = d.img3?.src || post.thumbnail;

  return (
    <div className="bg-[#F1F2F4]">
      <section className="pt-10 md:pt-16">
        <div className="mx-auto w-full max-w-[1440px] px-4 md:px-20">
          <DetailFrame
            title={post.title}
            heroSrc={post.thumbnail}
            heroAlt={post.title}
            date={post.createdAt}
            tags={post.tags}
          >
            <DetailBlocks
              img1={img1}
              img2={img2}
              img3={img3}
              detail={d}
            />
          </DetailFrame>
        </div>
      </section>
    </div>
  );
}
