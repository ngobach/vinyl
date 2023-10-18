import { defineConfig } from 'vite';

export default defineConfig({
  appType: 'spa',
  root: './src',
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: [{ find: '@', replacement: __dirname + '/src' }],
  },
});
