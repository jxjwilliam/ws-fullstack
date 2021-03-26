const express = require('express')
const createError = require('http-errors')

const middleware = {
  notFound: function (req, res, next) {
    const { originalUrl, baseUrl, url } = req
    console.error('😞 notFound Error 😞 ', { originalUrl, baseUrl, url })
    next(createError(404))
  },
}

// fur MongoDB/Mongoose
function crud(Model) {
  return {
    create: (req, res, next) => {
      const newItem = new Model(req.body)
      return newItem.save(err => {
        if (err) next(err)
        else res.json(newItem)
      })
    },
    param: (req, res, next, id) => {
      Model.findById(id, (err, data) => {
        if (err) next(err)
        else if (data) {
          req.data = data
          next()
        } else {
          return res.json({ message: 'No such record' })
        }
      })
    },
    list: (req, res, next) =>
      Model.find(req.query, function (err, data) {
        if (err) next(err)
        else if (data) res.json(data)
        else next(new Error('failed to load user'))
      }),
    read: (req, res, next) => res.json(req.data),
    update: (req, res, next) => {
      Model.findByIdAndUpdate(req.params._id, req.body, { new: true }, (err, data) => {
        if (err) next(err)
        else res.json(data)
      })
    },
    delete: (req, res, next) =>
      Model.deleteOne({ _id: req.params._id }, err => {
        if (err) next(err)
        else res.json(req.data)
      }),
  }
}

function routing(MongoModel) {
  const router = express.Router()
  const Model = crud(MongoModel)

  router.param('id', Model.param)

  router.route('/').get(Model.list).post(Model.create)

  router.route('/:id').get(Model.read).put(Model.update).delete(Model.delete)

  router.use(middleware.notFound)

  return router
}

module.exports = { middleware, crud, routing }
