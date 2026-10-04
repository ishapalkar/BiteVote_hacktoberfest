/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFCF9',
          100: '#FAF6F0', // Exact appstore.png background
          200: '#F5ECE1',
          300: '#ECE0D0',
          400: '#DFCEB8',
          500: '#CDB79E',
        },
        brand: {
          50: '#FFF4F1',
          100: '#FFE6E0',
          200: '#FFCEBE',
          300: '#FFAF99',
          400: '#F58069',
          500: '#E85D45', // Exact appstore.png 'B' Coral
          600: '#D44A33',
          700: '#B23824',
          800: '#902E1E',
          900: '#76281B',
        },
        teal: {
          50: '#F0F8F7',
          100: '#DCF0ED',
          200: '#BCE2DD',
          300: '#8DCBC3',
          400: '#55ABA1',
          500: '#278681', // Exact appstore.png 'V' Checkmark & Sparkle Teal
          600: '#206E6A',
          700: '#1D5A56',
          800: '#194A47',
          900: '#173E3C',
        },
        stone: {
          850: '#23201E',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(41, 37, 36, 0.05), 0 2px 6px -1px rgba(41, 37, 36, 0.03)',
        'card': '0 6px 24px -4px rgba(232, 93, 69, 0.07), 0 2px 8px -2px rgba(39, 134, 129, 0.04)',
        'glow': '0 4px 24px -2px rgba(232, 93, 69, 0.25)',
        'teal-glow': '0 4px 24px -2px rgba(39, 134, 129, 0.25)',
      }
    },
  },
  plugins: [],
}
