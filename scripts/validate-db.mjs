import fs from "node:fs";
import path from "node:path";

const inputPath = process.argv[2] || "./db.json";
const absPath = path.resolve(process.cwd(), inputPath);

console.log("🔍 Validating DB file:", absPath);

if (!fs.existsSync(absPath)) {
  console.error("❌ File not found:", absPath);
  process.exit(1);
}

const stat = fs.statSync(absPath);
console.log(`   size=${stat.size} bytes  modified=${stat.mtime.toISOString()}\n`);

const raw = fs.readFileSync(absPath, "utf8");
const data = JSON.parse(raw);

const posts = Array.isArray(data.blogs) ? data.blogs : [];
console.log(`Found ${posts.length} blog(s).\n`);

const results = posts.map((b) => {
  const c = b.content || "";
  const len = c.length; // includes HTML
  const hasH2  = /<h2[\s>]/i.test(c);
  const hasP   = /<p[\s>]/i.test(c);
  const hasImg = /<img[\s>]/i.test(c);
  return { slug: b.slug, length: len, hasH2, hasP, hasImg, ok: len >= 600 && hasH2 && hasP && hasImg };
});

const bad = results.filter(r => !r.ok);

console.table(results.map(({ slug, length, hasH2, hasP, hasImg, ok }) => ({ slug, length, hasH2, hasP, hasImg, ok })));

if (bad.length === 0) {
  console.log("\n✅ All posts meet the ≥600 chars + <h2>/<p>/<img> requirements.");
} else {
  console.log("\n❌ Some posts need fixes:");
  for (const r of bad) {
    console.log(`- ${r.slug} :: length=${r.length} (>=600? ${r.length >= 600}) h2=${r.hasH2} p=${r.hasP} img=${r.hasImg}`);
  }
  process.exitCode = 1;
}
