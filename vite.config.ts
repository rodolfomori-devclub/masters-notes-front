import path from 'node:path';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import biomePlugin from 'vite-plugin-biome';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    biomePlugin({
      mode: 'check',
      files: '.',
      applyFixes: true,
      failOnError: true,
    }),
    TanStackRouterVite(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
