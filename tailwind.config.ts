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
        blush: {
          DEFAULT: "#F7E6E8",
          50: "#FCF6F7",
          100: "#F7E6E8",
          200: "#EFD0D4",
          300: "#E6B8C0",
        },
        cream: {
          DEFAULT: "#FFF8F0",
          50: "#FFFCF9",
          100: "#FFF8F0",
          200: "#F9EDE0",
          300: "#F0DDD0",
        },
        burgundy: {
          DEFAULT: "#651F35",
          light: "#822744",
          dark: "#4a1626",
          900: "#320f1a",
        },
        dustyRose: {
          DEFAULT: "#C96F82",
          light: "#D88B9C",
          dark: "#B4576B",
        },
        mauve: {
          DEFAULT: "#A9828C",
          light: "#BDA0A8",
          dark: "#8F6671",
        },
        espresso: {
          DEFAULT: "#261C1E",
          light: "#3B2D30",
          dark: "#1A1315",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        editorial: "0 10px 30px -10px rgba(38, 28, 30, 0.15), 0 4px 6px -2px rgba(38, 28, 30, 0.05)",
        "editorial-lg": "0 20px 40px -15px rgba(38, 28, 30, 0.25), 0 8px 16px -4px rgba(38, 28, 30, 0.1)",
        book: "-5px 5px 20px rgba(38, 28, 30, 0.3), -2px 2px 6px rgba(38, 28, 30, 0.2)",
      },
      backgroundImage: {
        "paper-texture": "radial-gradient(#C96F82 0.75px, transparent 0.75px)",
      },
    },
  },
  plugins: [],
};

export default config;
