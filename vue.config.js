const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
  productionSourceMap: false,
  chainWebpack: config => {
    config.plugins.delete('prefetch'),
      config.module.rule('md')
        .test(/\.md/)
        .use('./src/plugins/markdown-loader')
        .loader('./src/plugins/markdown-loader')
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
      new HardSourceWebpackPlugin(),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'report.html'
      })
    ]
  }
}
