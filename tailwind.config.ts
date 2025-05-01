/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          white: '#ffffff',
          black: '#000000',
          gray: {
            900: '#111827',
            100: '#f3f4f6',
          },
          blue: {
            500: '#3b82f6',
            600: '#2563eb',
          },
          green: {
            500: '#22c55e',
            600: '#16a34a',
          },
        },
      },
    },
    plugins: [],
  }
  