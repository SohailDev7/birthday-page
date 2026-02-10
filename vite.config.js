import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: 'localhost',
    port: 5173,
    hmr: {
      host: 'localhost',
      port: 5173,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
    }
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