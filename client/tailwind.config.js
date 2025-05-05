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
          background: '#121826', // Darker background for better contrast
          text: '#e2e8f0', // Much lighter text for better readability
          card: '#1e293b', // Slightly darker card background
          border: '#64748b', // Lighter border for better visibility
          heading: '#ffffff', // Bright white for headings
          muted: '#94a3b8', // For secondary/muted text with good contrast
          accent: '#3b82f6', // Bright accent color for interactive elements
          hover: '#2563eb', // Hover state for interactive elements
        },
      },
    },
  },
  plugins: [],
}
