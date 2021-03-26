const express = require('express')
const createError = require('http-errors')

const middleware = {
  notFound: function (req, res, next) {
    next(createError(404))
  },
}

// MySQL version
function crud(Model) {
  return {
    create: (req, res, next) => {},
    param: (req, res, next) => {},
    list: (req, res, next) => {},
    read: (req, res, next) => {},
    update: (req, res, next) => {},
    delete: (req, res, next) => {},
  }
}

function routing(MySQLModel) {
  const router = express.Router()
  const Model = crud(MySQLModel)

  router.param('id', Model.param)

  router.route('/').get(Model.list).post(Model.create)

  router.route('/:id').get(Model.read).put(Model.update).delete(Model.delete)

  router.use(middleware.notFound)

  return router
}

module.exports = routing
