const express = require('express')
const router = express.Router()

const Discussion = require("../models/discussion")
const User = require("../models/user")
const Reply = require("../models/reply")
const SmallReply = require("../models/smallreply")
const ThumbsUp = require("../models/thumbsup")
const ThumbsDown = require("../models/thumbsdown")

const handlePageError = (res, e) => res.status(500).send(e.message)

// Get all discussions
router.get('/discussions', async (req, res) => {
    try {
        const result = await Discussion.find({})
            .populate("author")
            .populate("replies")
        return res.send(result)
    } catch (e) {
        return handlePageError(res, e)
    }
})

// Get discussion by id
router.get('/discussions/:id', async (req, res) => {
    try {
        const result = await Discussion.findOne({ _id: req.params.id })
        .populate("author")
        .populate("replies")
        return res.send(result)
    } catch (e) {
        return handlePageError(res, e)
    }
})

// Delete a discussion
// $pull: remove related data from user
router.delete('/discussions/:id', async (req, res) => {
    try {
        const id = req.params.id
        const replies = await Reply.find({ discussion: id })
        for(let i = 0; i<replies.length;i++){
            await ThumbsUp.deleteMany({ reply: replies[i]._id })
            await ThumbsDown.deleteMany({ reply: replies[i]._id })
        }
        await Reply.deleteMany({ discussion: id })
        const smallreplies = await SmallReply.find({ discussion: id })
        for(let i = 0; i<smallreplies.length;i++){
            await ThumbsUp.deleteMany({ smallreply: smallreplies[i]._id })
            await ThumbsDown.deleteMany({ smallreply: smallreplies[i]._id })
        }
        await SmallReply.deleteMany({ discussion: id })
        await User.findOneAndUpdate(
            { DiscussionPosts: id },
            { $pull: { DiscussionPosts: id } },
            { multi: true }
        );
        await Discussion.deleteOne({ _id: id })
        return res.json({ message: `Deleted discussion ${id} successfully.` })
    } catch (e) {
        return handlePageError(res, e)
    }
})

// Update a discussion
router.put('/discussions/:id', async (req, res) => {
    try {
        const result = await Discussion.findOneAndUpdate({ _id: req.params.id }, {
            title: req.body.title,
            content: req.body.content,
            lastUpdated: req.body.lastUpdated
        }, {
            new: true, useFindAndModify: false
        })
        return res.send(result)
    } catch (e) {
        return handlePageError(res, e)
    }
}
)

// Create new discussion
// $push: add related data to user

router.post('/users/:id/discussions', async (req, res) => {
    try {
        // user id
        const id = req.params.id
        // post discussion
        const discussion = await Discussion.create({
            title: req.body.title,
            content: req.body.content,
            author: id
        })
        // find out user and push new discussion
        await User.findByIdAndUpdate(
            id,
            { $push: { discussionPosts: discussion._id } },
            { new: true, useFindAndModify: false }
        );
        return res.send(discussion)
    } catch (e) {
        return handlePageError(res, e)
    }
})

module.exports = router