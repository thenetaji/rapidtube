export default {
  content: [
    "./*.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {},
      backgroundImage: {
        'custom-bg': 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(131,131,211,1) 58%, rgba(0,212,255,1) 100%)',
      },
      fontFamily: {
        sans: ['Poppins','sans-serif'
          ]
      }
    },
  },
  plugins: [],
}