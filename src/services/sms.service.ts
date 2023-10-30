
import twilio from 'twilio';
import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } from "../config/env.config";

export const sendAuthInitOTPSMS = async (
    phoneNumber: string,
    otp: string
) => {
    const message = `<#> ${otp} is your One Time Password(OTP) for verification at TestApp. Ref: NBa0gyxsT9W`;
    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    await client.messages.create({
        body: message,
        from: TWILIO_PHONE_NUMBER,
        to: phoneNumber
    });
};
