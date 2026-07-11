<script lang="ts">
  import latteAvatar from "../assets/catppuccin-latte-square.png";
  import macchiatoAvatar from "../assets/catppuccin-macchiato-square.png";
</script>

<a
  class="znt-avatar"
  href="https://catppuccin.com/"
  target="_blank"
  rel="noreferrer"
  aria-label="Catppuccin homepage"
>
  <picture aria-hidden="true">
    <source media="(prefers-color-scheme: light)" srcset={latteAvatar} />
    <img src={macchiatoAvatar} alt="" />
  </picture>
</a>
