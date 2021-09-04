const mongoose = require("mongoose");

const Schema = mongoose.Schema

const ArticleSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, default: null },
  category: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

module.exports = mongoose.model('Article', ArticleSchema)
