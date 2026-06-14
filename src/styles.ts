export const styles = String.raw`
:root {
  color-scheme: dark;
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
  background: #000 !important;
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
  color: rgba(255, 255, 255, 0.96);
  font-family:
    "SF Pro Display", "SF Pro Text", "Segoe UI Variable Display", "Segoe UI",
    Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  background: #000;
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
    radial-gradient(circle at 50% 45%, rgba(255, 255, 255, 0.07), transparent 38%),
    #000;
}

.znt-video {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  opacity: 0;
  transform: scale(1.012);
  filter: brightness(0.78) contrast(1.02) saturate(1.03);
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
  filter: blur(7px) brightness(0.58) contrast(1.01) saturate(1.02);
}

.znt-soft-shade {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 50% 32%, rgba(255, 255, 255, 0.09), transparent 26%),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.48));
  opacity: 0.72;
  transition: opacity 1000ms var(--znt-ease-soft);
}

.znt-frost {
  position: absolute;
  inset: 0;
  opacity: 0;
  background: rgba(255, 255, 255, 0.035);
  backdrop-filter: blur(0px) saturate(1.04);
  -webkit-backdrop-filter: blur(0px) saturate(1.04);
  transition:
    opacity 1000ms var(--znt-ease-soft),
    backdrop-filter 1000ms var(--znt-ease-soft),
    -webkit-backdrop-filter 1000ms var(--znt-ease-soft);
  will-change: opacity, backdrop-filter;
}

.znt-page.is-vomnibar-open .znt-soft-shade {
  opacity: 0.86;
}

.znt-page.is-vomnibar-open .znt-frost {
  opacity: 1;
  backdrop-filter: blur(12px) saturate(1.12);
  -webkit-backdrop-filter: blur(12px) saturate(1.12);
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
  filter: brightness(0.94);
}

.znt-clock {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.018em;
  color: rgba(255, 255, 255, 0.96);
  font-size: clamp(68px, 11.2vw, 156px);
  font-weight: 200;
  line-height: 1;
  letter-spacing: 0;
  font-variant-numeric: tabular-nums;
  text-shadow:
    0 1px 1px rgba(255, 255, 255, 0.16),
    0 18px 72px rgba(0, 0, 0, 0.82);
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
  color: rgba(255, 255, 255, 0.94);
  font-weight: 180;
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
  color: rgba(255, 255, 255, 0.72);
  font-size: clamp(14px, 1.7vw, 22px);
  font-weight: 300;
  line-height: 1;
  letter-spacing: 0;
  font-variant-numeric: tabular-nums;
  text-shadow: 0 10px 36px rgba(0, 0, 0, 0.82);
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
  border: 1px solid rgba(255, 255, 255, 0.42);
  border-radius: 999px;
  background: rgba(248, 248, 248, 0.9);
  color: rgba(0, 0, 0, 0.82);
  box-shadow:
    0 24px 70px rgba(0, 0, 0, 0.42),
    inset 0 1px 0 rgba(255, 255, 255, 0.68);
  backdrop-filter: blur(26px) saturate(1.35);
  -webkit-backdrop-filter: blur(26px) saturate(1.35);
  font-size: 15px;
  font-weight: 400;
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
  color: rgba(255, 255, 255, 0.72);
  font-size: clamp(11px, 1.05vw, 14px);
  font-weight: 300;
  line-height: 1.35;
  letter-spacing: 0;
  overflow: hidden;
  text-align: center;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  text-shadow: 0 10px 36px rgba(0, 0, 0, 0.82);
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
  filter: brightness(0.92);
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
