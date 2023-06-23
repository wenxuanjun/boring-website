import { resolve } from 'path'
import { defineConfig } from 'vite'
import { createHtmlPlugin as viteHtml } from 'vite-plugin-html'
import viteVue from '@vitejs/plugin-vue'
import viteVuetify from 'vite-plugin-vuetify'
import viteProgress from 'vite-plugin-progress'
import viteCompression from 'vite-compression-plugin'

export default defineConfig({
  clearScreen: false,
  plugins: [
    viteVue(),
    viteProgress(),
    viteHtml({
      minify: true,
      entry: '/src/main.js'
    }),
    viteCompression({
      loginfo: 'silent',
      algorithm: 'brotliCompress'
    }),
    viteVuetify({
      styles: {
        configFile: 'src/styles/variables.scss'
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  build: {
    minify: 'terser',
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
