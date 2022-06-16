module.exports = {
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        custom: {
          'gray-100': '#F1F1F1',
          'gray-200': '#E2E2E2',
          'gray-300': '#C4C4C4',
          'gray-600': '#4E4E4E',
          'blue-100': '#549DF2',
          'green-100' : '#11B980'
        },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
