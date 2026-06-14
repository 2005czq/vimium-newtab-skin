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

function observeFrame(
  frame: HTMLIFrameElement,
  emitVisibility: (frame: HTMLIFrameElement) => void,
  observedFrames: WeakSet<HTMLIFrameElement>,
  observers: Set<MutationObserver>,
): void {
  if (observedFrames.has(frame)) return;
  observedFrames.add(frame);

  const observer = new MutationObserver(() => emitVisibility(frame));
  observer.observe(frame, {
    attributes: true,
    attributeFilter: ["class", "style"],
  });
  observers.add(observer);
}

export function watchVomnibar(listener: Listener): () => void {
  let stopped = false;
  let syncQueued = false;
  let syncFrame: number | undefined;
  let currentFrame: HTMLIFrameElement | null = null;
  let scanCount = 0;
  let scanTimer: number | undefined;
  const observedFrames = new WeakSet<HTMLIFrameElement>();
  const observedShadowRoots = new WeakSet<ShadowRoot>();
  const observers = new Set<MutationObserver>();

  const emitVisibility = (frame: HTMLIFrameElement | null) => {
    if (stopped) return;
    listener(frameIsVisible(frame));
  };

  const scheduleSync = () => {
    if (stopped || syncQueued) return;
    syncQueued = true;

    syncFrame = window.requestAnimationFrame(() => {
      syncQueued = false;
      syncFrame = undefined;
      if (stopped) return;

      observeShadowRoots(scheduleSync, observedShadowRoots, observers);

      const frame = findFrame();
      currentFrame = frame;
      if (frame) {
        observeFrame(frame, emitVisibility, observedFrames, observers);
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
    if (scanCount > 120 || currentFrame) {
      if (scanTimer !== undefined) window.clearInterval(scanTimer);
      scanTimer = undefined;
    }
  }, 250);

  return () => {
    stopped = true;
    if (syncFrame !== undefined) window.cancelAnimationFrame(syncFrame);
    if (scanTimer !== undefined) window.clearInterval(scanTimer);
    for (const observer of observers) observer.disconnect();
    observers.clear();
  };
}
