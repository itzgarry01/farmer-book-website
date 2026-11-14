/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        farm: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        harvest: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        earth: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          500: '#9c5338',
          700: '#723b28',
          900: '#432115',
        }
      },
      fontFamily: {
        gurmukhi: ['"Noto Sans Gurmukhi"', '"Mukta Mahee"', 'sans-serif'],
        sans: ['"Inter"', '"Poppins"', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'book': '0 20px 30px -10px rgba(20, 83, 45, 0.25), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'warm': '0 10px 25px -5px rgba(217, 119, 6, 0.15)',
      }
    },
  },
  plugins: [],
};

