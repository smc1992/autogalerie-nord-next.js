/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./{app,components,libs,pages,hooks}/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'klavika': ['Klavika', 'system-ui', 'sans-serif'],
        'sans': ['Klavika', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

