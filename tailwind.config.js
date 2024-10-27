/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "first": "#16423C",
        "second": "#6A9C89",
        "third": "#C4DAD2",
        "fourth": "#E9EFEC",
        "fifth": "#0e2b27"
      },
      fontFamily: {
        heading: ["Roboto"],
        body: ["Montserrat"],
      },
      boxShadow: {
        'container': '0 8px 15px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
};
