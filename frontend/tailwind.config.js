const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        'maincolor': '#2B7C85',
        'subcolor' : '#37474F',
        'adminmain' : '#E7E7E7',
        'admindash' : '#474747'

      }
    },
  },
  plugins: [flowbite.plugin(),],
}