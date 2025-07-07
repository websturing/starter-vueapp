import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  server: {
    host: '0.0.0.0',
    https: false, // Traefik handle HTTPS
    port: 5173,
    strictPort: true,

    hmr: {
      protocol: 'wss',
      host: 'vue.starter.localhost',
      clientPort: 443, // 🟢 ini penting
    },

    cors: true,
    watch: {
      usePolling: true,
      interval: 100,
      ignored: ['**/node_modules/**', '**/dist/**']
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "notivue/notification.css";` // Auto-inject
      }
    }
  }
})
