import Joi from 'joi'

export const createReviewBodySchema = Joi.object().keys({
    comment: Joi.string().required(),
    rating: Joi.number().integer().min(1).max(5).required(),
})
