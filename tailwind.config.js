/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./{app,components,libs,pages,hooks}/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'klavika': ['Klavika', 'system-ui', 'sans-serif'],
        'sans': ['Klavika', 'system-ui', 'sans-serif'],
      },
      screens: {
        '3xl': '1920px',  // Für 27-Zoll-Bildschirme und größer
        '4xl': '2560px',  // Für 4K-Bildschirme
      },
    },
  },
  plugins: [],
}

