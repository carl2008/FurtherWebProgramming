const express = require('express')
const router = express.Router()

const Discussion = require('../models/discussion')
const SmallReply = require('../models/smallreply')
const Reply = require("../models/reply")
const ThumbsUp = require("../models/thumbsup")
const ThumbsDown = require("../models/thumbsdown")

const handlePageError = (res, e) => res.status(500).send(e.message)

// Get small replies 
router.get('/smallreplies', async (req, res) => {
    try {
        const replies = await SmallReply.find({})
        return res.send(replies)
    } catch (e) {
        return handlePageError(res, e)
    }
})

// Get all small replies by reply id
router.get('/replies/:id/smallreplies', async (req, res) => {
    try {
        // get id
        const id_reply = req.params.id
        const replies = await SmallReply.find({reply: id_reply }).populate("author")
        return res.send(replies)
    } catch (e) {
        return handlePageError(res, e)
    }
})

// Post a small reply to a reply
router.post('/replies/:id/smallreplies', async (req, res) => {
    try {
        // get id
        const id_reply = req.params.id
        // post new reply
        const smallreply = await SmallReply.create({
            content: req.body.content,
            author: req.body.author,
            discussion: req.body.discussion,
            reply: id_reply
        })
        // find out reply and push small reply
        await Reply.findByIdAndUpdate(
            id_reply,
            { $push: { smallreplies: smallreply._id} },
            {new: true, useFindAndModify: false }
        );
        // find out discussion and push small reply
        await Discussion.findByIdAndUpdate(
            req.body.discussion,
            { $push: { smallreplies: smallreply._id} },
            {new: true, useFindAndModify: false }
        );
        return res.send(smallreply)
    } catch (e) {
        return handlePageError(res, e)
    }
})

// Delete a small reply
router.delete('/smallreplies/:id', async (req, res) => {
    try {
        const id_reply = req.params.id
        await ThumbsUp.deleteMany({ smallreply: id_reply })
        await ThumbsDown.deleteMany({ smallreply: id_reply })
        await Reply.findOneAndUpdate(
            { smallreplies: id_reply },
            { $pull: { smallreplies: id_reply } },
            { multi: true }
        );
        await Discussion.findOneAndUpdate(
            { smallreplies: id_reply },
            { $pull: { smallreplies: id_reply } },
            { multi: true }
        );
        await SmallReply.deleteOne({ _id: id_reply })
        return res.json({ message: `Deleted reply ${id_reply} successfully.` })
    } catch (e) {
        return handlePageError(res, e)
    }
})

module.exports = router