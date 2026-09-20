/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0b0b14',
        char: '#151420',
        paper: '#f4ede0',
        amber: '#e8a94c',
        ember: '#c97a3f',
        slate: '#8d8ca8',
        plum: '#4a2f52',
      },
      fontFamily: {
        display: ['"Noto Sans Display"', 'sans-serif'],
        copy: ['"Noto Sans"', 'sans-serif'],
        mono: ['"Noto Sans Mono"', 'monospace'],
      },
      maxWidth: {
        panel: '1180px',
      },
    },
  },
  plugins: [],
}
