module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        svelteOrange: '#FF3E00',
        svelteDark: '#F03A00',
        hotPink: '#FF1966',
        dark: '#111111',
        light: '#FAFAFA',
        offblack: '#333333'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        title: ['Chomsky', 'serif'],
        heading: ['serif'],
        body: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
};
