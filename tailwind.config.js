/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#fdfbf7',
          100: '#faf7f0',
          200: '#f5efe4',
          300: '#ede2d1',
          400: '#dfceb4',
          500: '#cbb391',
        },
        cream: {
          DEFAULT: '#f9f6f0',
          dark: '#f0e9dc',
          light: '#fdfcf9',
        },
        burgundy: {
          50: '#fcf2f4',
          100: '#f9e4e8',
          200: '#f3cad3',
          300: '#e9a1b2',
          400: '#dc6d88',
          500: '#cb4165',
          600: '#b42b50',
          700: '#941e3d',
          800: '#73162f',
          900: '#541223',
          950: '#380a16',
          deep: '#460d19',
        },
        gold: {
          50: '#faf8ee',
          100: '#f3eed6',
          200: '#e7ddae',
          300: '#d8c57e',
          400: '#c8ab52',
          500: '#b5933a',
          600: '#9d782e',
          700: '#7c5a27',
          800: '#674925',
          900: '#563d23',
          champagne: '#e8d4a6',
          antique: '#c59b27',
          warm: '#dfba73',
          foil: '#f7e7b4',
        },
        charcoal: {
          DEFAULT: '#2c2724',
          soft: '#423d3a',
          light: '#655e5a',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        display: ['Playfair Display', 'serif'],
        cursive: ['"Great Vibes"', '"Alex Brush"', 'cursive'],
        calligraphy: ['"Great Vibes"', '"Alex Brush"', 'cursive'],
        decorative: ['Cinzel Decorative', 'serif'],
        urdu: ['"Noto Nastaliq Urdu"', '"Urdu Typesetting"', 'system-ui', 'serif'],
        arabic: ['"Noto Naskh Arabic"', 'Amiri', 'Traditional Arabic', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 45px -10px rgba(84, 18, 35, 0.12), 0 10px 20px -5px rgba(181, 147, 58, 0.08)',
        'seal': '0 10px 25px -4px rgba(56, 10, 22, 0.4), 0 4px 10px -2px rgba(0, 0, 0, 0.2)',
        'gold-glow': '0 0 30px rgba(212, 175, 55, 0.35)',
      },
      backgroundImage: {
        'paper-texture': "radial-gradient(#d4af37 0.75px, transparent 0.75px), radial-gradient(#d4af37 0.75px, #fbf8f2 0.75px)",
      }
    },
  },
  plugins: [],
}
