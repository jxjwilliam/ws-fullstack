const mongoose = require('mongoose')

const { Schema } = mongoose

const RoleSchema = new Schema({
  name: {
    type: String,
    enum: ['member', 'owner', 'admin'],
    default: 'member',
  },
  desc: String,
})

const CategorySchema = new Schema({
  name: {
    type: String,
    enum: ['local', 'wechat', 'gmail', 'others'], // 可能从oAuth2 来。
    default: 'local',
  },
  desc: String,
})

module.exports = {
  RoleSchema,
  CategorySchema,
}
