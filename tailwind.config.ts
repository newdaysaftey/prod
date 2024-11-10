import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: { max: "440px" },
        md: { max: "767px" },
      },
      colors: {
        background: "rgba(19, 62, 135, 1)",
        lightBlue: "rgba(96, 139, 193, 1)",
        secondary: {
          DEFAULT: "rgba(203, 220, 235, 1)",
        },
      },
      fontSize: {
        sm: "0.8rem",
        base: "1rem",
        xl: "1.25rem",
        "2xl": "1.563rem",
        "3xl": "1.953rem",
        "4xl": "2.441rem",
        "5xl": "3.052rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
