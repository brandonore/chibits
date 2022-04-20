const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
        colors: {
            pink: {
                chi: '#fff'
            },
            purple: {
                chi: '#696CFF'
            }
        },
        fontFamily: {
            sans: ['Inter var', ...defaultTheme.fontFamily.sans],
          },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
