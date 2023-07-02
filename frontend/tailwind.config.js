/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#0c0116",
      },
      keyframes: {
        span1: {
          "0%": {
            top: -"48%",
            left: "8%",
          },
          "25%": {
            top: -"48%",
            left: "58%",
          },
          "50%": {
            top: "100%",
            left: -"8%",
          },
          "75%": {
            top: "100%",
            left: -"58%",
          },
        },
        span2: {
          "0%": {
            top: -"48%",
            right: "8%",
          },
          "25%": {
            top: -"48%",
            right: "58%",
          },
          "50%": {
            top: "100%",
            right: -"8%",
          },
          "75%": {
            top: "100%",
            right: -"58%",
          },
        },
      },
      animation: {
        "span-hand": "3s span1 infinite linear",
        "span2-hand": "3s span2 infinite linear",
      },
    },
  },
  plugins: [],
};
