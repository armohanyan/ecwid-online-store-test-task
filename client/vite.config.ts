// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: ['.ts', '.js'], // this is default, but make sure it's there
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 8000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
