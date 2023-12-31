import express from 'express'
import { getMathRoutes } from './math'
import { userRoutes } from './user'
import { otpRoute } from './verify-email'
import { getBusinessRoutes } from './business'
import { getMiscRoutes } from './misc'

function getRoutes() {
    const router = express.Router()
    router.use('/math', getMathRoutes())
    router.use('/users', userRoutes())
    router.use('/businesses', getBusinessRoutes())
    router.use('/verify-email', otpRoute())
    router.use('/misc', getMiscRoutes())
    return router
}

export { getRoutes }
