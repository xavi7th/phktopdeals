import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { enhancedImages } from "@sveltejs/enhanced-img";

export default defineConfig({
  plugins: [enhancedImages(), sveltekit()],
  ssr: {
    // pusher-js and laravel-echo are browser-only packages — bundle them into the SSR
    // output so Node.js doesn't try to resolve them as external runtime packages and fail.
    noExternal: ["pusher-js", "laravel-echo"],
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
