import { resolve } from 'path'
import { defineConfig } from 'vite'
import { createHtmlPlugin as viteHtml } from 'vite-plugin-html'
import viteVue from '@vitejs/plugin-vue'
import viteVuetify from 'vite-plugin-vuetify'
import viteProgress from 'vite-plugin-progress'
import viteCompression from 'vite-compression-plugin'

export default defineConfig({
  clearScreen: false,
  envPrefix: 'MIRROR_',
  json: { stringify: false },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  plugins: [
    viteVue(),
    viteVuetify(),
    viteProgress(),
    viteHtml({
      minify: true,
      entry: '/src/main.js'
    }),
    viteCompression({
      loginfo: 'silent',
      algorithm: 'brotliCompress'
    })
  ],
  build: {
    target: 'es2015',
    minify: 'terser',
    cssTarget: 'chrome61',
    assetsInlineLimit: 65536,
    reportCompressedSize: false,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]'
      }
    }
  }
})
