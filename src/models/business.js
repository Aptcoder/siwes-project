import mongoose from 'mongoose'
import { USER_ROLES } from '../utils/constants'

const businessSchema = new mongoose.Schema({
    businessName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },

    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },

    tagLine: {
        type: String,
        required: false,
    },

    description: {
        type: String,
        required: false,
    },

    website: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },

    // password: {
    //     type: String,
    //     required: true,
    //     trim: true,
    // },

    // role: {
    //     type: String,
    //     enum: Object.keys(USER_ROLES),
    //     default: USER_ROLES.guest,
    // },

    // isVerified: {
    //     type: Boolean,
    //     default: false,
    // },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        trim: true,
    },

    isVerified: {
        type: Boolean,
        default: false,
    },
})

module.exports = mongoose.model('Business', businessSchema)
