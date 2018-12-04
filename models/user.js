const mongoose = require('mongoose')
const Schema = mongoose.Schema;

UserSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true

    },

    password: {
        type: String,
        required: true,

    },

    apikey: {
        type: String,
        required: true,
        unique: true
    }

})