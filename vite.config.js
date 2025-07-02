import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
   plugins: [vue()],
   resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),               // alias ke /src
      '@assets': path.resolve(__dirname, './src/assets'),  // alias ke /src/assets
      '@components': path.resolve(__dirname, './src/components'), // contoh tambahan
    },
  },
    server: {
      host: '0.0.0.0',
      port: 5173,
      strictPort: true,
      hmr: {
        clientPort: 5173
      },
      watch: {
        usePolling: true,
        interval: 100 // default 100ms, bisa disesuaikan
      }
  }

})