const express = require('express')
const router = express.Router()

const Article = require('../models/article')
const Like = require("../models/Like")

const handlePageError = (res, e) => res.status(500).send(e.message)

// Get likes 
router.get('/likes', async (req, res) => {
    try {
        const likes = await Like.find({})
        return res.send(likes)
    } catch (e) {
        return handlePageError(res, e)
    }
})

// Get all likes by article id
router.get('/articles/:id/likes', async (req, res) => {
    try {
        // get id
        const id_article = req.params.id
        const likes = await Like.find({article: id_article }).populate("author", "-articlePosts -__v")
        return res.send(likes)
    } catch (e) {
        return handlePageError(res, e)
    }
})

// Like on an article
router.post('/articles/:id/likes', async (req, res) => {
    try {
        // get id
        const id_article = req.params.id
        // create article
        const like = await Like.create({
            author: req.body.author,
            article: id_article
        })
        // find out article and push Like
        await Article.findByIdAndUpdate(
            id_article,
            { $push: { likes: like._id} },
            {new: true, useFindAndModify: false }
        );
        return res.send(like)
    } catch (e) {
        return handlePageError(res, e)
    }
})

// Delete a Like
router.delete('/likes/:id', async (req, res) => {
    try {
        const id_like = req.params.id
        await Article.findOneAndUpdate(
            { likes: id_like },
            { $pull: { likes: id_like } },
            { multi: true }
        );
        await Like.deleteOne({ _id: id_like })
        return res.json({ message: `Deleted Like ${id_like} successfully.` })
    } catch (e) {
        return handlePageError(res, e)
    }
})

module.exports = router
