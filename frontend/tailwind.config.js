module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'merged-color': '#f4a4a9',
      },
    },
  },
  plugins: [require('daisyui')],
}
