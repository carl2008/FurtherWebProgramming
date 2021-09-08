const express = require('express')
const router = express.Router()

const Discussion = require('../models/discussion')
const Reply = require("../models/reply")

const handlePageError = (res, e) => res.status(500).send(e.message)

// Get replies 
router.get('/replies', async (req, res) => {
    try {
        const replies = await Reply.find({})
        return res.send(replies)
    } catch (e) {
        return handlePageError(res, e)
    }
})

// Get all replies by discussion id
router.get('/discussions/:id/replies', async (req, res) => {
    try {
        // get id
        const id_discussion = req.params.id
        const replies = await Reply.find({discussion: id_discussion })
        .populate("author")
        .populate("thumbsups")
        .populate("thumbsdowns")
        return res.send(replies)
    } catch (e) {
        return handlePageError(res, e)
    }
})

// Post a reply to a discussion
router.post('/discussions/:id/replies', async (req, res) => {
    try {
        // get id
        const id_discussion = req.params.id
        // post new reply
        const reply = await Reply.create({
            content: req.body.content,
            author: req.body.author,
            discussion: id_discussion
        })
        // find out discussion and push reply
        await Discussion.findByIdAndUpdate(
            id_discussion,
            { $push: { replies: reply._id} },
            {new: true, useFindAndModify: false }
        );
        return res.send(reply)
    } catch (e) {
        return handlePageError(res, e)
    }
})

// Delete a reply
router.delete('/replies/:id', async (req, res) => {
    try {
        const id_reply = req.params.id
        await Discussion.findOneAndUpdate(
            { replies: id_reply },
            { $pull: { replies: id_reply } },
            { multi: true }
        );
        await Reply.deleteOne({ _id: id_reply })
        return res.json({ message: `Deleted reply ${id_reply} successfully.` })
    } catch (e) {
        return handlePageError(res, e)
    }
})

module.exports = router