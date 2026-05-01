import { browser } from "$app/environment";

const KEY = "phk_user_prefs";

const defaults = {
  productSortOrder: "default", // 'default' | 'price_asc' | 'price_desc' | 'newest'
  productViewMode: "grid", // 'grid' | 'list'
  notificationsAsked: false, // whether we've prompted for push permission
};

export function getPrefs() {
  if (!browser) return defaults;
  try {
    const stored = localStorage.getItem(KEY);
    return stored ? { ...defaults, ...JSON.parse(stored) } : defaults;
  } catch {
    return defaults;
  }
}

export function setPrefs(partial) {
  if (!browser) return;
  const current = getPrefs();
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...current, ...partial }));
  } catch {
    // storage unavailable
  }
}
