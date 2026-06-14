const hitokotoEndpoint = "https://v1.hitokoto.cn/";
const hitokotoTypes = ["d", "i", "k"] as const;
const minLength = 6;
const maxLength = 120;
const maxDisplayLength = 120;
const maxAttempts = 3;
const retryDelayMs = 650;
const requestTimeoutMs = 2800;

type HitokotoResponse = {
  hitokoto?: unknown;
  from?: unknown;
  from_who?: unknown;
};

export const hitokotoFallback = "为者常成，行者常至。——晏子春秋·内篇杂下";

function buildHitokotoUrl(): string {
  const url = new URL(hitokotoEndpoint);

  for (const type of hitokotoTypes) {
    url.searchParams.append("c", type);
  }

  url.searchParams.set("encode", "json");
  url.searchParams.set("charset", "utf-8");
  url.searchParams.set("min_length", String(minLength));
  url.searchParams.set("max_length", String(maxLength));

  return url.toString();
}

function normalizeSentence(sentence: string): string {
  return sentence.trim().replace(/\s+/g, " ").replace(/^[\s—-]+/u, "").replace(/[\s—-]+$/u, "");
}

function normalizeSource(source: unknown): string | undefined {
  if (typeof source !== "string") return undefined;

  const normalized = source.trim().replace(/\s+/g, " ");
  if (normalized === "null" || normalized === "undefined") return undefined;

  return normalized || undefined;
}

function formatQuote(sentence: string, source?: string): string {
  return source ? `${sentence}——${source}` : sentence;
}

function parseHitokoto(data: HitokotoResponse): string | undefined {
  if (typeof data.hitokoto !== "string") return undefined;

  const sentence = normalizeSentence(data.hitokoto);
  if (!sentence) return undefined;

  const source = normalizeSource(data.from_who) ?? normalizeSource(data.from);
  return formatQuote(sentence, source);
}

function wait(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason);
      return;
    }

    const timer = window.setTimeout(resolve, ms);

    signal?.addEventListener(
      "abort",
      () => {
        window.clearTimeout(timer);
        reject(signal.reason);
      },
      { once: true },
    );
  });
}

async function requestHitokotoQuote(signal?: AbortSignal): Promise<string | undefined> {
  const controller = new AbortController();
  const abort = () => controller.abort(signal?.reason);
  const timeout = window.setTimeout(() => controller.abort(), requestTimeoutMs);

  if (signal?.aborted) {
    abort();
  } else {
    signal?.addEventListener("abort", abort, { once: true });
  }

  try {
    const response = await fetch(buildHitokotoUrl(), {
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Hitokoto request failed with ${response.status}`);
    }

    return parseHitokoto((await response.json()) as HitokotoResponse);
  } finally {
    window.clearTimeout(timeout);
    signal?.removeEventListener("abort", abort);
  }
}

export async function fetchHitokotoQuote(signal?: AbortSignal): Promise<string> {
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const quote = await requestHitokotoQuote(signal);

    if (quote && quote.length <= maxDisplayLength) {
      return quote;
    }

    if (attempt < maxAttempts - 1) {
      await wait(retryDelayMs, signal);
    }
  }

  return hitokotoFallback;
}
