const mongoose = require('mongoose')
const { AUTHDB_URL } = require('./constants')

mongoose.Promise = global.Promise

const MongoOptions = {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
}

module.exports = async () => {
  try {
    await mongoose.connect(AUTHDB_URL, MongoOptions)
    console.info('连接成功 AUTHDB ->', AUTHDB_URL)
  } catch (err) {
    throw new Error('连接 Mongo 数据库失败: ', String(err))
  }
}
