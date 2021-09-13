const mongoose = require("mongoose");

const Schema = mongoose.Schema

const ThumbsDownSchema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reply: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reply'
  },
  smallreply: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SmallReply'
  }
}, {
  timestamps: {
    createdAt: 'created_at'
  }
})

module.exports = mongoose.model('ThumbsDown', ThumbsDownSchema)