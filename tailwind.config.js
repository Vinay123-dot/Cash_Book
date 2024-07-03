/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
            50: '#5A87B2',
            100: '#F6FAFF',
            200: '#5A87B2',
            300: '#5A87B2',
            400: '#5A87B2',
            500: '#5A87B2',
            600: '#5A87B2',
            700: '#5A87B2',
            800: '#5A87B2',
            900: '#5A87B2',
        },
        red: {
            50: '#D20000',
            100: '#D20000',
            200: '#D20000',
            300: '#D20000',
            400: '#D20000',
            500: '#D20000',
            600: '#D20000',
            700: '#D20000',
            800: '#D20000',
            900: '#D20000',
        },
        black: '#000000',
        white: '#FFFFFF',
    },

    },
  },
  plugins: [],
}