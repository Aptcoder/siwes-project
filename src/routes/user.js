import express from 'express'
import validateRequest from '../middlewares/validator'
import { auth } from '../middlewares/auth'
import { authUserBodySchema, createUserBodySchema } from '../schemas/user'
import { USER_ROLES } from '../utils/constants'
const usersController = require('../controllers/users')

function userRoutes() {
    const router = express.Router()

    router
        .route('/')
        .get(auth(USER_ROLES.admin), usersController.getAllUsers)
        .post(
            validateRequest(createUserBodySchema),
            usersController.createNewUser
        )
        .patch(usersController.updateUser)
        .delete(usersController.deleteuser)

    router.post(
        '/auth',
        validateRequest(authUserBodySchema),
        usersController.loginUser
    )

    return router
}

export { userRoutes }
