import jwt from 'jsonwebtoken'
import { USER_ROLES } from '../utils/constants'

const allowedRoles = {
    guest: [USER_ROLES.admin, USER_ROLES.guest],
    admin: [USER_ROLES.admin],
    business: [USER_ROLES.business, USER_ROLES.admin],
}

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return reject(err)
            }
            return resolve(decoded)
        })
    })
}

export function auth(role = 'guest') {
    return async function (req, res, next) {
        try {
            const authHeader = req.header('Authorization')
            if (!authHeader) {
                return res.status(401).send({
                    message: 'Not allowed. Please supply a valid token',
                    success: false,
                    data: {},
                })
            }
            const [format, token] = authHeader.split(' ')
            if (format != 'Bearer') {
                return res.status(401).send({
                    message: 'Not allowed. Please supply a valid token',
                    success: false,
                    data: {},
                })
            }
            if (!token) {
                return res.status(401).send({
                    message: 'Not allowed. Please supply a valid token',
                    success: false,
                    data: {},
                })
            }

            const decoded = await verifyToken(token)
            req.user = decoded

            if (
                !allowedRoles[role] ||
                !allowedRoles[role].includes(decoded.role)
            ) {
                return res.status(403).send({
                    message: 'Not allowed.',
                    success: false,
                    data: {},
                })
            }
            return next()
        } catch (err) {
            console.log('err', err)
            return res.status(401).send({
                message: 'Invalid token supplied',
                status: false,
                data: {},
            })
        }
    }
}
