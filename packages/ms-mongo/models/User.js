const mongoose = require('mongoose')

const { Schema } = mongoose

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  website: {
    type: String,
  },
  company: {
    type: String,
  },
  password: {
    type: String,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
})

// add UserId after save
schema.post('save', function (doc) {
  console.log('=== schema ===: ', doc)
})

module.exports = mongoose.model('User', schema)
