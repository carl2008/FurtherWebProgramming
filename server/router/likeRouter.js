const express = require('express')
const router = express.Router()

const Article = require('../models/article')
const User = require("../models/user")
const Like = require("../models/like")

const handlePageError = (res, e) => res.setStatus(500).send(e.message)

// Get all likes
router.get('/articles/:id/likes', async (req, res) => {
    try {
        const likes = await Like.find({})
        return res.send(likes)
    } catch (e) {
        return handlePageError(res, e)
    }
})

// Like an article
router.post('/users/:user_id/articles/:art_id/like', async (req, res) => {
    try {
        // user id
        const id_user = req.params.user_id
        const id_article = req.params.art_id
        // create article
        const like = await Like.create({
            author: id_user,
            article: id_article
        })
        // find out user and push new article
        const user = await User.findByIdAndUpdate(
            id,
            { $push: { articleLikes: like._id } },
            { new: true, useFindAndModify: false }
        );
        const article = await Article.findByIdAndUpdate(
            id,
            { $push: { articleLikes: like._id} },
            {new: true, useFindAndModify: false }
        );
        return res.send(user), res.send(article)
    } catch (e) {
        return handlePageError(res, e)
    }
})

// Unlike an article
router.delete('/articles/:id/likes/:like_id', async (req, res) => {
    try {
        const id_like = req.params.like_id
        await User.findOneAndUpdate(
            { articleLikes: id_like },
            { $pull: { articleLikes: id_like } },
            { multi: true }
        );
        await Like.deleteOne({ _id: id_like })
    } catch (e) {
        return handlePageError(res, e)
    }
})

module.exports = router