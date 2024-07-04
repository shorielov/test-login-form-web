import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to bottom, #F4F9FF, #E0EDFB)',
        'gradient-secondary': 'linear-gradient(to right, #70C3FF, #4B65FF)',
        stars: 'url(/stars.svg)',
      },
    },
    colors: {
      green: '#27B274',
      error: '#FF8080',
      blue: '#6F91BC',
      gray: '#404658',
      white: '#ffffff'
    }
  },
  plugins: [require('daisyui')],
};
export default config;
