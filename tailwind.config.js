/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#423439',
          50: '#f7f4f5',
          100: '#efe8ea',
          200: '#E0D7DA',
          300: '#c9b9bf',
          400: '#a3868f',
          500: '#7d6068',
          600: '#5f4750',
          700: '#423439',
          800: '#332a2e',
          900: '#241d20',
        },
        accent: '#E0D7DA',
        technical: {
          DEFAULT: '#eef1f4',
          border: '#dde3e8',
          text: '#4a5a68',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out both',
        'slide-up': 'slideUp 0.6s ease-out both',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
