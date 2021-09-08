const mongoose = require("mongoose");

const Schema = mongoose.Schema

const SmallReplySchema = new Schema({
  content: { type: String, default: null },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  reply: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reply'
  },
  thumbsups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "ThumbsUp"
  }],
  thumbsdowns: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "ThumbsDown"
  }]
}, {
  timestamps: {
    createdAt: 'created_at'
  }
})

module.exports = mongoose.model('SmallReply', SmallReplySchema)