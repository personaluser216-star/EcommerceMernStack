import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // optional, Vite default is already "dist"
  },
  base: '/', // ✅ Important for correct routing on deployment

  // ✅ If deploying to Vercel or Netlify, no need to add anything else here.
});
