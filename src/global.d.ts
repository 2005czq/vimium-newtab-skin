declare module "*.svelte" {
  import type { Component } from "svelte";
  const component: Component<Record<string, unknown>>;
  export default component;
}

declare module "*.png" {
  const source: string;
  export default source;
}

declare const GM_addStyle: (css: string) => HTMLStyleElement | void;
