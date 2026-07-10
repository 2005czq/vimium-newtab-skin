export const styles = String.raw`
:root {
  color-scheme: dark;
  --znt-rosewater: 245 224 220;
  --znt-mauve: 203 166 247;
  --znt-blue: 137 180 250;
  --znt-lavender: 180 190 254;
  --znt-text: 205 214 244;
  --znt-subtext-1: 186 194 222;
  --znt-subtext-0: 166 173 200;
  --znt-surface-2: 88 91 112;
  --znt-surface-1: 69 71 90;
  --znt-surface-0: 49 50 68;
  --znt-base: 30 30 46;
  --znt-mantle: 24 24 37;
  --znt-crust: 17 17 27;
  --znt-shadow: 17 17 27;
  --znt-on-accent: 17 17 27;
  --znt-ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --znt-ease-soft: cubic-bezier(0.22, 1, 0.36, 1);
}

@media (prefers-color-scheme: light) {
  :root {
    color-scheme: light;
    --znt-rosewater: 220 138 120;
    --znt-mauve: 136 57 239;
    --znt-blue: 30 102 245;
    --znt-lavender: 114 135 253;
    --znt-text: 76 79 105;
    --znt-subtext-1: 92 95 119;
    --znt-subtext-0: 108 111 133;
    --znt-surface-2: 172 176 190;
    --znt-surface-1: 188 192 204;
    --znt-surface-0: 204 208 218;
    --znt-base: 239 241 245;
    --znt-mantle: 230 233 239;
    --znt-crust: 220 224 232;
    --znt-shadow: 76 79 105;
    --znt-on-accent: 239 241 245;
  }
}

html,
body {
  width: 100% !important;
  height: 100% !important;
  min-height: 100% !important;
  margin: 0 !important;
  overflow: hidden !important;
  background: rgb(var(--znt-base)) !important;
}

body > img {
  display: none !important;
}

#znt-root,
#znt-root * {
  box-sizing: border-box;
}

#znt-root {
  position: fixed;
  inset: 0;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
  color: rgb(var(--znt-text));
  font-family:
    "JetBrains Mono", "Cascadia Code", "SFMono-Regular", Consolas, "Liberation Mono",
    monospace;
  background: rgb(var(--znt-base));
}

.znt-page {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: rgb(var(--znt-base));
  transition: background-color 240ms var(--znt-ease-soft);
}

.znt-page.is-vomnibar-open {
  background: rgb(var(--znt-mantle));
}

.znt-centerpiece {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.znt-time-stack {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(14px, 1.8vw, 22px);
  opacity: 0;
  transform: translateY(8px) scale(0.992);
  transition:
    opacity 600ms var(--znt-ease-out),
    transform 700ms var(--znt-ease-out);
}

.znt-time-stack.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.znt-page.is-vomnibar-open .znt-time-stack {
  opacity: 0.58;
  transform: scale(0.992);
}

.znt-clock {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.018em;
  color: rgb(var(--znt-text));
  font-size: clamp(68px, 11.2vw, 156px);
  font-weight: 250;
  line-height: 1;
  letter-spacing: 0;
  font-feature-settings: "tnum" 1, "zero" 1;
  font-variant-numeric: tabular-nums;
}

.znt-clock-part {
  min-width: 1.06em;
  line-height: 1;
  text-align: center;
}

.znt-clock-colon {
  width: 0.28em;
  height: 1em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-inline: -0.035em;
  color: rgb(var(--znt-mauve));
  font-weight: 250;
  line-height: 1;
  transform: translateY(-0.025em);
  animation: znt-colon-breathe 1000ms cubic-bezier(0.45, 0, 0.2, 1) infinite;
}

@keyframes znt-colon-breathe {
  0%,
  100% {
    opacity: 0.28;
  }

  50% {
    opacity: 1;
  }
}

.znt-date {
  color: rgb(var(--znt-subtext-0));
  font-size: clamp(14px, 1.7vw, 22px);
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0;
  font-variant-numeric: tabular-nums;
}

.znt-greeting {
  position: absolute;
  left: 50%;
  top: 14px;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: min(320px, calc(100vw - 48px));
  max-width: calc(100vw - 48px);
  min-height: 42px;
  padding: 10px 24px 11px;
  border: 1px solid rgb(var(--znt-mauve) / 0.58);
  border-radius: 14px;
  background: rgb(var(--znt-surface-0));
  color: rgb(var(--znt-text));
  box-shadow: 0 10px 30px rgb(var(--znt-shadow) / 0.16);
  font-size: 15px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0;
  text-align: center;
  opacity: 1;
  transform: translate3d(-50%, 0, 0) scale(1);
}

.znt-quote {
  position: absolute;
  left: 50%;
  bottom: max(32px, env(safe-area-inset-bottom));
  z-index: 4;
  width: auto;
  max-width: min(760px, calc(100vw - 48px));
  padding: 10px 16px;
  border: 0;
  border-radius: 12px;
  background: rgb(var(--znt-mauve));
  color: rgb(var(--znt-on-accent));
  font-size: clamp(11px, 1.05vw, 14px);
  font-weight: 400;
  line-height: 1.35;
  letter-spacing: 0;
  overflow: hidden;
  text-align: center;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  opacity: 0;
  transform: translate3d(-50%, 8px, 0) scale(0.992);
  transition:
    opacity 600ms var(--znt-ease-out),
    transform 700ms var(--znt-ease-out);
}

.znt-quote.is-visible {
  opacity: 1;
  transform: translate3d(-50%, 0, 0) scale(1);
}

.znt-page.is-vomnibar-open .znt-quote {
  opacity: 0.46;
}

@media (max-width: 760px) {
  .znt-clock {
    font-size: clamp(50px, 15.5vw, 96px);
  }

  .znt-date {
    font-size: 14px;
  }

  .znt-greeting {
    top: 15px;
    min-height: 40px;
    padding: 9px 20px 10px;
    font-size: 14px;
  }

  .znt-quote {
    bottom: max(22px, env(safe-area-inset-bottom));
    max-width: calc(100vw - 32px);
    font-size: 11px;
    -webkit-line-clamp: 2;
  }
}

@media (prefers-reduced-motion: reduce) {
  .znt-page,
  .znt-time-stack,
  .znt-quote {
    transition: none;
  }

  .znt-clock-colon {
    animation: none;
    opacity: 1;
  }
}

`;
