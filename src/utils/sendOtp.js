const otpGenerator = require('otp-generator')
import OTP from '../models/Otp'
import { OTP_DIGITS_LENGTH, OTP_CONFIGURATIONS } from './constants'

export const sendOTP = async (email) => {
    let otp = otpGenerator.generate(OTP_DIGITS_LENGTH, OTP_CONFIGURATIONS)
    let result = await OTP.findOne({ otp })

    while (result?.email == email) {
        otp = otpGenerator.generate(OTP_DIGITS_LENGTH, OTP_CONFIGURATIONS)
        result = await OTP.findOne({ otp })
    }

    const otpPayload = { email, otp }
    await OTP.create(otpPayload)

    return {
        success: true,
        message: `OTP sent to ${email}`,
    }
}
