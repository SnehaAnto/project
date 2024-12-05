import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8100,
    host: true,
    open: true,
    cors: true
  },
  preview: {
    port: 8100
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
}); 