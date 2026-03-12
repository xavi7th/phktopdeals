import { defineConfig } from "vitest/config";
import { sveltekit } from "@sveltejs/kit/vite";

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    dom: {
      beforeInit: () => {
        // Mock ResizeObserver for components that use it
        global.ResizeObserver = class ResizeObserver {
          observe() {}
          unobserve() {}
          disconnect() {}
        };
      },
    },
    alias: {
      $lib: "/src/lib",
    },
  },
  resolve: {
    alias: {
      $lib: "/src/lib",
    },
  },
});
