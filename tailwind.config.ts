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
        background: "var(--bg-primary)",
        foreground: "var(--text-main)",
        'bg-primary': "#0F172A",
        'bg-secondary': "#1E293B",
        'accent-primary': "#3B82F6",
        'accent-secondary': "#06B6D4",
        'text-main': "#F8FAFC",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite alternate",
        "slide-up-reveal": "slideUpReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 10px rgba(59, 130, 246, 0.2)" },
          "100%": { boxShadow: "0 0 25px rgba(59, 130, 246, 0.6)" },
        },
        slideUpReveal: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-playfair)'],
      },
    },
  },
  plugins: [],
};
export default config;
