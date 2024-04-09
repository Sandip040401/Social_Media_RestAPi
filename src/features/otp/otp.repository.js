import { ApplicationError } from "../../error-handler/applicationError.js";
import { OtpModel } from './otp.schema.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config();

export class OtpRepository {
    async sendOtp(email) {
        try {
            const otp = Math.floor(100000 + Math.random() * 900000);
            const existingOtp = await OtpModel.findOne({ email });
            if (existingOtp) {
                existingOtp.otp = otp;
                await existingOtp.save();
            } else {
                await OtpModel.create({ email, otp });
            }
            await this.sendEmail(email, otp);
            return
        } catch (err) {
            console.log(err);
            throw new ApplicationError('Error in sending OTP', 500);
        }
    }

    async verifyOtp(otp, email) {
        try {
            const existingOtp = await OtpModel.findOne({ email });
            if (!existingOtp || existingOtp.otp !== otp) {
                return false;
            }
            return true;
        } catch (err) {
            console.log(err);
            throw new ApplicationError('Error in verifying OTP', 500);
        }
    }

    async sendEmail(email, otp) {
        try {
            let transporter = nodemailer.createTransport({
                service:'gmail',
                auth:{
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            await transporter.sendMail({
                from: 'no-reply@example.com',
                to: email,
                subject: 'OTP Verification',
                text: `Your OTP is ${otp}. Please use this OTP to verify your account.`,
            });

            console.log('OTP email sent successfully.');
        } catch (err) {
            console.log('Error sending OTP email:', err);
            throw new ApplicationError('Error sending OTP email', 500);
        }
    }
}
