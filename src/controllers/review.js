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

const getReview = asyncHandler(async (req, res) => {
    const { businessId, reviewId } = req.params
    const review = await Review.findOne({
        business: businessId,
        _id: reviewId,
    })
    return res.json({
        success: true,
        message: 'Business Review retrieved successfully',
        data: review,
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

const deleteReview = asyncHandler(async (req, res) => {
    const { businessId, reviewId } = req.params
    const { id: userId } = req.user

    const review = await Review.findOne({
        id: reviewId,
        business: businessId,
    })

    if (!review) {
        return res.status(404).send({
            success: false,
            message: 'Review not found',
            data: review,
        })
    }

    if (review.user != userId) {
        return res.status(403).send({
            success: false,
            message: 'Review can not be deleted by the user',
            data: review,
        })
    }

    await Review.deleteOne({ _id: review.id })

    return res.send({
        success: true,
        message: 'Review deleted',
    })
})
module.exports = {
    getAllReviewsForBusiness,
    createReview,
    deleteReview,
    getReview,
}
