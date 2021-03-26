const mongoose = require('mongoose')
const { DB_HOST, DB_PORT, DATABASE, MongoOptions } = require('./constants')

mongoose.Promise = global.Promise

// TODO: windows -> docker_mongo, host.docker.internal
module.exports = async () => {
  const uri = `mongodb://${DB_HOST}:${DB_PORT}/${DATABASE}`

  try {
    await mongoose.connect(uri, MongoOptions)
    console.log('连接 Mongo 数据库 -> ', uri)
  } catch (err) {
    throw new Error('连接 Mongo 数据库失败: ', String(err))
  }
}
