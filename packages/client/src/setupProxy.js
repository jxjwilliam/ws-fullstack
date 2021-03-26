const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    ['/api', '/auth', '/dbms', '/mongo', '/nosql', '/redis'],
    createProxyMiddleware({
      target: 'http://localhost:4321',
      changeOrigin: true,
    }),
  )
}
