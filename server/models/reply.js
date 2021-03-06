const mongoose = require("mongoose");

const Schema = mongoose.Schema

const ReplySchema = new Schema({
  content: { type: String, default: null },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  discussion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Discussion'
  },
  smallreplies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "SmallReply"
  }],
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

module.exports = mongoose.model('Reply', ReplySchema)