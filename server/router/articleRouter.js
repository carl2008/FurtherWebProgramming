const express = require('express')
const router = express.Router()

const Article = require("../models/article")
const User = require("../models/user")

const handlePageError = (res, e) => res.status(500).send(e.message)

// Get all articles
// populate: get related data from author
router.get('/articles', async (req, res) => {
    try {
        const result = await Article.find({})
            .populate("author", "-articlePosts -__v")
            .populate("likes")
            .populate("comments")
        return res.send(result)
    } catch (e) {
        return handlePageError(res, e)
    }
})

// Get article by id
router.get('/articles/:id', async (req, res) => {
    try {
        const result = await Article.findOne({ _id: req.params.id }).populate("author", "-articlePosts -__v")
        return res.send(result)
    } catch (e) {
        return handlePageError(res, e)
    }
})

// Delete an article
// $pull: remove related data from user/docter
router.delete('/articles/:id', async (req, res) => {
    try {
        const id = req.params.id
        await User.findOneAndUpdate(
            { articlePosts: id },
            { $pull: { articlePosts: id } },
            { multi: true }
        );
        await Article.deleteOne({ _id: id })
        return res.json({ message: `Deleted article ${id} successfully.` })
    } catch (e) {
        return handlePageError(res, e)
    }
})

// Update an article
router.put('/articles/:id', async (req, res) => {
    try {
        const result = await Article.findOneAndUpdate({ _id: req.params.id }, {
            title: req.body.title,
            content: req.body.content,
            category: req.body.category
        }, {
            new: true, useFindAndModify: false
        })
        return res.send(result)
    } catch (e) {
        return handlePageError(res, e)
    }
}
)

// Create new article
// $push: add related data to user/docter

router.post('/users/:id/article', async (req, res) => {
    try {
        // user id
        const id = req.params.id
        // create article
        const article = await Article.create({
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            author: id,
        })
        // find out user and push new article
        await User.findByIdAndUpdate(
            id,
            { $push: { articlePosts: article._id } },
            { new: true, useFindAndModify: false }
        );
        return res.send(article)
    } catch (e) {
        return handlePageError(res, e)
    }
})

// router.post('/articles', async (req, res) => {
//     try {
//         const article = await Article.create(req.body)
//         return res.send(article)
//     } catch (e) {
//         return handlePageError(res, e)
//     }
// })

module.exports = router
