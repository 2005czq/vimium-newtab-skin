declare module "*.svelte" {
  import type { Component } from "svelte";
  const component: Component<Record<string, unknown>>;
  export default component;
}

declare const GM_addStyle: (css: string) => HTMLStyleElement | void;

declare const __ZNT_VIDEO_URL__: string;
