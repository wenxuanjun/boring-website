const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = /\.(js|css|json|md|html|ico)(\?.*)?$/i;

module.exports = {
  productionSourceMap: false,
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  },
  css: {
    extract: false
  },
  devServer: {
    hot: true,
    host: '0.0.0.0',
    compress: true,
    disableHostCheck: true,
  },
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack: {
    plugins: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        }
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'report.html'
      }),
      new CompressionPlugin({
        test: productionGzipExtensions
      })
    ],
    module: {
      rules: [
        {test: /\.js$/,use: ['thread-loader']},
        {test: /\.md$/,use: ['./src/plugins/markdown-loader']}
      ]
    }
  }
}
