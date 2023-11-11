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
        offblack: '#333333',
        refinement: {
          armor: '#aa8844',
          weapon: '#aa4444',
          skill: '#4444aa',
          perception: '#8844aa',
          shield: '#44aaaa'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        title: ['Chomsky', 'serif'],
        heading: ['serif'],
        body: ['Inter', 'sans-serif']
      },
      transitionProperty: {
        'max-h': 'max-height'
      }
    }
  },
  plugins: []
};
