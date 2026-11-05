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
        // Deep obsidian Swiss surfaces
        surface: "#131313",
        "surface-dim": "#131313",
        "surface-bright": "#3a3939",
        "surface-container-lowest": "#0e0e0e",
        "surface-container-low": "#1c1b1b",
        "surface-container": "#201f1f",
        "surface-container-high": "#2a2a2a",
        "surface-container-highest": "#353534",
        "surface-variant": "#353534",
        "surface-tint": "#c6c6c7",
        "surface-jet": "#111111",
        "surface-elevated": "#161616",

        // Typography & Content
        "on-surface": "#e5e2e1",
        "on-surface-variant": "#c4c7c8",
        "inverse-surface": "#e5e2e1",
        "inverse-on-surface": "#313030",
        "text-muted": "#8E8E93",

        // Outlines & Borders
        outline: "#8e9192",
        "outline-variant": "#444748",
        "border-dark": "#222222",
        "border-gold": "#3A3220",
        "border-gold-accent": "#DFBD69",
        "border-gold-light": "rgba(223, 189, 105, 0.4)",

        // Stitch Signature Gold System
        primary: "#DFBD69",
        "on-primary": "#131313",
        "primary-container": "#d4af37",
        "on-primary-container": "#554300",
        "primary-fixed": "#ffe088",
        "primary-fixed-dim": "#e9c349",
        "on-primary-fixed": "#241a00",
        "on-primary-fixed-variant": "#574500",

        gold: {
          DEFAULT: "#DFBD69",
          warm: "#DFBD69",
          light: "#F3E5AB",
          muted: "#C5A059",
          dark: "#C5A059",
          primary: "#DFBD69",
          accent: "#DFBD69",
        },
        "gold-warm": "#DFBD69",
        "gold-light": "#F3E5AB",
        "gold-muted": "#C5A059",
        "gold-primary": "#DFBD69",

        // Secondary & Tertiary
        secondary: "#c6c6cf",
        "on-secondary": "#2f3037",
        "secondary-container": "#45464e",
        "on-secondary-container": "#b4b4bd",
        "secondary-fixed": "#e2e1eb",
        "secondary-fixed-dim": "#c6c6cf",

        tertiary: "#efcb60",
        "on-tertiary": "#3d2f00",
        "tertiary-container": "#d2af48",
        "on-tertiary-container": "#554300",

        background: "#131313",
        "on-background": "#e5e2e1",

        error: "#ffb4ab",
        "on-error": "#690005",
        "error-container": "#93000a",
        "on-error-container": "#ffdad6",
      },
      spacing: {
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "0.75rem",
        "space-lg": "1.25rem",
        "space-xl": "2rem",
        gutter: "1rem",
        "gutter-mobile": "0.5rem",
        margin: "1.5rem",
        "margin-mobile": "0.75rem",
      },
      fontFamily: {
        sans: ["Geist", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        "display-lg": ["Geist", "sans-serif"],
        "headline-lg": ["Geist", "sans-serif"],
        "headline-sm": ["Geist", "sans-serif"],
        "body-lg": ["Geist", "sans-serif"],
        "body-sm": ["Geist", "sans-serif"],
        "metric-xl": ["JetBrains Mono", "monospace"],
        "telemetry-md": ["JetBrains Mono", "monospace"],
        "telemetry-sm": ["JetBrains Mono", "monospace"],
        "label-caps": ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "label-caps": ["10px", { lineHeight: "12px", letterSpacing: "0.08em", fontWeight: "600" }],
        "telemetry-sm": ["11px", { lineHeight: "14px", letterSpacing: "0.02em", fontWeight: "400" }],
        "body-sm": ["12px", { lineHeight: "16px", letterSpacing: "0em", fontWeight: "400" }],
        "telemetry-md": ["13px", { lineHeight: "18px", letterSpacing: "-0.01em", fontWeight: "400" }],
        "body-lg": ["14px", { lineHeight: "20px", letterSpacing: "-0.01em", fontWeight: "400" }],
        "headline-sm": ["16px", { lineHeight: "20px", letterSpacing: "-0.02em", fontWeight: "500" }],
        "headline-lg": ["24px", { lineHeight: "28px", letterSpacing: "-0.03em", fontWeight: "500" }],
        "metric-xl": ["36px", { lineHeight: "40px", letterSpacing: "-0.03em", fontWeight: "500" }],
        "display-lg": ["48px", { lineHeight: "52px", letterSpacing: "-0.04em", fontWeight: "600" }],
      },
    },
  },
  plugins: [],
};

export default config;
