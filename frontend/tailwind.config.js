// tailwind.config.js

// eslint-disable-next-line no-undef
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        moveIn: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(100%)" },
        },
        hideMenu: {
          "100%": { transform: "translateY(-99%)" },
        },
      },
    },
    animation: {
      moveIn: "moveIn 0.5s ease-in-out",
      hideMenu: "hideMenu 0.5s ease-in-out",
    },
  },
  darkMode: "class",
  // eslint-disable-next-line no-undef
  plugins: [nextui(), require("tailwindcss-animated")],
};
