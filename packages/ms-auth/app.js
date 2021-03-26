const express = require('express')
const createError = require('http-errors')
const logger = require('morgan')
const bodyParser = require('body-parser')
const route = require('./services')
const connectMongoDB = require('./connect')
const { PORT } = require('./constants')

connectMongoDB()

const app = express()
app.set('port', PORT)

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.status(200).send(`MS-AUTH originalUrl=${req.originalUrl}, baseUrl=${req.baseUrl}, url=${req.url}  works!`)
})

app.use('/auth', route)

app.use(function (req, res, next) {
  next(createError(404))
})

app.use(function (err, req, res) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  return res.status(err.status || 500).json({ error: 'Not found' })
})

module.exports = app
