/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          yellow: "#ffd754",
          red: "#ff1f1f",
          sky: "#5db9ff",
          blue: "#363b81",
        },
        neutral: {
          850: "#1e1e1e",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        reveal: {
          "0%": {
            opacity: 0,
            filter: "brightness(1) blur(15px)",
            scale: "1.0125",
          },
          "10%": { opacity: 1, filter: "brightness(1.25) blur(10px)" },
          "100%": { opacity: 1, filter: "brightness(1) blur(0)", scale: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        reveal: "reveal 0.7s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
