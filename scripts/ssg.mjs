import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const POSTS_DIR = path.join(DIST, 'posts');

function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); }

function loadPosts() {
  const gen = fs.readFileSync(path.join(ROOT, 'src', 'generated', 'content.ts'), 'utf8');
  // Very small parser: content.ts exports a const posts = [...]
  const match = gen.match(/export const posts = (\[.*\]) as const;/s);
  if (!match) return [];
  return JSON.parse(match[1]);
}

function htmlTemplate({ title, description, url, image }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${image}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
  </head>
  <body>
    <div id="root"></div>
    <script>(function(){location.replace('${url}');})();</script>
  </body>
</html>`;
}

function main() {
  const base = process.env.GHP_BASE || '/'; // e.g., '/my-blog/'
  const canonicalBase = base === '/' ? '' : base; // for URL composition
  const posts = loadPosts();
  ensureDir(POSTS_DIR);
  for (const p of posts) {
    const url = `${canonicalBase}/posts/${p.slug}`.replace(/\\/g, '/');
    const outDir = path.join(POSTS_DIR, p.slug);
    ensureDir(outDir);
    const html = htmlTemplate({
      title: p.title,
      description: (p.excerpt || '').replace(/"/g, '&quot;'),
      url,
      image: `${canonicalBase}/share-default.png`,
    });
    fs.writeFileSync(path.join(outDir, 'index.html'), html);
  }
  console.log(`SSG wrote ${posts.length} post HTML files for social shares.`);
}

main();