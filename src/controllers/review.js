const Business = require('../models/business')
const Review = require('../models/review')
const { USER_ROLES } = require('../utils/constants')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

const getAllReviewsForBusiness = asyncHandler(async (req, res) => {
    const { businessId } = req.params
    const reviews = await Review.find({
        business: businessId,
    })
    return res.json({
        success: true,
        message: 'Business Reviews retrieved successfully',
        data: reviews,
    })
})

const createReview = asyncHandler(async (req, res) => {
    const { comment, rating } = req.body
    const { businessId } = req.params
    const { id: userId } = req.user

    const review = new Review({
        user: userId,
        comment,
        rating,
        business: businessId,
    })

    await review.save()

    return res.send({
        success: true,
        message: 'Business review created successfully',
        data: review,
    })
})
module.exports = {
    getAllReviewsForBusiness,
    createReview,
}
