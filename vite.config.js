import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import tailwind from 'tailwindcss';
import { defineConfig } from 'vite';
import tailwindConfig from './tailwind.config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwind(tailwindConfig), autoprefixer],
    },
  }
});
