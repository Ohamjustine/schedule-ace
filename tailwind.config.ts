import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#3AB0FF",
          DEFAULT: "#0081C9",
          dark: "#005B99",
        },
        danger: "#FF4C4C",
        success: "#00C897",
      },
    },
  },
  plugins: [],
};
export default config;
