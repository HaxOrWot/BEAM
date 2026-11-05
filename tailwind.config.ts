import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#131313",
          dim: "#131313",
          bright: "#3a3939",
          lowest: "#0e0e0e",
          low: "#1c1b1b",
          container: "#201f1f",
          high: "#2a2a2a",
          highest: "#353534",
          variant: "#353534",
        },
        "on-surface": {
          DEFAULT: "#e5e2e1",
          variant: "#c4c7c8",
        },
        primary: {
          DEFAULT: "#ffffff",
          foreground: "#2f3131",
          container: "#e2e2e2",
          "on-container": "#636565",
        },
        secondary: {
          DEFAULT: "#c6c6cf",
          foreground: "#2f3037",
          container: "#45464e",
          "on-container": "#b4b4bd",
        },
        outline: {
          DEFAULT: "#8e9192",
          variant: "#444748",
        },
        error: {
          DEFAULT: "#ffb4ab",
          foreground: "#690005",
          container: "#93000a",
        },
      },
      fontFamily: {
        sans: ["Geist", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
