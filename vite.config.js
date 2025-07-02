import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
   plugins: [vue()],
  server: {
    host: '0.0.0.0',  // Penting untuk Docker
    port: 5173,
    strictPort: true,  // Hindari port fallback
    hmr: {
      clientPort: 5173  // Untuk hot-reload
    }
  }
})