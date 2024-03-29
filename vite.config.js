import { resolve } from 'path'
import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import { compression } from 'vite-plugin-compression2'
import viteVue from '@vitejs/plugin-vue'
import viteVuetify from 'vite-plugin-vuetify'
import viteProgress from 'vite-plugin-progress'

export default defineConfig({
  clearScreen: false,
  plugins: [
    viteVue(),
    viteProgress(),
    compression({
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
