const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      'cool-gray': colors.coolGray,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
    },
    extend: {
      colors: {
        'desaturated-blue': {
          50: '#dcd2e6',
          100: '#bfb9ce',
          200: '#908dae',
          300: '#676c8d',
          400: '#46546d',
          500: '#2b3e4d',
          600: '#1c3352',
          700: '#132757',
          800: '#0d1b5c',
          900: '#070b61',
        },
        'dark-cyan': {
          500: '#008689',
        },
      },
    },
    // https://tailwindcss.com/docs/min-width#min-width-scale
    minWidth: {
      0: '0',
      '1/5': '20%',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      full: '100%',
    },
    maxWidth: {
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
