type Listener = (open: boolean) => void;

function frameIsVisible(frame: HTMLIFrameElement | null): boolean {
  if (!frame) return false;
  if (frame.classList.contains("vimium-ui-component-visible")) return true;
  if (frame.classList.contains("vimium-ui-component-hidden")) return false;

  const style = getComputedStyle(frame);
  return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity || 1) > 0.01;
}

function findFrame(): HTMLIFrameElement | null {
  const direct = document.querySelector<HTMLIFrameElement>("iframe.vomnibar-frame");
  if (direct) return direct;

  for (const element of document.querySelectorAll<HTMLElement>("*")) {
    const root = element.shadowRoot;
    if (!root) continue;

    const frame = root.querySelector<HTMLIFrameElement>("iframe.vomnibar-frame");
    if (frame) return frame;
  }

  return null;
}

function observeShadowRoots(
  scheduleSync: () => void,
  observedShadowRoots: WeakSet<ShadowRoot>,
  observers: Set<MutationObserver>,
): void {
  for (const element of document.querySelectorAll<HTMLElement>("*")) {
    const root = element.shadowRoot;
    if (!root || observedShadowRoots.has(root)) continue;
    observedShadowRoots.add(root);

    const observer = new MutationObserver(scheduleSync);
    observer.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "style"],
    });
    observers.add(observer);
  }
}

export function watchVomnibar(listener: Listener): () => void {
  let stopped = false;
  let syncFrame: number | undefined;
  let currentFrame: HTMLIFrameElement | null = null;
  let frameObserver: MutationObserver | undefined;
  let scanCount = 0;
  let scanTimer: number | undefined;
  const observedShadowRoots = new WeakSet<ShadowRoot>();
  const observers = new Set<MutationObserver>();

  const emitVisibility = (frame: HTMLIFrameElement | null) => {
    if (stopped) return;
    listener(frameIsVisible(frame));
  };

  const scheduleSync = () => {
    if (stopped || syncFrame !== undefined) return;

    syncFrame = window.requestAnimationFrame(() => {
      syncFrame = undefined;
      if (stopped) return;

      observeShadowRoots(scheduleSync, observedShadowRoots, observers);

      const frame = findFrame();
      if (frame !== currentFrame) {
        frameObserver?.disconnect();
        currentFrame = frame;
        frameObserver = undefined;

        if (frame) {
          frameObserver = new MutationObserver(() => emitVisibility(currentFrame));
          frameObserver.observe(frame, {
            attributes: true,
            attributeFilter: ["class", "style"],
          });
        }
      }

      emitVisibility(frame);
    });
  };

  const documentObserver = new MutationObserver(scheduleSync);
  documentObserver.observe(document.documentElement, { childList: true, subtree: true });
  observers.add(documentObserver);
  scheduleSync();

  scanTimer = window.setInterval(() => {
    scanCount += 1;
    scheduleSync();
    if (scanCount >= 120 || currentFrame) {
      window.clearInterval(scanTimer);
      scanTimer = undefined;
    }
  }, 250);

  return () => {
    stopped = true;
    if (syncFrame !== undefined) window.cancelAnimationFrame(syncFrame);
    if (scanTimer !== undefined) window.clearInterval(scanTimer);
    frameObserver?.disconnect();
    for (const observer of observers) observer.disconnect();
    observers.clear();
  };
}
