import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";


// Set base to "/<REPO_NAME>/" for GitHub Pages (user/organization pages can use "/")
const repoName = process.env.GHP_BASE || 'appuhafeez.github.io';


export default defineConfig({
  plugins: [react()],
  base: repoName, // e.g., "/my-blog/"; set via env: GHP_BASE=/my-blog/
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // ✅ maps @ → src
    },
  },
});