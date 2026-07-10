import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
import monkey from "vite-plugin-monkey";

export default defineConfig({
  plugins: [
    svelte(),
    monkey({
      entry: "src/main.ts",
      userscript: {
        name: "Vimium New Tab Skin",
        namespace: "local.zihim.vimium-newtab-skin",
        version: "0.1.0",
        description:
          "Adaptive Catppuccin clock, greeting, and quote overlay for Vimium's new tab page.",
        match: ["https://vimium.github.io/new-tab/*"],
        "run-at": "document-idle",
        noframes: true,
        grant: ["GM_addStyle"],
      },
    }),
  ],
  build: {
    minify: false,
    sourcemap: false,
  },
});
