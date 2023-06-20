/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite/**/*.js',
    './src/**/*.{html,js}',
    './node_modules/tw-elements/dist/js/**/*.js',
    './index.html',
    './src/**/*.{html,js}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        cadetgray: '#F4F4F4',
        whitegray: '#E0E0E0',
        black: '#2A2E36',
        slategray: '#AAABAF',
        pearlgray: '#4B4E56',
        aqua: '#1D7D92',
        lightaqua: '#a9d1d166',
        bluegray: '#EAEDFA',
        orange: '#D2926A',
        blue: '#2D3648',
        white: '#ffffff',
        skyblue: '#4faffb',
        Silvergray: '#D4D5D7',
        gray: '#edf0f7',
        lightgray: '#cfcfcf',
        lightblue: '#E2E7F0',
        bluelight: '#717d96',
        buttongray: '#CBD2E0',
        tabsky: '#B0DCFF',
        darkskyblue: '#2A7AA8',
        skylightblue: '#34AFF7',
        graylight: ' #CBD2E0',
        slategeay: '#1A202C',
        neviblue: '#4A5468',
        slategeay: '#1A202C',
        pink: '#FF5252',
        red: '#FF0000',
        yellow: '#f99701',
        lightgreen: '#D1FFD9',
        green: '#2EDB4B',
        offgray: '#F7F9FC',
        gold: '#FE9D35',
        cadetgray: '#F0F0F1',
        purpal: '#E6DED5',
        lightsky: '#A9D1D1',
        red: '#FF3B30',
      },
      fontFamily: {
        sans: ['Avenir'],
        serif: ['Avenir'],
        mono: ['Avenir'],
        display: ['Avenir'],
        body: ['Avenir'],
      },
      // screens: {
      //   sm: "300px",

      //   md: "768px",

      //   lg: "1024px",

      //   xl: "1280px",

      //   "2xl": "1536px",
      // },
    },
  },
  plugins: [require('flowbite/plugin')],
  plugins: [require('tw-elements/dist/plugin.cjs')],

  darkMode: 'class',
};
