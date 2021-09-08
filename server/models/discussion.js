const mongoose = require("mongoose");

const Schema = mongoose.Schema

const DiscussionSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, require: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reply"
  }]
}, {
  timestamps: {
    createdAt: 'created_at'
  }
})

module.exports = mongoose.model('Discussion', DiscussionSchema)