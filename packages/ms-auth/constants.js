// convenient for test.

require('dotenv').config()

module.exports = {
  PORT: process.env.PORT,
  ACCESS_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN_SECRET,
  AUTHDB_URL: process.env.AUTHDB_URL || 'mongodb://localhost:27017/ms-auth',
}
