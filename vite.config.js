import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path'; // ✅ THIS LINE FIXES IT

export default defineConfig({
  plugins: [react()],
  base: './', // ensures paths are relative
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
