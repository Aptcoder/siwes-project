const OTP = require('../models/Otp')
const User = require('../models/User')
const Business = require('../models/business')

const verifyEmail = async (req, res) => {
    const { email, otp, isBusiness } = req.body

    if (!email || !otp)
        return res.status(403).json({
            success: false,
            message: 'All fields are required',
        })

    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1)

    if (response.length === 0 || otp !== response[0].otp)
        return res.status(400).json({
            success: false,
            message: 'Invalid OTP',
        })

    let user

    if (isBusiness) user = await Business.findOne({ email }).exec()
    else user = await User.findOne({ email }).exec()

    user.isVerified = true
    await user.save()

    return res.status(201).json({
        success: true,
        message: `New user ${user.email} verified`,
    })
}

module.exports = verifyEmail
