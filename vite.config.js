import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "collection",
  resolve: {
    alias: {
      "@": path.resolve('./src')
    }
  },
  build: {
    chunkSizeWarningLimit: 3000
  }
})
