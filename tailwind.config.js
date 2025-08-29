/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
      },
      fontSize: {
        'xs': '13px',
        'sm': '14px',
        'base': '14px',
      },
      colors: {
        'drone': {
          'primary': '#6366f1',
          'secondary': '#8b5cf6',
          'accent': '#06b6d4',
          'success': '#10b981',
          'warning': '#f59e0b',
          'danger': '#ef4444',
          'dark': '#1e293b',
          'light': '#f8fafc',
        }
      },
      spacing: {
        '15': '15px',
      }
    },
  },
  plugins: [],
}
