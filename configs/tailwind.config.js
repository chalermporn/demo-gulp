/** @type {import('tailwindcss').Config} */
module.exports = {
  // purge: {
  //   enabled: true,
  //   content: ["./dist/**/*.html"],
  // },
  content: ["./dist/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
