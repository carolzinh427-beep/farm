/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pharmacy: {
          red: '#DC2626',
          redDark: '#B91C1C',
          redLight: '#FEE2E2',
          green: '#15803D',
          greenDark: '#166534',
          greenLight: '#DCFCE7',
          accent: '#10B981',
          bg: '#F8FAFC'
        }
      }
    },
  },
  plugins: [],
}

