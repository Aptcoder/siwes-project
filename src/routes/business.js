import express from 'express'
import validateRequest from '../middlewares/validator'
import { auth } from '../middlewares/auth'
import {
    authUserBodySchema,
    createBusinessBodySchema,
} from '../schemas/business'
import { USER_ROLES } from '../utils/constants'
const businessController = require('../controllers/business')

function getBusinessRoutes() {
    const router = express.Router()

    router
        .route('/')
        .get(auth(USER_ROLES.admin), businessController.getAllBusinesses)
        .post(
            validateRequest(createBusinessBodySchema),
            businessController.createBusiness
        )
    // .patch(businessController.updateBusiness)
    // .delete(businessController.deleteuser)

    router.post(
        '/auth',
        validateRequest(authUserBodySchema),
        businessController.loginBusiness
    )

    return router
}

export { getBusinessRoutes }
