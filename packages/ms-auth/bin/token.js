const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

const TOKEN_SECRET = require('crypto').randomBytes(64).toString('hex')

function signToken(tokenInfo) {
  const token = jwt.sign(tokenInfo, TOKEN_SECRET, { algorithm: 'HS256', expiresIn: '30m' })
  // res.json({token})
}

// authenticateToken is a express-middleware.
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401) // if there isn't any token

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

function verifyToken(token) {
  const decoded = jwt.verify(token, TOKEN_SECRET)
  console.log(decoded.username)
}

// a convenient way, same middleware better than `verifyToken`.
// app.use(verifyExpressJwt)
function verifyExpressJwt(token) {
  expressJwt(
    {
      secret: TOKEN_SECRET,
      algorithms: ['HS256'],
      getToken: req => {
        const {
          headers: { authorization },
          query: { token },
        } = req
        if (authorization && authorization.split(' ')[0] === 'Bearer') {
          return authorization.split(' ')[1]
        }
        if (token) {
          return token
        }
        return null
      },
    },
    (err, req, res, next) => {
      if (err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token')
      }
    },
  )
}
