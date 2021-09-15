const express = require('express')
const { registerUser, authUser } = require('../controllers/userController')
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.route('/').post(registerUser);
router.route("/login").post(authUser);

router.get('/getUsers', async (req, res) => {
    try {
        const users = await User.find({})
        return res.send(users)
    } catch (e) {
        return handlePageError(res, e)
    }
})

router.route('/userUpdate/:id').put(async(req, res, next) => {
    User.findById(req.params.id, async (error, data) => {
        if (error){
            return next(error)
        }
        else{
            console.log(data.password)
            if(data.password !== req.body.password){
                req.body.password = await bcrypt.hash(req.body.password, 8)
            }
        }
    })
    await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
            console.log('User updated successfully !')
        }
    })
})

router.route('/getOneUser/:id').get((req, res) => {
    User.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

module.exports = router
