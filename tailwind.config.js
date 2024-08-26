/** @type {import('tailwindcss').Config} */
export default {
	content: [
    './node_modules/preline/preline.js',
    './src/**/*.{html,js,svelte,ts}',
  ],

  theme: {
    // => @media (min-width: Xpx) { ... }
    screens: {
      'xs': '480px',
      'sm': '768px',
      'md': '1024px',
      'lg': '1280px',
      'xl': '1536px',
    },
    extend: {}
  },

	plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('preline/plugin'),
  ]
};
