const createError = require('http-errors')
const express = require('express')
const path = require('path')
const logger = require('morgan')
const httpProxy = require('http-proxy')
const favicon = require('serve-favicon')
const cors = require('cors')
const helmet = require('helmet')
const expressJwt = require('express-jwt')
const fetch = require('node-fetch')

require('dotenv').config()

const app = express()
app.set('port', process.env.PORT)

const jwtSecretSalt = process.env.SECRET

app
  .use(favicon(path.join(__dirname, 'favicon.svg')))
  .use(cors())
  .use(logger('dev'))
  .use(helmet())
  .use(express.static(path.join(__dirname, 'build')))

// 1. 测试接口
app.get('/', (req, res) => {
  res.status(200).send('Hello from BFF proxy server!')
})

app.post('/api/v1/login', (req, res) => res.json({ token: '12345' }))
app.post('/api/v1/register', (req, res) => res.status(200).json({ message: 'success' }))
app.get('/api/v1/logout', (req, res) => res.json({ token: null, message: 'success process' }))
app.get('/api/fruits/:name', (req, res) => {
  const keyword = req.params.name || 'all'
  const searchUrl = `https://fruityvice.com/api/fruit/${keyword}`
  fetch(searchUrl)
    .then(ret => ret.json())
    .then(data => res.json(data))
    .catch(error => {
      console.error(error)
      res.json(error)
    })
})

const apiProxy = httpProxy.createProxyServer()
const { MS_AUTH, MS_DBMS, MS_NOSQL, MS_REDIS } = process.env

// 2. MS-AUTH
app.all('/auth/*', (req, res) => {
  console.log(`${req.url} redirects to ${MS_AUTH}`)
  apiProxy.web(req, res, { target: MS_AUTH })
})

// eslint-disable-next-line no-unused-vars, consistent-return
app.use(expressJwt({ secret: jwtSecretSalt, algorithms: ['HS256'] }), (err, req, res, next) => {
  if (err.name) {
    const { name, message, status, code } = err
    return res.status(status).json({ name, message, code, status })
  }
})

app.all('/dbms/*', (req, res) => {
  console.log(`${req.url} redirects to ${MS_DBMS}`)
  apiProxy.web(req, res, { target: MS_DBMS })
})

app.all(['/mongo/*', '/nosql/*'], (req, res) => {
  console.log(`${req.url} redirects to ${MS_NOSQL}`)
  apiProxy.web(req, res, { target: MS_NOSQL })
})

app.all('/redis/*', (req, res) => {
  console.log(`${req.url} redirects to ${MS_REDIS}`)
  apiProxy.web(req, res, { target: MS_REDIS })
})

app.use((req, res, next) => {
  const { url, params, query, body } = req
  console.error('BFF-路由服务器 无效URL: ', url, params, query, body)
  next(createError(404))
})

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
