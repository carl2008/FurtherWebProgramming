const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
        firstName: { 
            type: String, 
            required: true 
        },
        lastName: { 
            type: String, 
            required: true 
        },
        emailAddress: { 
            type: String, 
            required: true,
            unique: true
        },
        username: { 
            type: String, 
            required: true,
            unique: true 
        },
        password: { 
            type: String, 
            required: true 
        }, 
        role: { 
            type: String, 
            default: 'user' 
        },
        specialities: { 
            type: String, 
            required: false 
        }, 
        introduction: { 
            type: String, 
            required: false 
        },
        pic: {
            type: String,
            required: false,
            default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        },
        articlePosts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Article"
        }],
        DiscussionPosts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Discussion"
        }],
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
