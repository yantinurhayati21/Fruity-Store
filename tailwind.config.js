/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        plum: {
          500: '#DDA0DD', // Sesuaikan kode warna plum sesuai kebutuhan Anda
        },
      },
    },
  },
  plugins: [],
}

