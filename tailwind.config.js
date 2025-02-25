/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./src/**/*.{html,js,svelte,ts}", "./node_modules/preline/preline.js"],

  theme: {
    // => @media (min-width: Xpx) { ... }
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1024px",
      lg: "1280px",
      xl: "1536px",
    },
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      transitionProperty: {
        size: "height, width, margin, padding, border-width",
        spacing: "margin, padding, gap",
      },
      colors: {
        brand: {
          50: "#fefae8",
          100: "#fef2c3",
          200: "#fee78a",
          300: "#fdd847",
          DEFAULT: "#facc15",
          400: "#eabd08",
          500: "#caa204",
          600: "#a18207",
          700: "#856d0e",
          800: "#715e12",
          900: "#423606",
          950: "#2f2604",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms"), require("preline/plugin")],
};
