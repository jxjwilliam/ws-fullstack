const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Account = require('../models/Account')
const { ACCESS_SECRET, REFRESH_TOKEN } = require('../constants')

let refreshTokenAry = []

// ------------ 1. register ------------
// email + phone => unique
// username => unique
// http: 409 is the correct status code for duplicate resource or resource already exists.
function isNotExist(req, res, next) {
  const { username, email, phone } = req.body
  Account.findOne({ username, email, phone }, (err, account) => {
    if (err) res.json({ success: false, data: err.message })
    else if (account) res.sendStatus(409)
    else next()
  })
}

function hashPassword(req, res, next) {
  const { password } = req.body
  // pre-save: account.password = bcrypt.hashSync(account.password, 10);
  bcrypt.hash(password, 10, (err, hashed) => {
    if (err) return res.status(406).json({ success: false, data: 'Bcrypt Hash Error' })
    req.body.password = hashed
    next()
  })
}

function signup(req, res) {
  const { role, category, ...others } = req.body
  const account = new Account({
    ...others,
    role: { name: role, desc: 'role' },
    category: { name: category, desc: 'category' },
  })
  account.save(err => {
    if (err) return res.json({ success: false, data: 'DB Error' })
    const { password, __v, isActive, ...info } = account.toObject()
    return res.json(info)
  })
}

// ------------ 2. login ------------
/**
 * tip: onSubmit: needs `event.preventDefault`.
 * 3 cases: 1 error, 2 exist, 3 not exist.
 * (3) res: res.status(404)
 * Document.prototype.toObject: https://mongoosejs.com/docs/api.html#document_Document-toObject
 */
function isExist(req, res, next) {
  const { username } = req.body
  Account.findOne({ username }, (err, account) => {
    if (err) res.json({ success: false, data: err.message })
    else if (account) {
      const { timestamp, __v, isActive, desc, role, category, ...others } = account.toObject()
      req.decoded = { ...others, role: role.name, category: category.name }
      next()
    } else res.sendStatus(404)
  })
}

function verifyPassword(req, res, next) {
  const { password } = req.body
  const passwordIsValid = bcrypt.compareSync(password, req.decoded.password)
  if (!passwordIsValid) {
    return res.sendStatus(401)
  }
  next()
}

// for access and refresh token
function generateToken(info, secret, expires_option) {
  return jwt.sign(info, secret, expires_option) // 86400: expires in 24 hours, '15s'
}

function issueToken(req, res, next) {
  const {
    decoded: { password, ...others },
  } = req

  req.accessToken = generateToken(others, ACCESS_SECRET, { expiresIn: '30m' }) // 86400: expires in 24 hours, '15s'
  req.refreshToken = generateToken(others, REFRESH_TOKEN)

  next()
}

// 注册的时候issue。 Not use `return`
function signin(req, res, next) {
  const { accessToken, refreshToken } = req
  refreshTokenAry.push(refreshToken)
  if (accessToken) res.status(200).json({ token: accessToken, refreshToken })
  else next(new Error('account error'))
}

// ------------ 3. logout ------------
// The JWT is stored on browser, so remove the token deleting the cookie at client side
function signout(req, res) {
  const { refreshToken } = req
  refreshTokenAry = refreshTokenAry.filter(token => token !== refreshToken)
  return res.sendStatus(204) // No Content
}

// ------------ 4. authenticate ------------
/**
 * 验证 Token
 * GET https://localhost/api/userOrders
 *  Authorization: Bearer JWT_ACCESS_TOKEN
 * 401: Unauthorized, 403: FORBIDDEN
 */
function authenticate(req, res, next) {
  // Bearer eyJhbGciOiJIUzI1N...
  const authToken = req.headers.authorization
  const token = authToken && authToken.split(' ')[1]
  if (token) {
    jwt.verify(token, ACCESS_SECRET, (error, account) => {
      if (error) return res.sendStatus(403)

      req.account = account
      next()
    })
  } else return res.sendStatus(401)
}

// ------------ 5. refresh token ------------
// [JWT Authentication Tutorial - Node.js](https://www.youtube.com/watch?v=mbsmsi7l3r4)
function refreshToken(req, res) {
  const { token } = req.body
  if (token === null) return res.sendStatus(401)
  if (!refreshTokenAry.includes(token)) return res.sendStatus(403)
  jwt.verify(token, REFRESH_TOKEN, (err, account) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateToken(account, ACCESS_SECRET, { expiresIn: '30m' })
    res.json({ token: accessToken })
  })
}

module.exports = {
  isNotExist,
  hashPassword,
  signup,
  isExist,
  verifyPassword,
  issueToken,
  signin,
  signout,
  authenticate,
  refreshToken,
}
