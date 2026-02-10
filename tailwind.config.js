/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html",
  "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
      screens: {
    mobile: '600px',
    tablet: '768px',
    desktop: '1024px',
  }
  },
  plugins: [],
};
