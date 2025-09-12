import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  envDir: '..',
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/__data/': {
        target: 'https://files.ngobach.com/vinyl/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/__data/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@/': '/',
    },
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});
