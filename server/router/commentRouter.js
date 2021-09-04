const express = require('express')
const router = express.Router()

const Article = require('../models/article')
const User = require("../models/user")
const Comment = require("../models/comment")

const handlePageError = (res, e) => res.setStatus(500).send(e.message)

// Get all comments
router.get('/articles/:id/comments', async (req, res) => {
    try {
        const comments = await Comment.find({})
        return res.send(comments)
    } catch (e) {
        return handlePageError(res, e)
    }
})

// Comment on an article
router.post('/users/:user_id/articles/:art_id/comment', async (req, res) => {
    try {
        // user id
        const id_user = req.params.user_id
        const id_article = req.params.art_id
        // create article
        const comment = await Comment.create({
            content: req.body.content,
            author: id_user,
            article: id_article
        })
        // find out user and push new article
        const user = await User.findByIdAndUpdate(
            id,
            { $push: { articleCmts: comment._id } },
            { new: true, useFindAndModify: false }
        );
        const article = await Article.findByIdAndUpdate(
            id,
            { $push: { articleCmts: comment._id} },
            {new: true, useFindAndModify: false }
        );
        return res.send(user), res.send(article)
    } catch (e) {
        return handlePageError(res, e)
    }
})

// Delete a comment
router.delete('/articles/:id/comments/:cmt_id', async (req, res) => {
    try {
        const id_cmt = req.params.cmt_id
        await User.findOneAndUpdate(
            { articleCmts: id_cmt },
            { $pull: { articleCmts: id_cmt } },
            { multi: true }
        );
        await Comment.deleteOne({ _id: id_cmt })
    } catch (e) {
        return handlePageError(res, e)
    }
})

module.exports = router