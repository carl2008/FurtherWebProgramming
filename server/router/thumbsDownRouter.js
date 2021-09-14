const express = require('express')
const router = express.Router()

const Reply = require('../models/reply')
const SmallReply = require('../models/smallreply')
const ThumbsDown = require("../models/thumbsdown")

const handlePageError = (res, e) => res.status(500).send(e.message)

// Get thumbs down
router.get('/thumbsdown', async (req, res) => {
    try {
        const thumbsdown = await ThumbsDown.find({})
        return res.send(thumbsdown)
    } catch (e) {
        return handlePageError(res, e)
    }
})

// Get all thumbs down by reply id
router.get('/replies/:id/thumbsdown', async (req, res) => {
    try {
        // get id
        const id_reply = req.params.id
        const thumbsdown = await ThumbsDown.find({reply: id_reply }).populate("author")
        return res.send(thumbsdown)
    } catch (e) {
        return handlePageError(res, e)
    }
})

// Click thumbs down for a reply
router.post('/replies/:id/thumbsdown', async (req, res) => {
    try {
        // get id
        const id_reply = req.params.id
        // add thumbs up
        const thumbsdown = await ThumbsDown.create({
            author: req.body.author,
            reply: id_reply
        })
        // find out reply and push thumbs down
        await Reply.findByIdAndUpdate(
            id_reply,
            { $push: { thumbsdowns: thumbsdown._id} },
            {new: true, useFindAndModify: false }
        );
        return res.send(thumbsdown)
    } catch (e) {
        return handlePageError(res, e)
    }
})

// Get all thumbs down by small reply id
router.get('/smallreplies/:id/thumbsdown', async (req, res) => {
    try {
        // get id
        const id_reply = req.params.id
        const thumbsdown = await ThumbsDown.find({smallreply: id_reply }).populate("author")
        return res.send(thumbsdown)
    } catch (e) {
        return handlePageError(res, e)
    }
})

// Click thumbs down for a small reply
router.post('/smallreplies/:id/thumbsdown', async (req, res) => {
    try {
        // get id
        const id_reply = req.params.id
        // add thumbs up
        const thumbsdown = await ThumbsDown.create({
            author: req.body.author,
            smallreply: id_reply
        })
        // find out small reply and push thumbs down
        await SmallReply.findByIdAndUpdate(
            id_reply,
            { $push: { thumbsdowns: thumbsdown._id} },
            {new: true, useFindAndModify: false }
        );
        return res.send(thumbsdown)
    } catch (e) {
        return handlePageError(res, e)
    }
})

// Delete a thumbs down
router.delete('/thumbsdown/:id', async (req, res) => {
    try {
        const id_thumbsdown = req.params.id
        await Reply.findOneAndUpdate(
            { thumbsdowns: id_thumbsdown },
            { $pull: { thumbsdowns: id_thumbsdown } },
            { multi: true }
        );
        await SmallReply.findOneAndUpdate(
            { thumbsdowns: id_thumbsdown },
            { $pull: { thumbsdowns: id_thumbsdown } },
            { multi: true }
        );
        await ThumbsDown.deleteOne({ _id: id_thumbsdown })
        return res.json({ message: `Deleted thumbs down ${id_thumbsdown} successfully.` })
    } catch (e) {
        return handlePageError(res, e)
    }
})

module.exports = router