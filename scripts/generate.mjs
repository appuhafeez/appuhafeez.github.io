import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

const postsDir = path.join(process.cwd(), "content");
const outDir = path.join(process.cwd(), "src/generated");
const publicDir = path.join(process.cwd(), "public");

fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(publicDir, { recursive: true });

function walk(dir, fileList = []) {
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      walk(full, fileList);
    } else if (file.endsWith(".md")) {
      fileList.push(full);
    }
  }
  return fileList;
}

const files = walk(postsDir);
const posts = [];

for (const file of files) {
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);

  // ✅ make slug from relative path
  const rel = path.relative(postsDir, file);
  const slug = rel.replace(/\.md$/, "").replace(/[\\/]/g, "-");

  /*const excerpt = String(
    await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(content.replace(/\s+/g, " ").trim().slice(0, 60) + (content.length > 60 ? "…" : "")));*/

  const excerpt = content.replace(/\s+/g, " ").trim().slice(0, 60) + (content.length > 60 ? "…" : "");

  posts.push({
    slug,
    title: data.title || slug,
    tags: data.tags || [],
    category: data.category || "general",
    created: data.created || new Date().toISOString(),
    updated: data.updated || new Date().toISOString(),
    raw: content,
    excerpt,
  });
}

// ✅ exclude "about"
const filtered = posts.filter((p) => p.slug !== "about");
const filtered_about = posts.filter((p) => p.slug === "about");
// Write TypeScript content file
fs.writeFileSync(
  path.join(outDir, "content.ts"),
  `// Auto-generated\nexport const posts = ${JSON.stringify(filtered, null, 2)};\nexport const about = ${JSON.stringify(filtered_about, null, 2)};
  `
);

// ✅ Also write search index JSON
const searchIndex = filtered.map((p) => ({
  slug: p.slug,
  title: p.title,
  text: p.raw.slice(0, 500), // keep first 500 chars
  tags: p.tags,
  category: p.category,
}));

fs.writeFileSync(
  path.join(publicDir, "search-index.json"),
  JSON.stringify(searchIndex, null, 2)
);

console.log(`✅ Generated ${filtered.length} posts, content.ts and search-index.json`);
