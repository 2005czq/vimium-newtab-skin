import App from "./App.svelte";
import { styles } from "./styles";
import { mount as mountSvelte } from "svelte";

GM_addStyle(styles);

function mount() {
  if (!document.body || document.getElementById("znt-root")) return;

  const root = document.createElement("div");
  root.id = "znt-root";
  document.body.appendChild(root);

  mountSvelte(App, { target: root });
}

if (document.body) {
  mount();
} else {
  document.addEventListener("DOMContentLoaded", mount, { once: true });
}
