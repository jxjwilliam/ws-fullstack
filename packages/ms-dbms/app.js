const createError = require('http-errors')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const logger = require('morgan')

const route = require('./routes')
const { uploadPhoto, uploadSingle, uploadMultiple } = require('./services/supload')

const app = express()

require('dotenv').config()

app.set('port', process.env.PORT)

const { UPLOAD_DIR } = process.env
const option = {
  photo_dir: path.join(__dirname, UPLOAD_DIR, 'photo'),
  single_dir: path.join(__dirname, UPLOAD_DIR, 'single'),
  multiple_dir: path.join(__dirname, UPLOAD_DIR, 'multiple'),
}

app.use(logger('dev'))
app.use(bodyParser.json())
// what's the benefit of using bodyParser.urlencoded over express.urlencoded?
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'uploads')))

const testMiddleware = (req, res, next) => {
  console.log('TEST Middleware')
  next()
}

/// ////////////////////////////

app.get('/', (req, res) => {
  res.status(200).send(`MS-DBMS ${req.baseUrl}, ${req.url} works!`)
})

app.get('/api/dbms', (req, res) => {
  res.status(200).send(`MS-DBMS ${req.baseUrl}, ${req.url} works!`)
})

app.use('/api/dbms/users', route.user)

app.use('/api/dbms/photos', uploadPhoto(option.photo_dir))

/**
 * if want to use app.get('ms_dir'), replace the following:
 * uploadSingle(app);
 * uploadMultiple(app);
 */
app.use('/api/dbms/upload', testMiddleware, uploadSingle(option.single_dir))

app.use('/api/dbms/uploads', uploadMultiple(option.multiple_dir))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
