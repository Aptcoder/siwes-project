import mongoose from 'mongoose'
import { USER_ROLES } from '../utils/constants'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },

    firstName: {
        type: String,
        trim: true,
    },

    lastName: {
        type: String,
        trim: true,
    },

    password: {
        type: String,
        required: true,
        trim: true,
    },

    role: {
        type: String,
        enum: Object.keys(USER_ROLES),
        default: USER_ROLES.guest,
    },

    isVerified: {
        type: Boolean,
        default: false,
    },
})

module.exports = mongoose.model('User', userSchema)
