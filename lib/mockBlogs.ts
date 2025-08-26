// src/lib/Blogs.ts
export type MockBlog = {
  id: string;
  slug: string;
  title: string;
  thumbnail: string;
  tags: string[];
  createdAt: string;
  content: string; // HTML (used on the detail page)
};

export const MOCK_BLOGS: MockBlog[] = [
  {
    id: "1",
    slug: "designing-with",
    title: "eeeeee",
    thumbnail: "https://picsum.photos/seed/clarity/1200/630",
    tags: ["Design", "Branding"],
    createdAt: "2025-08-01",
    content: `
      <h2>Clarity First</h2>Q
      <p>Good design starts with clear hierarchy, spacing, and readable type. This demo post exists so we can style the blog detail page before real data.</p>
      <img src="https://picsum.photos/seed/clarity-img/800/450" alt="Sample hero" />
      <p>Use semantic HTML, consistent rhythm, and accessible contrast. Later, you’ll replace this with content from JSON Server / API.</p>
    `,
  },
  {
    id: "2",
    slug: "nextjs-app-router-basics",
    title: "Next.js App Router Basics",
    thumbnail: "https://picsum.photos/seed/approuter/1200/630",
    tags: ["Engineering", "Other"],
    createdAt: "2025-08-02",
    content: `
      <h2>Routing Made Simple</h2>
      <p>The App Router organizes routes by folders. Each folder can have a page, layout, and loading states.</p>
      <img src="https://picsum.photos/seed/router-img/800/450" alt="App Router" />
      <p>You can start with static content, then connect to your APIs later.</p>
    `,
  },
  {
    id: "3",
    slug: "performance-first",
    title: "Performance First",
    thumbnail: "https://picsum.photos/seed/perf/1200/630",
    tags: ["Engineering", "Design"],
    createdAt: "2025-08-03",
    content: `
      <h2>Lighthouse Tips</h2>
      <p>Optimize images, use font-display: swap, avoid layout shifts, and keep JS minimal. This is just placeholder text.</p>
      <img src="https://picsum.photos/seed/perf-img/800/450" alt="Performance charts" />
      <p>Later, you’ll run Lighthouse, tune sizes, and validate accessibility.</p>
    `,
  },
  {
    id: "4",
    slug: "content-strategy-for-blogs",
    title: "Content Strategy for Blogs",
    thumbnail: "https://picsum.photos/seed/strategy/1200/630",
    tags: ["Branding", "Other"],
    createdAt: "2025-08-04",
    content: `
      <h2>Planning Your Editorial Calendar</h2>
      <p>Define your audience, topics, and cadence. A clear plan keeps your blog consistent and valuable.</p>
      <img src="https://picsum.photos/seed/strategy-img/800/450" alt="Planning board" />
      <p>Mix evergreen guides with timely posts, and always measure engagement to refine your approach.</p>
    `,
  },
  {
    id: "5",
    slug: "scaling-with-json-server",
    title: "Scaling Local Dev with JSON Server",
    thumbnail: "https://picsum.photos/seed/jsonserver/1200/630",
    tags: ["IT Consulting", "Engineering"],
    createdAt: "2025-08-05",
    content: `
      <h2>Mock APIs that Feel Real</h2>
      <p>JSON Server helps you iterate quickly by mocking REST endpoints from a simple db.json file.</p>
      <img src="https://picsum.photos/seed/jsonserver-img/800/450" alt="Mock API" />
      <p>Keep the response shape identical to production so your UI won’t need changes later.</p>
    `,
  },
  {
    id: "6",
    slug: "nodemailer-on-vercel",
    title: "Nodemailer on Vercel",
    thumbnail: "https://picsum.photos/seed/nodemailer/1200/630",
    tags: ["Engineering", "Other"],
    createdAt: "2025-08-06",
    content: `
      <h2>Sending Emails from Route Handlers</h2>
      <p>Use the Node.js runtime for mailers. Configure SMTP via environment variables and return helpful status codes.</p>
      <img src="https://picsum.photos/seed/nodemailer-img/800/450" alt="Mail setup" />
      <p>Wrap the client UX with clear success and error states to build trust.</p>
    `,
  },
  {
    id: "7",
    slug: "responsive-figma-to-css",
    title: "Responsive Figma → CSS with clamp()",
    thumbnail: "https://picsum.photos/seed/figmacss/1200/630",
    tags: ["Design", "IT Consulting"],
    createdAt: "2025-08-07",
    content: `
      <h2>Deriving Values from Design</h2>
      <p>Translate typography scales and paddings using viewport math and clamp() boundaries.</p>
      <img src="https://picsum.photos/seed/figmacss-img/800/450" alt="Figma specs" />
      <p>Document conversions in your README so reviewers can verify decisions quickly.</p>
    `,
  },
  {
    id: "8",
    slug: "accessibility-aa-checklist",
    title: "Accessibility AA Checklist",
    thumbnail: "https://picsum.photos/seed/a11y/1200/630",
    tags: ["Design", "Other"],
    createdAt: "2025-08-08",
    content: `
      <h2>Practical A11y Wins</h2>
      <p>Use semantic landmarks, visible focus rings, alt text, and adequate color contrast.</p>
      <img src="https://picsum.photos/seed/a11y-img/800/450" alt="Accessibility icons" />
      <p>Test with keyboard only and a screen reader to catch common issues.</p>
    `,
  },
  {
    id: "9",
    slug: "lighthouse-scores-mobile",
    title: "Hitting 90+ (Mobile)",
    thumbnail: "https://picsum.photos/seed/lh/1200/630",
    tags: ["Engineering", "Design"],
    createdAt: "2025-08-09",
    content: `
      <h2>Mobile-first Performance</h2>
      <p>Serve properly sized images with next/image, minimize JS, and prioritize visible content.</p>
      <img src="https://picsum.photos/seed/lh-img/800/450" alt="Lighthouse report" />
      <p>Measure on real devices and iterate on bottlenecks like render-blocking resources.</p>
    `,
  },
  {
    id: "10",
    slug: "branding-systems-101",
    title: "Branding Systems 101",
    thumbnail: "https://picsum.photos/seed/branding/1200/630",
    tags: ["Branding"],
    createdAt: "2025-08-10",
    content: `
      <h2>Consistency Builds Trust</h2>
      <p>Define voice, visuals, and usage rules so every touchpoint feels coherent.</p>
      <img src="https://picsum.photos/seed/branding-img/800/450" alt="Brand guidelines" />
      <p>Systems speed up production and make teams more confident about their work.</p>
    `,
  },
];
