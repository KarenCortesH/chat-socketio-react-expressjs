import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { io } from 'socket.io-client'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/socket.io': {
        target: 'http://localhost:3000',
        ws: true
      }
    }
  }
})
