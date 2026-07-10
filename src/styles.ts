export const styles = String.raw`
:root {
  color-scheme: dark;
  --znt-mocha-rosewater: 245 224 220;
  --znt-mocha-flamingo: 242 205 205;
  --znt-mocha-pink: 245 194 231;
  --znt-mocha-mauve: 203 166 247;
  --znt-mocha-red: 243 139 168;
  --znt-mocha-maroon: 235 160 172;
  --znt-mocha-peach: 250 179 135;
  --znt-mocha-yellow: 249 226 175;
  --znt-mocha-green: 166 227 161;
  --znt-mocha-teal: 148 226 213;
  --znt-mocha-sky: 137 220 235;
  --znt-mocha-sapphire: 116 199 236;
  --znt-mocha-blue: 137 180 250;
  --znt-mocha-lavender: 180 190 254;
  --znt-mocha-text: 205 214 244;
  --znt-mocha-subtext-1: 186 194 222;
  --znt-mocha-subtext-0: 166 173 200;
  --znt-mocha-overlay-2: 147 153 178;
  --znt-mocha-overlay-1: 127 132 156;
  --znt-mocha-overlay-0: 108 112 134;
  --znt-mocha-surface-2: 88 91 112;
  --znt-mocha-surface-1: 69 71 90;
  --znt-mocha-surface-0: 49 50 68;
  --znt-mocha-base: 30 30 46;
  --znt-mocha-mantle: 24 24 37;
  --znt-mocha-crust: 17 17 27;
  --znt-ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --znt-ease-soft: cubic-bezier(0.22, 1, 0.36, 1);
}

html,
body {
  width: 100% !important;
  height: 100% !important;
  min-height: 100% !important;
  margin: 0 !important;
  overflow: hidden !important;
  background: rgb(var(--znt-mocha-base)) !important;
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
  color: rgb(var(--znt-mocha-text));
  font-family:
    "JetBrains Mono", "Cascadia Code", "SFMono-Regular", Consolas, "Liberation Mono",
    monospace;
  background: rgb(var(--znt-mocha-base));
}

.znt-stage {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.znt-video-shell {
  position: absolute;
  inset: -4%;
  background:
    radial-gradient(circle at 50% 42%, rgb(var(--znt-mocha-lavender) / 0.16), transparent 38%),
    linear-gradient(
      to bottom,
      rgb(var(--znt-mocha-base) / 0.18),
      rgb(var(--znt-mocha-crust) / 0.72)
    ),
    rgb(var(--znt-mocha-base));
}

.znt-video {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  opacity: 0;
  transform: scale(1.012);
  filter: brightness(0.72) contrast(1.04) saturate(0.84);
  transition:
    opacity 1000ms var(--znt-ease-soft),
    transform 1000ms var(--znt-ease-soft),
    filter 1000ms var(--znt-ease-soft);
  will-change: opacity, transform, filter;
}

.znt-video.is-ready {
  opacity: 1;
}

.znt-page.is-vomnibar-open .znt-video {
  transform: scale(1.036);
  filter: blur(8px) brightness(0.5) contrast(1.03) saturate(0.72);
}

.znt-soft-shade {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 50% 30%, rgb(var(--znt-mocha-mauve) / 0.2), transparent 28%),
    radial-gradient(circle at 14% 82%, rgb(var(--znt-mocha-blue) / 0.12), transparent 32%),
    linear-gradient(
      to bottom,
      rgb(var(--znt-mocha-base) / 0.16),
      rgb(var(--znt-mocha-crust) / 0.62)
    );
  opacity: 0.78;
  transition: opacity 1000ms var(--znt-ease-soft);
}

.znt-frost {
  position: absolute;
  inset: 0;
  opacity: 0;
  background: rgb(var(--znt-mocha-base) / 0.34);
  backdrop-filter: blur(0) saturate(0.9);
  -webkit-backdrop-filter: blur(0) saturate(0.9);
  transition:
    opacity 1000ms var(--znt-ease-soft),
    backdrop-filter 1000ms var(--znt-ease-soft),
    -webkit-backdrop-filter 1000ms var(--znt-ease-soft);
  will-change: opacity, backdrop-filter;
}

.znt-page.is-vomnibar-open .znt-soft-shade {
  opacity: 0.94;
}

.znt-page.is-vomnibar-open .znt-frost {
  opacity: 1;
  backdrop-filter: blur(14px) saturate(0.82);
  -webkit-backdrop-filter: blur(14px) saturate(0.82);
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
    opacity 900ms var(--znt-ease-out),
    transform 1100ms var(--znt-ease-out),
    filter 1250ms var(--znt-ease-soft);
}

.znt-time-stack.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.znt-page.is-vomnibar-open .znt-time-stack {
  filter: brightness(0.9) saturate(0.86);
}

.znt-clock {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.018em;
  color: rgb(var(--znt-mocha-text));
  font-size: clamp(68px, 11.2vw, 156px);
  font-weight: 250;
  line-height: 1;
  letter-spacing: 0;
  font-feature-settings: "tnum" 1, "zero" 1;
  font-variant-numeric: tabular-nums;
  text-shadow:
    0 0 26px rgb(var(--znt-mocha-lavender) / 0.2),
    0 18px 72px rgb(var(--znt-mocha-crust) / 0.88);
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
  color: rgb(var(--znt-mocha-mauve));
  font-weight: 250;
  line-height: 1;
  transform: translateY(-0.025em);
  animation: znt-colon-breathe 1000ms cubic-bezier(0.45, 0, 0.2, 1) infinite;
  will-change: opacity;
}

@keyframes znt-colon-breathe {
  0%,
  100% {
    opacity: 0.2;
  }

  50% {
    opacity: 1;
  }
}

.znt-date {
  color: rgb(var(--znt-mocha-subtext-0));
  font-size: clamp(14px, 1.7vw, 22px);
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0;
  font-variant-numeric: tabular-nums;
  text-shadow: 0 10px 36px rgb(var(--znt-mocha-crust) / 0.86);
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
  border: 1px solid rgb(var(--znt-mocha-mauve) / 0.5);
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    rgb(var(--znt-mocha-surface-0) / 0.94),
    rgb(var(--znt-mocha-mantle) / 0.92)
  );
  color: rgb(var(--znt-mocha-text));
  box-shadow:
    0 20px 60px rgb(var(--znt-mocha-crust) / 0.58),
    0 0 30px rgb(var(--znt-mocha-mauve) / 0.12),
    inset 0 1px 0 rgb(var(--znt-mocha-lavender) / 0.16);
  backdrop-filter: blur(24px) saturate(0.9);
  -webkit-backdrop-filter: blur(24px) saturate(0.9);
  font-size: 15px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0;
  text-align: center;
  opacity: 1;
  transform: translate3d(-50%, 0, 0) scale(1);
  will-change: opacity, transform;
}

.znt-quote {
  position: absolute;
  left: 50%;
  bottom: max(32px, env(safe-area-inset-bottom));
  z-index: 4;
  width: auto;
  max-width: min(760px, calc(100vw - 48px));
  padding: 10px 16px;
  border: 1px solid rgb(var(--znt-mocha-surface-1) / 0.72);
  border-radius: 12px;
  background: rgb(var(--znt-mocha-base) / 0.58);
  color: rgb(var(--znt-mocha-subtext-1));
  box-shadow:
    0 12px 40px rgb(var(--znt-mocha-crust) / 0.46),
    inset 0 1px 0 rgb(var(--znt-mocha-lavender) / 0.08);
  backdrop-filter: blur(14px) saturate(0.86);
  -webkit-backdrop-filter: blur(14px) saturate(0.86);
  font-size: clamp(11px, 1.05vw, 14px);
  font-weight: 400;
  line-height: 1.35;
  letter-spacing: 0;
  overflow: hidden;
  text-align: center;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  text-shadow: 0 8px 28px rgb(var(--znt-mocha-crust) / 0.82);
  opacity: 0;
  transform: translate3d(-50%, 8px, 0) scale(0.992);
  transition:
    opacity 900ms var(--znt-ease-out),
    transform 1100ms var(--znt-ease-out),
    filter 1250ms var(--znt-ease-soft);
  will-change: opacity, transform;
}

.znt-quote.is-visible {
  opacity: 1;
  transform: translate3d(-50%, 0, 0) scale(1);
}

.znt-page.is-vomnibar-open .znt-quote {
  filter: brightness(0.86) saturate(0.82);
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

`;
