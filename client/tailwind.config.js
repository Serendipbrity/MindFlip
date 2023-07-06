module.exports = {
  
  theme: {
    extend: {
      colors: {
        'colorOne': '#EE9B00',
      },
    },
    daisyui: {
      themes: {
        mytheme: {
          'primary': '#EE9B00',
        },
      },
      important: true,
    },
  },
  variants: {},
  plugins: [
    require('daisyui'),
    require('@tailwindcss/forms'),
  ],
}
