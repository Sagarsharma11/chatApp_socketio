/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        my_color: 'white',
        reciver:'#FACCA6',
        sender:'#B2B2B2'
      },
      height: {
        '128': '600px',
      },
      spacing:{
        '128':'600px'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],

}

