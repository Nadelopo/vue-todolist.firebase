import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import checker from 'vite-plugin-checker'

const pwaOptions = {
  base: '/',
  manifest: {
    name: 'todolist',
    short_name: 'todolist',
    theme_color: '#1c1c1c',
    icons: [
      {
        src: 'logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  },
}

export default defineConfig({
  plugins: [
    vue(),
    VitePWA(pwaOptions),
    checker({
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,vue}"',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
})
