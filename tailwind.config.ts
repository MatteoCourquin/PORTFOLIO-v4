import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        black: '#111111',
        primary: '#0034EB',
      },
      padding: {
        'x-default': 'clamp(20px, 8vw, 100px)',
        'y-default': 'clamp(20px, 8vh, 100px)',
      },
      inset: {
        'x-default': 'clamp(20px, 8vw, 100px)',
        'y-default': 'clamp(20px, 8vh, 100px)',
      },
      gap: {
        'x-default': 'clamp(20px, 8vw, 100px)',
        'y-default': 'clamp(20px, 8vh, 100px)',
      },
      width: {
        'x-default': 'clamp(20px, 8vw, 100px)',
        'y-default': 'clamp(20px, 8vh, 100px)',
      },
      height: {
        'x-default': 'clamp(20px, 8vw, 100px)',
        'y-default': 'clamp(20px, 8vh, 100px)',
      },
      maxWidth: {
        default: '1730px',
      },
    },
  },
  plugins: [],
};

export default config;
