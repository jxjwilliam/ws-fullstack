const { Seed } = require('../models')

const param = (req, res, next, id) => {
  Seed.findByPk(id)
    .then(seed => {
      if (!seed) res.sendStatus(404)
      else {
        req.seed = seed
        next()
      }
    })
    .catch(next)
}

const list = (req, res, next) => {
  Seed.findAll({ where: req.query })
    .then(seed => res.json(seed))
    .catch(next)
}

const get = (req, res) => res.json(req.seed)

const post = (req, res, next) => {
  Seed.create(req.body)
    .then(seed => res.json(seed))
    .catch(next)
}

const put = (req, res, next) => {
  const { id } = req.params
  Seed.update(req.body, { where: { id } })
    .then(count => res.json({ updated: count }))
    .catch(next)
}

const remove = (req, res, next) => {
  const { id } = req.params
  Seed.destroy({ where: { id } })
    .then(count => res.json({ deleted: count }))
    .catch(next)
}

module.exports = {
  param,
  list,
  get,
  post,
  put,
  remove,
}
