const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    ['/rapidapi', '/api/message', '/github'],
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
    }),
  )
}
