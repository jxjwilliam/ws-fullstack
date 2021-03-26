const express = require('express')

const router = express.Router()

// 路由表都放在这里，方便管理。

const auth = require('./auth')
const {
  routing,
  middleware: { notFound },
} = require('./utils')
const Account = require('../models/Account')
const Role = require('../models/Role')

// 1. http://localhost:3000/auth
router.get('/', (req, res) => {
  const { app, url, baseUrl, originalUrl, path, hostname, ip, xhr } = req
  const { locals } = res
  res.json({
    message: 'Welcome to the AUTH API!',
    app,
    url,
    baseUrl,
    originalUrl,
    path,
    hostname,
    ip,
    xhr,
    locals,
  })
})

// 2. /auth/register...
const { isNotExist, hashPassword, signup } = auth
router.post('/register', isNotExist, hashPassword, signup)

/**
 * 3. /auth/login
 * req:
 *   originalUrl="/auth/login"
 *   baseUrl="/auth"
 *   url="/login"
 *   statusCode=null, statusMessage=null
 */
const { isExist, verifyPassword, issueToken, signin } = auth
router.post('/login', isExist, verifyPassword, issueToken, signin)

router.post('/token', auth.refreshToken)

router.use(auth.authenticate)

router.get('/logout', auth.signout)

router.use('/account', routing(Account))

router.use('/role', routing(Role))

router.use(notFound)

module.exports = router
