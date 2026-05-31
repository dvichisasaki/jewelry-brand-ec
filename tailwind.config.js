/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#171717",
        muted: "#707070",
        line: "#dedbd5",
        paper: "#f7f5f0",
        deep: "#2f3632",
      },
      fontFamily: {
        serif: ['Georgia', '"Times New Roman"', "serif"],
        sans: ['"Helvetica Neue"', "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
