const express = require('express')
const router = express.Router()

const Reply = require('../models/reply')
const SmallReply = require('../models/smallreply')
const ThumbsUp = require("../models/thumbsup")

const handlePageError = (res, e) => res.status(500).send(e.message)

// Get thumbs up
router.get('/thumbsup', async (req, res) => {
    try {
        const thumbsup = await ThumbsUp.find({})
        return res.send(thumbsup)
    } catch (e) {
        return handlePageError(res, e)
    }
})

// Get all thumbs up by reply id
router.get('/replies/:id/thumbsup', async (req, res) => {
    try {
        // get id
        const id_reply = req.params.id
        const thumbsup = await ThumbsUp.find({reply: id_reply }).populate("author")
        return res.send(thumbsup)
    } catch (e) {
        return handlePageError(res, e)
    }
})

// Click thumbs up for a reply
router.post('/replies/:id/thumbsup', async (req, res) => {
    try {
        // get id
        const id_reply = req.params.id
        // add thumbs up
        const thumbsup = await ThumbsUp.create({
            author: req.body.author,
            reply: id_reply
        })
        // find out reply and push thumbs up
        await Reply.findByIdAndUpdate(
            id_reply,
            { $push: { thumbsups: thumbsup._id} },
            {new: true, useFindAndModify: false }
        );
        return res.send(thumbsup)
    } catch (e) {
        return handlePageError(res, e)
    }
})

// Get all thumbs up by small reply id
router.get('/smallreplies/:id/thumbsup', async (req, res) => {
    try {
        // get id
        const id_reply = req.params.id
        const thumbsup = await ThumbsUp.find({smallreply: id_reply }).populate("author")
        return res.send(thumbsup)
    } catch (e) {
        return handlePageError(res, e)
    }
})

// Click thumbs up for a small reply
router.post('/smallreplies/:id/thumbsup', async (req, res) => {
    try {
        // get id
        const id_reply = req.params.id
        // add thumbs up
        const thumbsup = await ThumbsUp.create({
            author: req.body.author,
            smallreply: id_reply
        })
        // find out small reply and push thumbs up
        await SmallReply.findByIdAndUpdate(
            id_reply,
            { $push: { thumbsups: thumbsup._id} },
            {new: true, useFindAndModify: false }
        );
        return res.send(thumbsup)
    } catch (e) {
        return handlePageError(res, e)
    }
})

// Delete a thumbs up
router.delete('/thumbsup/:id', async (req, res) => {
    try {
        const id_thumbsup = req.params.id
        await Reply.findOneAndUpdate(
            { thumbsups: id_thumbsup },
            { $pull: { thumbsups: id_thumbsup } },
            { multi: true }
        );
        await SmallReply.findOneAndUpdate(
            { thumbsups: id_thumbsup },
            { $pull: { thumbsups: id_thumbsup } },
            { multi: true }
        );
        await ThumbsUp.deleteOne({ _id: id_thumbsup })
        return res.json({ message: `Deleted thumbs up ${id_thumbsup} successfully.` })
    } catch (e) {
        return handlePageError(res, e)
    }
})

module.exports = router