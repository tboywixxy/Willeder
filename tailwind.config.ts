import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/pages/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      xs: "375px",   // mobile min
      sm: "600px",   // tablet starts here (your spec)
      md: "1024px",  // desktop starts here (your spec)
      lg: "1280px",
      xl: "1440px",
    },
    extend: {},
  },
  plugins: [],
};

export default config;
