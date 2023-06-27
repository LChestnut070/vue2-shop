// 配置代理跨域问题
module.exports = {
  proxy: {
    '/api': {
      //提供数据的服务器地址
      target: 'http://gmall-h5-api.atguigu.cn/api',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  }
}
