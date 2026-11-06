import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import fs from "fs";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Project site: https://thetinywisdom.github.io/thumbnail-editor/
const pagesBase = "/thumbnail-editor/";

/** GitHub Pages has no SPA rewrite. Unknown paths serve 404.html with the original URL kept. */
function githubPagesSpaFallback(): Plugin {
  let outDir = "";
  return {
    name: "github-pages-spa-fallback",
    apply: "build",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const indexPath = path.join(outDir, "index.html");
      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, path.join(outDir, "404.html"));
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Dev and `build:dev` stay at `/`. The production build is what Pages publishes.
  base: mode === "production" ? pagesBase : "/",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" && githubPagesSpaFallback(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
