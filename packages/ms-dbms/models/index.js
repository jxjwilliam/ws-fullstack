const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const dir = path.join(__dirname, '/../config/config.json')

const config = require(dir)[env]

const db = {}

const sequelize = new Sequelize(config.database, config.username, config.password, config)

fs.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

console.log('[db:models/index] ', db)

db.sequelize = sequelize
db.Sequelize = Sequelize

sequelize
  .authenticate()
  .then(() => console.log('Database connected...'))
  .catch(e => console.error(`Unable to connect: ${e}`))

module.exports = db
