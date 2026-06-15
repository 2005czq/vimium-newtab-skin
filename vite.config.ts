import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
import monkey from "vite-plugin-monkey";

const browserVideoUrl =
  "https://raw.githubusercontent.com/2005czq/vimium-newtab-skin/main/public/browser.mp4";

export default defineConfig({
  plugins: [
    svelte(),
    monkey({
      entry: "src/main.ts",
      userscript: {
        name: "Vimium New Tab Skin",
        namespace: "local.zihim.vimium-newtab-skin",
        version: "0.1.0",
        description: "Apple-style video background, clock, and greeting overlay for Vimium's new tab page.",
        match: ["https://vimium.github.io/new-tab/*"],
        "run-at": "document-start",
        noframes: true,
        grant: ["GM_addStyle"],
      },
    }),
  ],
  define: {
    __ZNT_VIDEO_URL__: JSON.stringify(browserVideoUrl),
  },
  build: {
    minify: false,
    sourcemap: false,
  },
});
