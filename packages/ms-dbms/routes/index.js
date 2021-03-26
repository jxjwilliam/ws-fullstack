import express from 'express'
import user from './user'
import seed from './seed'

const router = express.Router()

const PLAIN_MSG = require('../config/constants')

router.get('/', (req, res, next) => {
  res.status(200).send(PLAIN_MSG)
})

module.exports = {
  index: router,
  user,
  seed,
}
