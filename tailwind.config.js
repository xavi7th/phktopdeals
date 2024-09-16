/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
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
    container: {
      center: true,
    },
    extend: {
      colors: {
        'brand': {
          50: '#bdbeda',
          100: '#5f61b0',
          200: '#3538b0',
          300: '#202391',
          DEFAULT: '#2225a1',
          400: '#2a2d95',
          500: '#232450',
          600: '#232450',
          700: '#101175',
          800: '#1a1b82',
          900: '#101151',
        },
      }
    }
  },

  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('preline/plugin'),
  ]
};