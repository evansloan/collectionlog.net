/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#493F35',
        dark: '#2B2620',
        light: '#564E43',
        lighter: '#564C42',
        highlight: '#6F675E',
        tabHighlight: '#3E3529',
        accent: '#675d4d',
        green: '#00C600',
        orange: '#FF9300',
        yellow: '#FEFF00',
        red: '#FA1818',
        'dark-red': '#821e1c',
        'darker-red': '#4d1714;',
        error: '#FF6C6C',
        grey: '#52524e',
      },
      boxShadow: {
        log: 'inset 0px 2px 0px 0px rgba(0,0,0,0.2)',
        account: 'drop-shadow(1px 1px 0 black) drop-shadow(-1px -1px 0 black)',
      },
    },
  },
  plugins: [],
};
