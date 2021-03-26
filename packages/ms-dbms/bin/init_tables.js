/* eslint-disable import/no-dynamic-require */
// Because Sequelize is doing a lot of magic, you have to call `Sequelize.sync` after setting the associations!

const path = require('path')

const basename = path.resolve(path.join(__dirname, '..'))

console.log(basename)

const db = require(`${basename}/models/index`)
const AllData = require(`${basename}/bin/init_data`)

const seed = obj => {
  Object.keys(obj).forEach(key => {
    obj[key].forEach(name => {
      if (typeof name === 'string') {
        // if string, convert 'string' to 'object' first.
        db[key].create({ name })
      } else {
        // if object, call create(object) directly.
        db[key].create(name)
      }
    })
  })
}

db.sequelize
  .sync({ force: true })
  .then(() => seed(AllData))
  .then(() => console.log('Sync tables and Seeded successfully.'))
  .catch(err => console.error(err))
