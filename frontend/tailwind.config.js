/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0c0116",
        primary100: "#19052c",
        purple: "#81007F",
        secondary: "#FF7426",
      },

      fontFamily: {
        sora: ["Sora", "sans-serif"],
      },
      keyframes: {
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: { opacity: 0, transform: "translate(100%, -50%)" },
          to: { opacity: 1, transform: "translate(0%, -50%)" },
        },
        animateTop: {
          "25%": {
            width: "100%",
            opacity: "1",
          },
          "30%, 100%": {
            opacity: "0",
          },
        },
        animateBottom: {
          "0%, 50%": {
            opacity: "0",
            width: "0",
          },
          "75%": {
            opacity: "1",
            width: "100%",
          },
          "76%, 100%": {
            opacity: "0",
          },
        },
        animateRight: {
          "0%, 25%": {
            opacity: "0",
            height: "0",
          },
          "50%": {
            opacity: "1",
            height: "100%",
          },
          "55%, 100%": {
            height: "100%",
            opacity: "0",
          },
        },
        animateLeft: {
          "0%, 75%": {
            opacity: "0",
            bottom: "0",
            height: "0",
          },
          "100%": {
            opacity: "1",
            height: "100%",
          },
        },
      },
      animation: {
        animateTop: "animateTop 3s ease-in-out infinite",
        animateBottom: "animateBottom 3s ease-in-out infinite",
        animateRight: "animateRight 3s ease-in-out infinite",
        animateLeft: "animateLeft 3s ease-in-out infinite",
        overlayShow: "overlayShow 200ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 200ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
};
