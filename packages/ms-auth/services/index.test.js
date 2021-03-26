const express = require('express')

const accountRouter = express.Router()
const accounts = crud(Account)

const roleRouter = express.Router()
const roles = crud(Role)

// 3. /auth/account,
accountRouter.param('id', accounts.param)

accountRouter.route('/').get(accounts.list).post(accounts.create)

accountRouter.route('/:id').get(accounts.read).put(accounts.update).delete(accounts.delete)

accountRouter.use(notFound)

// 4. /auth/role
roleRouter.param('id', roles.param)

roleRouter.route('/').get(roles.list).post(roles.create)

roleRouter.route('/:id').get(roles.read).put(roles.update).delete(roles.delete)
roleRouter.use(notFound)

router.use('/account', routing(Account))
router.use('/role', roleRouter)
