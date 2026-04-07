import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { enhancedImages } from "@sveltejs/enhanced-img";

export default defineConfig({
  plugins: [enhancedImages(), sveltekit()],
  ssr: {
    // The production server's Node.js cannot resolve modern ESM conditional exports at runtime.
    // Bundle these browser-only / ESM-only packages inline into the SSR output.
    // NOTE: do NOT add sveltekit-superforms here — bundling it inline breaks Rollup's
    // re-export resolution and causes "superValidate is not defined" at runtime.
    noExternal: ["pusher-js", "laravel-echo", "valibot"],
  },
  server: {
    port: 5131,
    strictPort: true, // prevents fallback to another port if 5131 is taken. necessary because of sanctum
  },
  preview: {
    port: 4131,
    strictPort: true,
  },
});
