const mongoose = require("mongoose");

const Schema = mongoose.Schema

const LikeSchema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article'
  }
}, {
  timestamps: {
    createdAt: 'created_at'
  }
})

module.exports = mongoose.model('Like', LikeSchema)