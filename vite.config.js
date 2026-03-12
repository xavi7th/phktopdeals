import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { enhancedImages } from "@sveltejs/enhanced-img";

export default defineConfig( {
  plugins: [enhancedImages(), sveltekit()],
  server: {
    port: 5131,
    strictPort: true // prevents fallback to another port if 5131 is taken. necessary because of sanctum
  },
  preview: {
    port: 4131,
    strictPort: true
  }
} );
