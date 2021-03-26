const createError = require('http-errors')
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const connectMongoDB = require('./connect')
const { PORT } = require('./constants')

connectMongoDB()

const app = express()
app.set('port', PORT)

app
  .use(logger('dev'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.status(200).send(`MS-Doc ${req.baseUrl}, ${req.url} works!`)
})

app.get('/api/doc', (req, res) => {
  res.status(200).send(`MS-Doc ${req.baseUrl}, ${req.url} works!`)
})

app
  .use(function (req, res, next) {
    next(createError(404))
  })
  .use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
  })

module.exports = app
