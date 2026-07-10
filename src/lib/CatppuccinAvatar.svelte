<script lang="ts">
  import latteAvatar from "../assets/catppuccin-latte-square.png";
  import macchiatoAvatar from "../assets/catppuccin-macchiato-square.png";
</script>

<picture class="znt-avatar" aria-hidden="true">
  <source media="(prefers-color-scheme: light)" srcset={latteAvatar} />
  <img src={macchiatoAvatar} alt="" />
</picture>
