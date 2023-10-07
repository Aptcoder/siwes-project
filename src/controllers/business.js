const Business = require('../models/business')
const { USER_ROLES } = require('../utils/constants')
const bcrypt = require('bcrypt')
const { sendOTP } = require('../utils/sendOtp')
import jwt from 'jsonwebtoken'

const getAllBusinesses = async (req, res) => {
    const businesses = await Business.find()
    return res.json({
        success: true,
        message: 'Businesses retrieved successfully',
        data: businesses,
    })
}

const getBusiness = async (req, res) => {
    const { businessId } = req.params
    console.log('bus', businessId)
    const business = await Business.findOne({ _id: businessId })
    if (!business) {
        return res.status(404).send({
            success: false,
            message: 'Business not found',
            data: business,
        })
    }

    return res.send({
        success: false,
        message: 'Business retrieved successully',
        data: business,
    })
}

const loginBusiness = async (req, res) => {
    const { email, password } = req.body

    const business = await Business.findOne({ email })
    if (!business) {
        return res.status(401).json({
            success: false,
            message: 'Incorrect email or password',
        })
    }

    if (!business.isVerified) {
        return res.status(401).json({
            success: false,
            message: 'Account not verified',
        })
    }

    const compareResult = await bcrypt.compare(password, business.password)

    if (!compareResult) {
        return res.status(401).json({
            success: false,
            message: 'Incorrect email or password',
        })
    }

    const token = jwt.sign(
        {
            id: business._id,
            role: USER_ROLES.business,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '18000000',
        }
    )

    return res.json({
        success: true,
        message: 'Login successful',
        data: {
            token,
            business,
        },
    })
}

const createBusiness = async (req, res) => {
    const businessData = req.body

    const existingBusiness = await Business.findOne({
        $or: [
            {
                businessName: businessData.businessName,
            },
            {
                email: businessData.email,
            },
            {
                phoneNumber: businessData.phoneNumber,
            },
        ],
    })

    if (existingBusiness) {
        return res.status(409).send({
            success: false,
            message: 'Business with name, email or phone number already exists',
        })
    }

    const hashedPassword = await bcrypt.hash(businessData.password, 10)
    businessData.password = hashedPassword

    let business = new Business(businessData)
    await business.save()

    const sendOTPResponse = await sendOTP(business.email)

    return res.json(sendOTPResponse)
}

module.exports = {
    getAllBusinesses,
    createBusiness,
    loginBusiness,
    getBusiness,
}
