import { sveltekit, vitePreprocess } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $assets: path.resolve('./src/assets'),
      $src: path.resolve('./src'),
      $lib: path.resolve('./src/lib'),
      $components: path.resolve('./src/components'),
      $utils: path.resolve('./src/utils')
    }
  },
  test: {}
};

export default config;
