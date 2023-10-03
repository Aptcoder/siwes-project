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

    images: {
        type: [String],
    },
})

reviewSchema.pre('save', async function () {
    const businessId = this.business
    const Business = mongoose.model('Business')

    const business = await Business.findById(businessId)
    if (!business) {
        return next(new Error('Business not found'))
    }

    const currentSum = business.ratingData.sum
    const currentCount = business.ratingData.count

    const avg = (currentSum + this.rating) / (currentCount + 1)

    business.rating = avg
    business.ratingData.sum = currentSum + this.rating
    business.ratingData.count = currentCount + 1

    await business.save()
    return
})

module.exports = mongoose.model('Review', reviewSchema)
