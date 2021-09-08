const mongoose = require("mongoose");

const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    articlePosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article"
    }],
    DiscussionPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Discussion"
    }]
})

module.exports = mongoose.model('User', UserSchema)
