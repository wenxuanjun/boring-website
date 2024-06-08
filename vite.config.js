import { resolve } from 'path'
import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import UnheadVite from '@unhead/addons/vite'
import viteVue from '@vitejs/plugin-vue'
import viteVuetify from 'vite-plugin-vuetify'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    viteVue(),
    UnheadVite(),
    viteCompression({
      algorithm: 'brotliCompress'
    }),
    createHtmlPlugin({
      minify: true,
      entry: '/src/main.js'
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
    assetsInlineLimit: 16384,
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
