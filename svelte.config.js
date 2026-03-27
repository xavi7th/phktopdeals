import adapter from "@sveltejs/adapter-node";
// import adapter from '@sveltejs/adapter-auto';
import { sveltePreprocess } from "svelte-preprocess";
// import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { importAssets } from "svelte-preprocess-import-assets";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // /** @type {import('@sveltejs/vite-plugin-svelte').SvelteConfig['onwarn']} */
  onwarn: (warning, handler) => {
    const { code, frame } = warning;

    if (
      code == "anchor_is_valid" ||
      code == "a11y_invalid_attribute" ||
      code == "a11y_media_has_caption" ||
      code == "a11y_no_static_element_interactions" ||
      code == "a11y_missing_attribute" ||
      code == "css_unused_selector" ||
      code == "a11y_missing_content" ||
      code == "a11y_label_has_associated_control" ||
      // code.startsWith('a11y_') ||
      (code == "missing_declaration" && frame.includes("route"))
    ) {
      return;
    }

    console.log("\x1b[41m%s\x1b[0m", code);

    handler(warning);
  },
  preprocess: [
    // Consult https://kit.svelte.dev/docs/integrations#preprocessors for more information about preprocessors
    importAssets({
      // Include URLs with specific extensions only
      urlFilter: (url) => /(src\/lib\/)/.test(url),
      // urlFilter: (url) => /\.(png|jpg|gif|webp)$/.test(url),
    }),

    /** @see https://kit.svelte.dev/docs/integrations. This is faster but has no support for :global{ //selectors }. This also has no need for npm install -D sass */
    // vitePreprocess(),

    sveltePreprocess({
      sass: {
        quietDeps: true,
        silenceDeprecations: ["import", "legacy-js-api"],
      },
      scss: {
        quietDeps: true,
        silenceDeprecations: ["import", "legacy-js-api"],
        prependData: `@import './src/lib/css/variables';`,
      },
    }),
  ],
  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter(),
    alias: {
      $partials: "./src/partials",
      $stores: "./src/stores",
    },
    experimental: {
      remoteFunctions: true,
    },
  },
  compilerOptions: {
    experimental: {
      async: true,
    },
  },
};

export default config;
