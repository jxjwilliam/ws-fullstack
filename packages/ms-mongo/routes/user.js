const express = require('express')

const router = express.Router()
const controller = require('../controllers/user')

router.param('id', controller.param)

router.route('/').get(controller.list).post(controller.post)

router.route('/:id').get(controller.get).put(controller.put).delete(controller.remove)

module.exports = router
