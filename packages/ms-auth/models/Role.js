const mongoose = require('mongoose')

const { Schema } = mongoose

const RoleSchema = new Schema({
  name: {
    type: String,
    enum: ['member', 'owner', 'admin'],
    default: 'member',
  },
  desc: String,
  timestamp: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model('Role', RoleSchema, 'roles')
