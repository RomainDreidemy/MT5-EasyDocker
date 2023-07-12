/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0174d9'
        }
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['winter']
  }
}
