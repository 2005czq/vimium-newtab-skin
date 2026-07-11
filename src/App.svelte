<script lang="ts">
  import { onMount } from "svelte";
  import type { TransitionConfig } from "svelte/transition";
  import CatppuccinAvatar from "./lib/CatppuccinAvatar.svelte";
  import CatppuccinFooter from "./lib/CatppuccinFooter.svelte";
  import { fetchHitokotoQuote, hitokotoFallback } from "./lib/hitokoto";
  import { getClock, getGreeting, scheduleOnSecond, type Clock } from "./lib/time";
  import { watchVomnibar } from "./lib/vomnibar";

  const displayName = "Zihim";
  const greetingVisibleMs = 3000;

  let clock: Clock = getClock();
  const greeting = getGreeting(displayName);
  let quote = hitokotoFallback;
  let greetingVisible = false;
  let quoteVisible = false;
  let timeVisible = false;
  let vomnibarOpen = false;
  let quoteController: AbortController | undefined;

  const greetingEnterMs = 1000;
  const greetingExitMs = 900;
  function clamp(value: number, min = 0, max = 1) {
    return Math.min(max, Math.max(min, value));
  }

  function easeOutBack(t: number) {
    const c1 = 1.35;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  }

  function easeInBack(t: number) {
    const c1 = 1.18;
    const c3 = c1 + 1;
    return c3 * t * t * t - c1 * t * t;
  }

  function greetingIntro(_node: Element): TransitionConfig {
    return {
      duration: greetingEnterMs,
      css: (t) => {
        const p = easeOutBack(t);
        const y = -(1 - p) * 112;
        const scale = 0.965 + clamp(p) * 0.035;
        return `opacity: ${clamp(t * 1.9)}; transform: translate3d(-50%, ${y}px, 0) scale(${scale});`;
      },
    };
  }

  function greetingOutro(_node: Element): TransitionConfig {
    return {
      duration: greetingExitMs,
      css: (t, u) => {
        const p = easeInBack(u);
        const y = -p * 112;
        const scale = 1 - clamp(u) * 0.018;
        const opacity = clamp(t * 1.25);
        return `opacity: ${opacity}; transform: translate3d(-50%, ${y}px, 0) scale(${scale});`;
      },
    };
  }

  async function loadQuote() {
    quoteController?.abort();
    const controller = new AbortController();
    quoteController = controller;

    try {
      const nextQuote = await fetchHitokotoQuote(controller.signal);
      if (quoteController !== controller) return;
      quote = nextQuote;
    } catch (error) {
      if (controller.signal.aborted || quoteController !== controller) return;
      console.error("[Vimium New Tab Skin] Failed to load hitokoto", error);
      if (!quoteVisible) quote = hitokotoFallback;
    } finally {
      if (quoteController === controller) quoteController = undefined;
    }

    if (!controller.signal.aborted) quoteVisible = true;
  }

  onMount(() => {
    let timeVisibleFrame = window.requestAnimationFrame(() => {
      timeVisibleFrame = window.requestAnimationFrame(() => {
        timeVisible = true;
      });
    });

    const stopClock = scheduleOnSecond(() => {
      clock = getClock();
    });

    const stopVomnibarWatch = watchVomnibar((open) => {
      vomnibarOpen = open;
    });

    const greetingShowTimer = window.setTimeout(() => {
      greetingVisible = true;
    }, 120);
    const greetingHideTimer = window.setTimeout(() => {
      greetingVisible = false;
    }, 120 + greetingEnterMs + greetingVisibleMs);

    void loadQuote();

    return () => {
      quoteController?.abort();
      stopClock();
      stopVomnibarWatch();
      window.cancelAnimationFrame(timeVisibleFrame);
      window.clearTimeout(greetingShowTimer);
      window.clearTimeout(greetingHideTimer);
    };
  });
</script>

<div class:is-vomnibar-open={vomnibarOpen} class="znt-page">
  <div class="znt-centerpiece">
    <div
      class:is-visible={timeVisible}
      class="znt-time-stack"
      aria-label={`${clock.hours}:${clock.minutes}:${clock.seconds}, ${clock.dateLabel}`}
    >
      <div class="znt-clock">
        <span class="znt-clock-part">{clock.hours}</span>
        <span class="znt-clock-colon" aria-hidden="true">:</span>
        <span class="znt-clock-part">{clock.minutes}</span>
        <span class="znt-clock-colon" aria-hidden="true">:</span>
        <span class="znt-clock-part">{clock.seconds}</span>
      </div>
      <div class="znt-date">{clock.dateLabel}</div>
    </div>
  </div>

  {#if greetingVisible}
    <div class="znt-greeting" in:greetingIntro out:greetingOutro>{greeting}</div>
  {/if}

  <div class="znt-footer">
    <CatppuccinFooter />
    <button
      class:is-visible={timeVisible && quoteVisible}
      class="znt-quote"
      type="button"
      title="点击刷新一言"
      onclick={() => void loadQuote()}
    >
      {quote}
    </button>
  </div>

  <CatppuccinAvatar />
</div>
