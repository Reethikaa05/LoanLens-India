/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Newsreader', 'Georgia', 'serif'],
        body: ['Source Sans 3', 'Segoe UI', 'sans-serif'],
        mono: ['IBM Plex Mono', 'Menlo', 'monospace'],
      },
      colors: {
        brand: {
          50: '#FBF5F8',
          100: '#F6EBF2',
          200: '#EFE3EA',
          300: '#DFC2D5',
          400: '#CFA5C1',
          500: '#A45D8D',
          600: '#7B3566',
          700: '#5E284D',
          800: '#4B2440', // Challenge accent
          900: '#32162A',
          950: '#1F0C1A',
        },
        paper: {
          light: '#FBF9FA',
          card: '#F3EEF1',
          border: '#E2D9DE',
        },
        darkpaper: {
          bg: '#17121A',
          card: '#1F1822',
          border: '#33293A',
        }
      }
    },
  },
  plugins: [],
}
