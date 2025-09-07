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
const postDir = path.join(publicDir, "#/posts");

fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(publicDir, { recursive: true });

// clean old blog HTML files
if (fs.existsSync(postDir)) {
  fs.rmSync(postDir, { recursive: true, force: true });
}
fs.mkdirSync(postDir, { recursive: true });

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

for (const post of filtered) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${post.title}</title>
  <meta property="og:title" content="${post.title}" />
  <meta property="og:description" content="${post.excerpt}" />
  <meta property="og:image" content="https://appuhafeez.github.io/og-default.png" />
  <meta property="og:url" content="https://appuhafeez.github.io/#/posts/${post.slug}" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
  <script>
    // Redirect normal users to SPA route
    window.location.replace("/#/posts/${post.slug}");
  </script>
</head>
<body>
  <noscript>
    <a href="/#/posts/${post.slug}">View post</a>
  </noscript>
</body>
</html>`;

  // write into public/posts/[slug].html
  fs.mkdirSync(postDir, { recursive: true });
  fs.writeFileSync(path.join(postDir, `${post.slug}.html`), html);
}

console.log(`✅ Generated ${filtered.length} post's social statuses`);

const about_section = filtered_about[0];

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${about_section.title}</title>
  <meta property="og:title" content="${about_section.title}" />
  <meta property="og:description" content="${about_section.excerpt}" />
  <meta property="og:image" content="https://appuhafeez.github.io/og-default.png" />
  <meta property="og:url" content="https://appuhafeez.github.io/#/${about_section.slug}" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
  <script>
    // Redirect normal users to SPA route
    window.location.replace("/#/posts/${about_section.slug}");
  </script>
</head>
<body>
  <noscript>
    <a href="/#/posts/${about_section.slug}">View post</a>
  </noscript>
</body>
</html>`;

// write into public/about.html
fs.writeFileSync(path.join(publicDir,`#/about.html`), html);


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
