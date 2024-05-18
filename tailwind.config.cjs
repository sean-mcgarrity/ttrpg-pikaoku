const { scale } = require('svelte/transition');

module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        svelteOrange: '#FF3E00',
        svelteDark: '#F03A00',
        hotPink: '#FF1966',
        dark: '#111111',
        offblack: '#333333',
        offwhite: '#FAF9F6',
        refinement: {
          armor: '#aa8844',
          weapon: '#aa4444',
          skill: '#4444aa',
          perception: '#8844aa',
          shield: '#44aaaa'
        },
        dark: {
          500: '#0d0d0d',
          450: '#0d0d0d',
          400: '#121212',
          DEFAULT: '#121212',
          350: '#1e1e1e',
          300: '#1f1f1f',
          0: '#000000'
        },
        campaign: {
          DEFAULT: 'rgb(var(--campaign-color) / <alpha-value>)'
        }
      },
      scale: {
        103: '1.03'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        title: ['Josefin Sans', 'serif'],
        heading: ['serif'],
        body: ['Inter', 'sans-serif']
      },
      shadow: {
        text: 'drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'
      },
      transitionProperty: {
        'max-h': 'max-height'
      }
    }
  },
  plugins: []
};
