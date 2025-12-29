/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#22c55e",   // green
        dark: "#0b1f14",
        dark2: "#0f2a1b",
        accent: "#16a34a",
      },
    },
  },
  plugins: [],
}
