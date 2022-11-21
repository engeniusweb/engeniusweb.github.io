import colors from 'tailwindcss/colors';

export default {
  content: [
    './index.html',
    './src/**/*.{jsx,js}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#ef7c7c',
          '100': '#ed6666',
          '200': '#ea5151',
          '300': '#e83b3b',
          '400': '#e52525',
          '500': '#ce2121',
          '600': '#b71e1e',
          '700': '#a01a1a',
          '800': '#891616',
          '900': '#731313',
          DEFAULT: '#e52525'
        },
        secondary: {
          '50': '#7ebef2',
          '100': '#69b3f0',
          '200': '#53a8ed',
          '300': '#3e9deb',
          '400': '#2892e9',
          '500': '#2483d2',
          '600': '#2075ba',
          '700': '#1c66a3',
          '800': '#18588c',
          '900': '#144975',
          DEFAULT: '#2892e9'
        }
      }
    }
  }
}
