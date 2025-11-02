// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8",
        secondary: "#F59E0B",
        muted: "#6B7280",
      },
    },
  },
  plugins: [],
};

export default config;
