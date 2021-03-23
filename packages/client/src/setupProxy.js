const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    ['/rest', '/api', '/data'],
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
    }),
  )
}
