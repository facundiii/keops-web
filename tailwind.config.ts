import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#c9a961",
          light: "#e0c278",
          dark: "#a88b45",
        },
        cream: "#f0ece4",
        night: {
          950: "#0a0a0a",
          900: "#111111",
          800: "#1a1a1a",
          700: "#252525",
          600: "#333333",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.7s ease forwards",
        "fade-in": "fadeIn 0.6s ease forwards",
        "bounce-slow": "bounce 2s infinite",
        "logo-entrance": "logoEntrance 1.1s cubic-bezier(0.22,1,0.36,1) forwards",
        "scroll-up": "scrollUp 32s linear infinite",
        "scroll-down": "scrollDown 32s linear infinite",
        "scroll-left": "scrollLeft 28s linear infinite",
        "scroll-right": "scrollRight 28s linear infinite",
        "scroll-left-fast": "scrollLeft 16s linear infinite",
        "scroll-right-fast": "scrollRight 16s linear infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        logoEntrance: {
          "0%": { opacity: "0", transform: "scale(0.82) translateY(16px)" },
          "70%": { opacity: "1", transform: "scale(1.03) translateY(-4px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
