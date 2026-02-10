/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html",
  "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
      screens: {
        mobile:"320px",
    tablet: '600px',
    laptop:'850px',
    desktop: '1280px',
  }
  },
  plugins: [],
};
