const db = require('../models')
const { ERRORS } = require('../config/constants')

const { User } = db
const { Op } = db.Sequelize

const param = (req, res, next, id) => {
  User.findByPk(id)
    .then(user => {
      if (!user) res.sendStatus(404)
      else {
        req.user = user
        next()
      }
    })
    .catch(next)
}

const list = (req, res, next) => {
  User.findAll({ where: req.query, include: [{ all: true }] })
    .then(users => res.json(users))
    .catch(next)
}

const get = (req, res, next) => res.json(req.user)

const post = (req, res, next) => {
  User.findOrCreate({ where: req.body })
    .then(data => res.json(data))
    .catch(next)
}

const put = (req, res, next) => {
  const { id } = req.params
  req.user
    .update(req.body)
    .then(count => res.json({ updated: count }))
    .catch(next)
}

const remove = (req, res, next) => {
  User.destroy({ where: { id: req.params.id } })
    .then(count => res.json({ deleted: count }))
    .catch(next)
}

const search = (req, res, next) => {
  let { term } = req.query
  term = term.toLowerCase()
  User.findAll({ where: { name: { [Op.like]: `%${term}%` } } })
    .then(users => res.json(users))
    .catch(next)
}

module.exports = {
  param,
  list,
  get,
  post,
  put,
  remove,
  search,
}
