import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import { svgSprite } from './vite-plugins/svgSprite.ts'

export default defineConfig({
  plugins: [
    react(),
    svgSprite(fileURLToPath(new URL('./src/shared/ui/components/Icon/assets', import.meta.url))),
  ],
  resolve: {
    alias: {
      '@shared/query': fileURLToPath(new URL('./src/shared/query', import.meta.url)),
      '@shared/ui': fileURLToPath(new URL('./src/shared/ui', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
