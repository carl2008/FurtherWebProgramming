const express = require('express')
const { registerUser, authUser } = require('../controllers/userController')
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcryptjs');

const handlePageError = (res, e) => res.status(500).send(e.message)

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
    try {
        const userExists = await User.findOne({ _id: req.params.id });
        let hashPass = userExists.password
        if (req.body.password){
            const salt = await bcrypt.genSalt(10);
            hashPass = await bcrypt.hash(req.body.password, salt);
        }
        const result = await User.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {...req.body, password: hashPass}           
        }, {
            new: true, useFindAndModify: false
        })
        return res.send(result)
    } catch (e) {
        return next(e)
    }
    // await User.findByIdAndUpdate(req.params.id, {
    //     $set: req.body
    // }, (error, data) => {
    //     if (error) {
    //         return next(error);
    //     } else {
    //         res.json(data)
    //         console.log('User updated successfully !')
    //     }
    // })
});

router.route('/userUpdateRole/:id').put(async(req, res, next) => {
    try {
        const result = await User.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {role: req.body.role}           
        }, {
            new: true, useFindAndModify: false
        })
        return res.send(result)
    } catch (e) {
        return next(e)
    }
});

router.route('/getOneUser/:id').get((req, res, next) => {
    User.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

module.exports = router
