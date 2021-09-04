const express = require('express')
const router = express.Router()

const User = require("../models/user")

const handlePageError = (res, e) => res.setStatus(500).send(e.message)

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        return res.send(users)
    } catch (e) {
        return handlePageError(res, e)
    }
})

// Create new user
router.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body)
        return res.send(user)
    } catch (e) {
        return handlePageError(res, e)
    }
})


module.exports = router
