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
        'white-light': '#a3a3a3',
        black: '#111111',
        'black-light': '#585858',
        primary: '#0034EB',
        'primary-light': '#4191da',
      },
      padding: {
        'x-default': 'clamp(20px, 8vw, 100px)',
        'y-default': 'clamp(20px, 8vh, 100px)',
      },
      inset: {
        'x-default': 'clamp(20px, 8vw, 100px)',
        'y-default': 'clamp(20px, 8vh, 100px)',
        'y-large': 'clamp(40px, 16vh, 200px)',
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
