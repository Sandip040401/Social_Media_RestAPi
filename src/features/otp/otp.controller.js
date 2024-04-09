import { OtpRepository } from "./otp.repository.js";


export default class OtpController{
    constructor(){
        this.repository  = new OtpRepository();
    }

    async sendOtp(req,res){
        try {
            const {email} = req.body;
            await this.repository.sendOtp(email)
            return res.status(200).send('Otp Send Successfully')
        } catch (err) {
            console.log(err);
            return res.status(400).send('something went wrong')
        }
    }

    async verifyOtp(req,res){
        try {
            const {otp,email} = req.body
            const result = await this.repository.verifyOtp(otp,email)
            if(result){
                return res.status(200).send("Otp verified")
            }else{
                return res.status(400).send('Invalid Otp')
            }
        } catch (err) {
            console.log(err);
            return res.status(400).send('something went wrong')
        }
    }
}