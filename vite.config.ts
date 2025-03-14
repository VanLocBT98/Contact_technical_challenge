import path from 'path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 3200
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: `@import "~/shares/styles/index.scss";`,
        quietDeps: true
      }
    }
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '~sdk': path.resolve(__dirname, './sdk')
    }
  }
});
