import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          gsap: ['gsap'],
          vendor: ['react', 'react-dom', 'lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 800
  },
  server: {
    port: 3000,
    open: false,
    host: true
  }
});

