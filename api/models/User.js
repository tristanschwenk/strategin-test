const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,    
    accessToken: String,
    creationTime: {
        type: Date,
        default: () => new Date()
    },
})

module.exports = new mongoose.model("User", userSchema)