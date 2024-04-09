
// Manage routes/paths to likeController

// Import express
import express from "express";
import OtpController from "./otp.controller.js";


// Initialize express router
const otpRouter = express.Router();
const otpController = new OtpController();
// All the paths to controller methods
otpRouter.post('/send',(req,res) => {
    otpController.sendOtp(req,res)
});

otpRouter.post('/verify',(req,res) => {
    otpController.verifyotp(req,res)
});

// export router
export default otpRouter;