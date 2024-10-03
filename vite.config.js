import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/collection",
  resolve: {
    alias: {
      "@": path.resolve('./src')
    }
  },

  esbuild: {
    drop: ['console', 'debugger']
  },

  build: {
    chunkSizeWarningLimit: 3000,
    outDir: 'dist',
    cssCodeSplit: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },

})
