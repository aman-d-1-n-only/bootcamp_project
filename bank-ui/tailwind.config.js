// /** @type {import('tailwindcss').Config} */
// module.exports = {
//     content: [
//         "./src/**/*.{js,jsx,ts,tsx}",
//     ],
//     theme: {
//         extend: {},
//     },
//     plugins: [],
// }


const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
        transparent: 'transparent',
        current: 'currentColor',
        grey:'#e2e8f0',
        lightgrey:'#f1f5f9'
      },
    extend: {},
  },
  plugins: [],
});