/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae2fd',
          300: '#7dd0fc',
          400: '#38bdf8',
          500: '#005EAD', // Crisp Light Medical Blue (Israeli Flag Blue theme)
          600: '#004F92',
          700: '#003B70',
          800: '#002B54',
          900: '#001b36',
        },
        burgundy: {
          DEFAULT: '#8A1538', // BMT Burgundy signature action color
          50: '#fdf2f4',
          100: '#fbe4e9',
          200: '#f7ccd5',
          300: '#f0a3b4',
          400: '#e36e8b',
          500: '#8A1538',
          600: '#70102b',
          700: '#5a0d22',
          800: '#4a0a1c',
          900: '#2d030e',
        }
      },
      fontFamily: {
        sans: ['Heebo', 'Assistant', 'Outfit', 'Inter', 'system-ui', 'sans-serif'],
        hebrew: ['Heebo', 'Assistant', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
