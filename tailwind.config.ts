import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-noto-sans)'],
        arabic: ['var(--font-noto-sans-arabic)'],
      },
      colors: {
        'iraqi-red': '#CE1126',
        'iraqi-green': '#007A3D',
        'iraqi-black': '#000000',
        'iraqi-white': '#FFFFFF',
      },
    },
  },
  plugins: [],
};
export default config;
