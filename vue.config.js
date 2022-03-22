const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = /\.(js|css|json|md|html|ico)(\?.*)?$/i;

module.exports = {
  productionSourceMap: false,
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  },
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: 8000,
    compress: true,
    disableHostCheck: true
  },
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        filename: '[path][base].br',
        algorithm: 'brotliCompress',
        test: productionGzipExtensions,
        compressionOptions: {
          level: 11
        },
        minRatio: 0.8
      })
    ],
    module: {
      rules: [
        { test: /\.js$/, use: ['thread-loader'] },
        { test: /\.md$/, use: ['./src/plugins/markdown-loader'] }
      ]
    }
  }
}
