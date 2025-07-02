import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
   plugins: [vue()],
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