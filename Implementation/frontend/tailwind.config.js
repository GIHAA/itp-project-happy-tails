/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF9F00",
        secondary: "#2E4960",
        text: "#6788A4",
        bg: "#E8EBF2",
        tbg: "#A6BBCC",
        bgsec: "#FFF7DC",
      },
    },
  },
  plugins: [],
};
