// const webpack = require('webpack')
module.exports = {
    devServer:{
        // 服务器代理
        proxy: {
          '/api': {
            target: 'http://10.245.29.32', // 代理地址
            changeOrigin: true,
          }
        },
        http: true,
        open: true
      }
}