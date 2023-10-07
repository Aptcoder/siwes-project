import mongoose, { Schema } from 'mongoose'

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    // description: {
    //     type: String,
    //     required: true,
    //     trim: true,
    // },
})

module.exports = mongoose.model('Category', categorySchema)