import express from 'express'
import validateRequest from '../middlewares/validator'
import { auth } from '../middlewares/auth'
import {
    authUserBodySchema,
    createBusinessBodySchema,
    getBusinessParamSchema,
} from '../schemas/business'
import { createReviewBodySchema } from '../schemas/review'

const businessController = require('../controllers/business')
const reviewController = require('../controllers/review')

function getBusinessRoutes() {
    const router = express.Router()

    router
        .route('/')
        .get(businessController.getAllBusinesses)
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

    // router.get(
    //     '/:businessId',
    //     auth(),
    //     validateRequest(null, getBusinessParamSchema),
    //     businessController.getBusiness
    // )

    const singleBusinessRouter = express.Router({
        mergeParams: true,
    })

    singleBusinessRouter.use(validateRequest(null, getBusinessParamSchema))

    singleBusinessRouter.get('/', businessController.getBusiness)
    singleBusinessRouter.get(
        '/reviews',
        reviewController.getAllReviewsForBusiness
    )

    singleBusinessRouter.post(
        '/reviews',
        auth(),
        validateRequest(createReviewBodySchema),
        reviewController.createReview
    )

    singleBusinessRouter.get('/reviews/:reviewId', reviewController.getReview)
    singleBusinessRouter.delete(
        '/reviews/:reviewId',
        reviewController.deleteReview
    )

    router.use('/:businessId', singleBusinessRouter)

    return router
}

export { getBusinessRoutes }
