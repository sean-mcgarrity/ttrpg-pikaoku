import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
/** @type {import('@sveltejs/kit').Config}*/
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      $assets: 'src/assets',
      $components: 'src/components',
      $utils: 'src/utils',
      $types: 'types'
    }
  },
  preprocess: [
    preprocess({
      postcss: true
    })
  ]
};

export default config;
