import express from 'express'
import validateRequest from '../middlewares/validator'
import { createFileUploadURL } from '../controllers/misc'
import Joi from 'joi'

function getMiscRoutes() {
    const router = express.Router()

    router.post(
        '/upload_url',
        validateRequest(
            Joi.object().keys({
                filename: Joi.string().required(),
            })
        ),
        createFileUploadURL
    )

    return router
}

export { getMiscRoutes }
