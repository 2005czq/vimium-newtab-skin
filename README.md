# Vimium New Tab Skin

A lightweight Catppuccin skin for `https://vimium.github.io/new-tab/` with a solid
background, glowing clock, greeting, and daily quote. It follows the system color scheme,
using Latte in light mode and Mocha in dark mode.

## Setup

```sh
fnm use
pnpm install
pnpm build
```

## Output

Tampermonkey script:

```text
dist/vimium-newtab-skin.user.js
```

Open or import that file in Tampermonkey.

## Vimium Custom CSS

- `style.css` is the readable Catppuccin Mocha source.
- `style.min.css` is the compressed version to paste into Vimium's **CSS for Vimium UI** field.

Regenerate the compressed file after editing the source:

```sh
pnpm css:minify
```

The minifier also accepts custom input and output paths:

```sh
pnpm css:minify -- input.css output.min.css
```

## Credit

Palette, footer artwork, and avatars: [Catppuccin](https://github.com/catppuccin/catppuccin)
(MIT License)

Vimium selector coverage references [Catppuccin for Vimium](https://github.com/catppuccin/vimium)
(MIT License).
