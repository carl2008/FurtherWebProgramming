const express = require('express')
const { registerUser, authUser } = require('../controllers/userController')
const router = express.Router()

// const User = require("../models/user")

// const handlePageError = (res, e) => res.setStatus(500).send(e.message)

router.route('/').post(registerUser);
router.route("/login").post(authUser);

// // Get all users
// router.get('/users', async (req, res) => {
//     try {
//         const users = await User.find({})
//         return res.send(users)
//     } catch (e) {
//         return handlePageError(res, e)
//     }
// })

// // Create new user
// router.post('/users', async (req, res) => {
//     try {
//         const user = await User.create(req.body)
//         return res.send(user)
//     } catch (e) {
//         return handlePageError(res, e)
//     }
// })

module.exports = router
