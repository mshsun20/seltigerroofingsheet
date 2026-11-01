import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/admin/',
  server: {
    port: 7052,
    proxy: {
      '/api': {
        target: 'http://localhost:5052', // Adjust the target to your API server
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
