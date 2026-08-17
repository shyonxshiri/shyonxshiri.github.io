import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "docs",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'framer-motion', 'lucide-react'],
        },
      },
    },
    reportCompressedSize: false,
  },
  server: {
    // no caching in local dev so the preview always reflects the latest edits
    headers: {
      'Cache-Control': 'no-store',
    },
  },
  preview: {
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  },
});



