const express = require('express')
const router = express.Router()

const Article = require('../models/article')
const Comment = require("../models/comment")

const handlePageError = (res, e) => res.status(500).send(e.message)

// Get comments 
router.get('/comments', async (req, res) => {
    try {
        const comments = await Comment.find({})
        return res.send(comments)
    } catch (e) {
        return handlePageError(res, e)
    }
})

// Get all comments by article id
router.get('/articles/:id/comments', async (req, res) => {
    try {
        // get id
        const id_article = req.params.id
        const comments = await Comment.find({article: id_article }).populate("author", "-articlePosts -__v")
        return res.send(comments)
    } catch (e) {
        return handlePageError(res, e)
    }
})

// Comment on an article
router.post('/articles/:id/comments', async (req, res) => {
    try {
        // get id
        const id_article = req.params.id
        // create article
        const comment = await Comment.create({
            content: req.body.content,
            author: req.body.author,
            article: id_article
        })
        // find out article and push comment
        await Article.findByIdAndUpdate(
            id_article,
            { $push: { comments: comment._id} },
            {new: true, useFindAndModify: false }
        );
        return res.send(comment)
    } catch (e) {
        return handlePageError(res, e)
    }
})

// Delete a comment
router.delete('/comments/:id', async (req, res) => {
    try {
        const id_cmt = req.params.id
        await Article.findOneAndUpdate(
            { comments: id_cmt },
            { $pull: { comments: id_cmt } },
            { multi: true }
        );
        await Comment.deleteOne({ _id: id_cmt })
        return res.json({ message: `Deleted comment ${id_cmt} successfully.` })
    } catch (e) {
        return handlePageError(res, e)
    }
})

module.exports = router
