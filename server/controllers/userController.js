const asyncHandler = require('express-async-handler')
const User = require('../models/user');
const generateToken = require('../utils/generateToken');

const registerUser = asyncHandler (async (req, res) => {
    const { firstName, lastName, emailAddress, username, password } = req.body;

    const userExists = await User.findOne({ emailAddress });

    if (userExists) {
        res.status(400)
        throw new Error('User Already exists');
    }

    const user = await User.create({
        firstName, lastName, emailAddress, username, password
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            emailAddress: user.emailAddress,
            username: user.username,
            password: user.password,
            role: user.role,
            pic: user.pic,
            token:generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Error Occured!')
    }

});

const authUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            emailAddress: user.emailAddress,
            username: user.username,
            password: user.password,
            role: user.role,
            pic: user.pic,
            token:generateToken(user._id)
        });
    } else {
      res.status(400);
      throw new Error ("Invalid Username or Password!");
    }

});


module.exports={ registerUser, authUser };