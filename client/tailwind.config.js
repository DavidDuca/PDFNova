/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Sora'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
      colors: {
        brand: {
          50:  "#f0f4ff",
          100: "#e0e9ff",
          200: "#c7d7fe",
          300: "#a5bbfc",
          400: "#8196f8",
          500: "#6172f3",
          600: "#4f55e8",
          700: "#3f42ce",
          800: "#3538a7",
          900: "#303485",
        },
        accent: {
          400: "#fb7185",
          500: "#f43f5e",
        },
        surface: {
          0:   "#ffffff",
          50:  "#f8f9fe",
          100: "#f1f3fb",
          200: "#e8ebf7",
        },
      },
      boxShadow: {
        card:  "0 4px 24px -4px rgba(97, 114, 243, 0.12)",
        float: "0 8px 40px -8px rgba(97, 114, 243, 0.22)",
        glow:  "0 0 32px rgba(97, 114, 243, 0.25)",
      },
      animation: {
        "fade-up":     "fadeUp 0.5s ease forwards",
        "fade-in":     "fadeIn 0.4s ease forwards",
        shimmer:       "shimmer 1.6s infinite linear",
        "bounce-once": "bounceOnce 0.6s ease",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: 0 },
          "100%": { opacity: 1 },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        bounceOnce: {
          "0%,100%": { transform: "scale(1)" },
          "50%":     { transform: "scale(1.12)" },
        },
      },
    },
  },
  plugins: [],
}
