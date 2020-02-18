module.exports = {
  chainWebpack: config => {
    config.plugins.delete('prefetch')
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
