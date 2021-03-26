const { expect } = require('chai')
const mongoose = require('mongoose')
const connectMongoDB = require('../connect')
const Account = require('../models/Account')

describe('Account', () => {
  before('connect', done => {
    new Promise(resolve => {
      setTimeout(() => {
        connectMongoDB()
        resolve('connected')
      }, 1000)
    }).then(() => done())
  })

  after('connect', done => {
    mongoose.connection.close()
    done()
  })

  let callback
  beforeEach(() => {
    callback = function () {}
  })
  it('account', () => {
    const account = Account.find({
      username: 'admin',
      'role.name': 'admin',
      'category.name': 'local',
      phone: { $in: ['1347', '8221246'] },
    })
      .limit(10)
      .sort({ username: -1 })
      .select({ username: 1, phone: 1 })
      .exec(callback)
    expect([1, 2]).to.be.an('array').that.does.not.include(3)
  })
})

describe('Authentication', () => {
  it('authentication', () => {
    expect({ a: 1 }).to.not.have.property('b')
  })
})
