import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import adapter from '@sveltejs/adapter-netlify';

// https://vitejs.dev/config/
export default defineConfig({
  kit:{
    adapter:adapter()
  },
  plugins: [svelte()]
})
