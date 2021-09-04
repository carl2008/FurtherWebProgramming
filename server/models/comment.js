const mongoose = require("mongoose");

const Schema = mongoose.Schema

const CommentSchema = new Schema({
  content: { type: String, default: null },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
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

module.exports = mongoose.model('Comment', CommentSchema)