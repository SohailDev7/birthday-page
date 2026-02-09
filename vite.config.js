import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import apiPlugin from './vite-plugin-api'

export default defineConfig({
  plugins: [react(), tailwindcss(), apiPlugin()],
  server: {
    host: 'localhost',
    port: 5173,
    hmr: {
      host: 'localhost',
      port: 5173,
    },
  },
  define: {
    global: 'globalThis',
  },
  // Optimize audio files for build
  build: {
    assetsInlineLimit: 0, // Don't inline audio files as base64
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Keep audio files in a dedicated audio folder
          if (assetInfo.name.match(/\.(mp3|wav|ogg|m4a|aac|flac)$/i)) {
            return 'assets/audio/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  },
  // Allow audio file imports
  assetsInclude: ['**/*.mp3', '**/*.wav', '**/*.ogg', '**/*.m4a', '**/*.aac', '**/*.flac']
})