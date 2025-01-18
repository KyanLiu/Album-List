const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    albums: [{
        albumId: {
            type: String,
            required: true
        },
        rating: Number,
        date: {
            type: Date,
            required: true
        }
    }],
})
const User = mongoose.model('User', userSchema)

module.exports = User