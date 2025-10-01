import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://142.93.215.17", // 👈 your backend
        changeOrigin: true,
        secure: false, // allow http
      },
    },
  },
})
