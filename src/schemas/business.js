import Joi from 'joi'
import { authUserBodySchema } from './user'

const createBusinessBodySchema = authUserBodySchema.keys({
    businessName: Joi.string().required(),
    phoneNumber: Joi.string().min(11).max(11).required(),
    tagLine: Joi.string(),
    description: Joi.string(),
    website: Joi.string().required(),
})

const getBusinessParamSchema = Joi.object().keys({
    businessId: Joi.string().required(),
})

export { createBusinessBodySchema, authUserBodySchema, getBusinessParamSchema }
