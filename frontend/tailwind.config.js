/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {screens: {
    sm: '480px',
    md: '768px',
    lg: '976px',
    xl: '1200px',
  },
    container: {
      center: true,
    },
    extend: {},
  },
  plugins: [],
};
