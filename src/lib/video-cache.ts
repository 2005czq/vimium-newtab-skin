const dbName = "zihim-vimium-newtab-assets";
const dbVersion = 1;
const storeName = "assets";

type CachedVideo = {
  blob: Blob;
  sourceUrl: string;
  cachedAt: number;
};

function normalizeVideoBlob(blob: Blob): Blob {
  if (blob.type === "video/mp4") return blob;
  return new Blob([blob], { type: "video/mp4" });
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(storeName)) db.createObjectStore(storeName);
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("Failed to open IndexedDB"));
  });
}

function getCachedVideo(key: string): Promise<CachedVideo | null> {
  return openDb().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, "readonly");
        const request = tx.objectStore(storeName).get(key);

        request.onsuccess = () => resolve((request.result as CachedVideo | undefined) ?? null);
        request.onerror = () => reject(request.error ?? new Error("Failed to read video cache"));
        tx.oncomplete = () => db.close();
        tx.onerror = () => {
          db.close();
          reject(tx.error ?? new Error("Failed to read video cache"));
        };
      }),
  );
}

function setCachedVideo(key: string, value: CachedVideo): Promise<void> {
  return openDb().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, "readwrite");
        tx.objectStore(storeName).put(value, key);

        tx.oncomplete = () => {
          db.close();
          resolve();
        };
        tx.onerror = () => {
          db.close();
          reject(tx.error ?? new Error("Failed to write video cache"));
        };
      }),
  );
}

export async function getVideoBlob(key: string, sourceUrl: string): Promise<Blob> {
  const cached = await getCachedVideo(key);
  if (cached?.blob instanceof Blob) return cached.blob;

  const response = await fetch(sourceUrl, { mode: "cors", cache: "force-cache" });
  if (!response.ok) throw new Error(`Video request failed with HTTP ${response.status}`);

  const blob = normalizeVideoBlob(await response.blob());
  await setCachedVideo(key, { blob, sourceUrl, cachedAt: Date.now() });
  return blob;
}
