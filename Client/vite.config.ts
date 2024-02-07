// vite.config.ts
import { defineConfig } from 'vite';
import path from 'path';
import electron from 'vite-plugin-electron/simple';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    electron({
      main: {
        entry: 'electron/main.ts',
        // Note: The 'externals' option might not be necessary here
      },
      preload: {
        input: path.join(__dirname, 'electron/preload.ts'),
      },
      renderer: {},
    }),
  ],
  build: {
    rollupOptions: {
      external: ['electron', 'express'], // Tell Rollup to treat 'express' as external
    },
  },
});
