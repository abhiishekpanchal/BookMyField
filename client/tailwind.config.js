/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#191A19',
        secondary: '#1E5128',
        tertiary: '#4E9F3D',
        base: '#D8E9A8',
      },
      fontFamily: {
        header: ['Be Vietnam Pro', 'sans-serif'],
        amsterdam: ["New Amsterdam", 'sans-serif'],
      },
    },
  },
  plugins: [],
}