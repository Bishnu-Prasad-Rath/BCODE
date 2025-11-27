/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 6s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'progress': 'progress 3s linear forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(10px) scale(0.95)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0) scale(1)'
          },
        },
        progress: {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        }
      }
    },
  },
  plugins: [],
}