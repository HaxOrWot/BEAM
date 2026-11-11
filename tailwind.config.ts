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
        // Base dark theme
        surface: "#0a0b10",
        "surface-dim": "#0a0b10",
        "surface-bright": "#2a2c35",
        "surface-container-lowest": "#050609",
        "surface-container-low": "#12141b",
        "surface-container": "#1a1d24",
        "surface-container-high": "#252830",
        "surface-container-highest": "#30333d",
        "surface-container-higher": "#3b3e49",
        
        // On-surface colors
        "on-surface": "#e8e9f0",
        "on-surface-variant": "#cfcddc",
        "inverse-surface": "#e8e9f0",
        "inverse-on-surface": "#2f323b",
        outline: "#9897a8",
        "outline-variant": "#4b4a5c",
        
        // Tint colors
        "surface-tint": "#c0c1ff",
        
        // Primary palette
        primary: "#c0c1ff",
        "on-primary": "#1000a9",
        "primary-container": "#8083ff",
        "on-primary-container": "#0d0096",
        "inverse-primary": "#494bd6",
        
        // Secondary palette
        secondary: "#4cd7f6",
        "on-secondary": "#003640",
        "secondary-container": "#03b5d3",
        "on-secondary-container": "#00424e",
        
        // Tertiary palette
        tertiary: "#ddb7ff",
        "on-tertiary": "#490080",
        "tertiary-container": "#b76dff",
        "on-tertiary-container": "#400071",
        
        // Error palette
        error: "#ffb4ab",
        "on-error": "#690005",
        "error-container": "#93000a",
        "on-error-container": "#ffdad6",
        
        // Fixed colors for contrast
        "primary-fixed": "#e1e0ff",
        "primary-fixed-dim": "#c0c1ff",
        "secondary-fixed": "#acedff",
        "secondary-fixed-dim": "#4cd7f6",
        "tertiary-fixed": "#f0dbff",
        "tertiary-fixed-dim": "#ddb7ff",
        
        // Background
        background: "#0a0b10",
        "on-background": "#e8e9f0",
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "2rem",
        xl: "3rem",
        "2xl": "2rem",
        "3xl": "3rem",
        full: "9999px",
      },
      spacing: {
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "2.5rem",
        margin: "3rem",
        "margin-mobile": "1.25rem",
        gutter: "1.5rem",
        "gutter-mobile": "1rem",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-jakarta)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-in": "slideIn 0.4s ease-out forwards",
        "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "gradient-x": "gradient-x 3s ease infinite",
        "shimmer": "shimmer 2s infinite linear",
        "float": "float 6s ease-in-out infinite",
        spin: "spin 1s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(128, 131, 255, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(128, 131, 255, 0.5)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
