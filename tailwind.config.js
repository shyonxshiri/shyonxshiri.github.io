/** @type {import('tailwindcss').Config} */
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"KiwiSoda"', "system-ui", "sans-serif"],
      },
      scale: {
        '5': '0.05',
        '15': '0.15',
        '20': '0.20',
        '25': '0.25',
        '30': '0.30',
        '45': '0.45',
        '77': '0.77',
        '90': '0.90',
        '92': '0.92',
      }
    },
  },
  plugins: [],
};


