---
title: Vite Setup for React
tags: [react, vite, tooling]
category: tutorials
created: 2025-08-22
---

This file lives in a nested folder, and the generator picks it up automatically.

### Steps

1. Install dependencies
2. Run dev server
3. Enjoy hot reload
---

## Deployment notes

1. **Set base path** for GitHub Pages:
   - If deploying to `https://<user>.github.io/<repo>/`, set env before build: `GHP_BASE=/<repo>/`.
   - For user/organization page (`https://<user>.github.io/`), leave it blank.
2. **Build & deploy**:
```bash
npm i
GHP_BASE=/<repo>/ npm run build   # or just npm run build for user page
npm run deploy
```
   This publishes `dist/` to the `gh-pages` branch via the `gh-pages` package.
3. Or use **GitHub Actions** (add `.github/workflows/gh-pages.yml`):