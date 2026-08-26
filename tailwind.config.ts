import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        oat: "#F6F1E7",
        cream: "#FFFCF6",
        forest: "#173F35",
        sage: "#8FAF92",
        terracotta: "#D9784A",
        ink: "#25342F",
      },
      boxShadow: {
        soft: "0 22px 55px -28px rgba(23, 63, 53, 0.35)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
