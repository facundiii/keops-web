import type { Config } from "tailwindcss";

/**
 * Tokens de color de Keops.
 * Son los mismos valores que las variables CSS de src/app/globals.css (:root).
 * Si cambiás uno, cambialo en los dos archivos.
 *
 * `colors` reemplaza la paleta de Tailwind a propósito: en el sitio solo
 * existen estos colores, así ningún componente puede usar uno suelto.
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      inherit: "inherit",
      negro: "#0A0A0A", // fondo general
      carbon: "#161412", // tarjetas y superficies
      piedra: "#2A2621", // bordes y divisores
      marfil: "#F0ECE4", // texto principal
      arena: "#A89F91", // texto secundario
      oro: {
        DEFAULT: "#C9A961", // acento, botones principales, antetítulos
        profundo: "#A88A45", // hover y presionado del dorado
      },
      laser: "#A970FF", // SOLO en Disco, en detalles
      whatsapp: "#25D366", // SOLO en el botón de WhatsApp
      // SOLO en la versión especial del aniversario (paleta del flyer)
      lava: "#FF6A13", // vetas y fuego de la pirámide
      brasa: "#FFC04D", // el centro del fuego
      hielo: "#CFE8EF", // la fecha de arriba
      "cielo-noche": "#0B1026", // fondo mientras carga el cielo
    },
    extend: {
      fontFamily: {
        titulo: ["var(--font-outfit)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        acento: ["var(--font-cormorant)", "Georgia", "serif"],
        jeroglifico: ["NotoEgyptian", "serif"],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.5s ease-out both",
        "fade-in": "fadeIn 0.5s ease-out both",
        "bounce-slow": "bounce 2s infinite",
        "scroll-up": "scrollUp 32s linear infinite",
        "scroll-down": "scrollDown 32s linear infinite",
        "scroll-left": "scrollLeft 15s linear infinite",
        "scroll-right": "scrollRight 28s linear infinite",
        "scroll-left-fast": "scrollLeft 16s linear infinite",
        "scroll-right-fast": "scrollRight 16s linear infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
