/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
export default withMT({
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "primary-indigo": "#3949AB",
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
});