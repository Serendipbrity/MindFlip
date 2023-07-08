module.exports = {
  important: true,
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
    },
  },
  variants: {},
  plugins: [
    require('daisyui'),
    require('@tailwindcss/forms'),
  ],
}
