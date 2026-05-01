import { browser } from "$app/environment";

export async function registerServiceWorker() {
  if (!browser || !("serviceWorker" in navigator)) return null;
  try {
    const reg = await navigator.serviceWorker.register("/service-worker.js", {
      scope: "/",
      updateViaCache: "imports",
    });
    // Check for SW updates whenever the tab regains focus (not on every navigation)
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") reg.update();
    });
    return reg;
  } catch (err) {
    console.warn("Service worker registration failed:", err);
    return null;
  }
}
