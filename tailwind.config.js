module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        patrick: ["Patrick Hand", "cursive"],
        zillaSlab: ["Zilla Slab", "serif"],
        zillaSlabSemiBold: ["Zilla Slab SemiBold", "serif"],
        zillaSlabMedium: ["Zilla Slab Medium", "serif"],
        zillaSlabLight: ["Zilla Slab Light", "serif"],
      }
    },
  },
  plugins: [],
}
