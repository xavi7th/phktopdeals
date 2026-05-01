import { browser } from "$app/environment";

const KEY = "phk_recently_viewed";
const MAX = 10;
const TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * @typedef {{ productId: string, title: string, imageUrl: string, price: number, viewedAt: number }} ViewedProduct
 */

export function getRecentlyViewed() {
  if (!browser) return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const items = /** @type {ViewedProduct[]} */ (JSON.parse(raw));
    const now = Date.now();
    return items.filter((i) => now - i.viewedAt < TTL_MS);
  } catch {
    return [];
  }
}

export function recordView(product) {
  if (!browser) return;
  try {
    const existing = getRecentlyViewed().filter((i) => i.productId !== product.productId);
    const updated = [{ ...product, viewedAt: Date.now() }, ...existing].slice(0, MAX);
    localStorage.setItem(KEY, JSON.stringify(updated));
  } catch {
    // storage full
  }
}

export function clearRecentlyViewed() {
  if (!browser) return;
  localStorage.removeItem(KEY);
}
