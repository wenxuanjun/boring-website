const path = require('path')
const fs = require('fs')

module.exports = {
  devServer: {
    hot: true,
    host: '0.0.0.0',
    compress: true,
    disableHostCheck: true,
    https: {
      key: fs.readFileSync(path.join(__dirname, './cert/privkey.pem')),
      cert: fs.readFileSync(path.join(__dirname, './cert/cert.pem'))
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}
