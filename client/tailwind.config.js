/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          background: '#1a202c',
          text: '#a0aec0',
          card: '#2d3748',
          border: '#4a5568',
          heading: '#ffffff', // Brighter color for headings
        },
      },
    },
  },
  plugins: [],
}
