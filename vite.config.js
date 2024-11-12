import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// En vite.config.js
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000, // Ajusta el límite en KB
  },
});