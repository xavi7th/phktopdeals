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
          50: '#fefae8',
          100: '#fef2c3',
          200: '#fee78a',
          300: '#fdd847',
          DEFAULT: '#facc15',
          400: '#eabd08',
          500: '#caa204',
          600: '#a18207',
          700: '#856d0e',
          800: '#715e12',
          900: '#423606',
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
