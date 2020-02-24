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
  ]
}
