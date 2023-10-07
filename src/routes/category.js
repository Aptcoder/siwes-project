import express from 'express'
import validateRequest from '../middlewares/validator'
import { auth } from '../middlewares/auth'
import {
    createCategoriesBodySchema,
    updateCategoryBodySchema,
    deleteCategoryBodySchema,
} from '../schemas/category'
import { USER_ROLES } from '../utils/constants'
const categoryController = require('../controllers/category')

function categoryRoutes() {
    const router = express.Router()

    router
        .route('/')
        .get(categoryController.getAllCategories)
        .post(
            auth(USER_ROLES.admin),
            validateRequest(createCategoriesBodySchema),
            categoryController.createNewCategory
        )
        .patch(
            auth(USER_ROLES.admin),
            validateRequest(updateCategoryBodySchema),
            categoryController.updateCategory
        )
        .delete(
            auth(USER_ROLES.admin),
            validateRequest(deleteCategoryBodySchema),
            categoryController.deleteCategory
        )

    return router
}

export { categoryRoutes }
