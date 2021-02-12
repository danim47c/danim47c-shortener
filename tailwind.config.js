module.exports = {
  purge: [
    "components/**/*.js",
    "components/**/*.jsx",
    "components/**/*.tsx",
    "pages/**/*.js",
    "pages/**/*.jsx",
    "pages/**/*.tsx",
    "stores/**/*.js",
    "stores/**/*.jsx",
    "stores/**/*.tsx",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dark: "#1a1a1a",
        light: "#f5f5f5",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
