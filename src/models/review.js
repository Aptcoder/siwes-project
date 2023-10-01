import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
    business: {
        type: mongoose.ObjectId,
        required: true,
        ref: 'Business',
    },

    user: {
        type: mongoose.ObjectId,
        required: true,
        ref: 'User',
    },

    comment: {
        type: String,
        required: true,
    },

    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
})

module.exports = mongoose.model('Review', reviewSchema)
