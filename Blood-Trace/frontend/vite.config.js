/**
 * Vite Configuration
 * Configures the build tool with React and Tailwind CSS plugins.
 * Includes a proxy setting to forward API requests to the backend server.
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy: {
      '/api/v1': 'http://localhost:4000'
    }
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
