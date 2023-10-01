import Joi from 'joi'
import { USER_ROLES } from '../utils/constants'

const authUserBodySchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})

const createUserBodySchema = authUserBodySchema.keys({
    role: Joi.string()
        .valid(...Object.values(USER_ROLES))
        .required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
})

module.exports = {
    authUserBodySchema,
    createUserBodySchema,
}
