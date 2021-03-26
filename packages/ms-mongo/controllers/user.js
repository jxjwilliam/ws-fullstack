const User = require('../models/User')

const param = (req, res, next, id) => {
  User.findById(id, (err, account) => {
    if (err) next(err)
    else if (account) {
      req.account = account
      next()
    } else {
      next(new Error('failed to load account'))
    }
  })
}

const list = (req, res, next) => {
  User.find(req.query, function (err, account) {
    if (err) next(err)
    else res.json(account)
  })
}

const get = (req, res, next) => res.json(req.account)

const post = (req, res, next) => {
  const account = new User(req.body)
  account.save(err => {
    if (err) next(err)
    else res.json(account)
  })
}

const put = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, account) => {
    if (err) next(err)
    else res.json(account)
  })
}

const remove = (req, res, next) => {
  req.account.remove(err => {
    if (err) next(err)
    else res.json(req.account)
  })
}

module.exports = {
  param,
  list,
  get,
  post,
  put,
  remove,
}
