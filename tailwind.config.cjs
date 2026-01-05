/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    screens: {
      sm: '375px',
      md: '990px',
    },
    extend: {
      fontFamily: {},
      colors: {
        primary: {
          100: '#021863',
        },
        light: {
          100: '#ffffff',
          200: '#fbfcfc',
        },
        secondary: {
          100: '#5270ED',
        },
        dark: {
          100: '#252F48',
          200: '#c3ccd2',
          300: '#6d7a8d',
        },
        tertiary: {
          100: '#ffb636',
        },
        error: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
        shades: {
          0: '#FFFFFF',
          100: '#F8F9FA',
          200: '#E9ECEF',
          300: '#DEE2E6',
          400: '#CED4DA',
          500: '#ADB5BD',
          600: '#868E96',
          700: '#495057',
          800: '#343A40',
          900: '#212529',
          1000: '#000000',
        },
        dark: {
          50: '#F8F9FA',
          100: '#E9ECEF',
          200: '#DEE2E6',
          300: '#CED4DA',
          400: '#ADB5BD',
          500: '#868E96',
          600: '#495057',
          700: '#343A40',
          800: '#1F2431',
          900: '#121619',
        },
      },
    },
  },
  plugins: [],
};
