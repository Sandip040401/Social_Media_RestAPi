import UserRepository from "./user.repository.js";
import bcrypt from 'bcrypt'
import UserModel from "./user.model.js"
import jwt from 'jsonwebtoken'

export default class UserController{

    constructor(){
        this.userRepository = new UserRepository()
    }

    async signUp(req,res){
        try {
            const{name,email,password,gender} = req.body
            const hashedPassword = await bcrypt.hash(password,12)
            const user = new UserModel(name,email,hashedPassword,gender);
            await this.userRepository.signUp(user);
            res.status(201).send(user);
        } catch (err) {
            console.log(err);
            res.status(400).send('Something went wrong')
        }
    }

    async signIn(req,res){
        try {
            const user = await this.userRepository.signIn(req.body.email)
            if(!user){
                return res.status(400).send('Incorrect Credentials')
            }else{
                const result = await bcrypt.compare(req.body.password,user.password)
                if(result){
                    const token = jwt.sign({userID: user._id,email:user.email},
                        process.env.JWT_SECRET,
                        {
                            expiresIn:'1h',
                        }
                    )
                    return res.status(200).send(token)
                }else{
                    return res.status(400).send('Incorrect Credentials')
                }
            }
        } catch (err) {
            console.log(err);
            res.status(400).send('Something went wrong')
        }
    }

    async logout(req,res){
            const token = req.headers['authorization'];
            if (!token) {
                return res.status(401).send('Unauthorized');
            }
            try {
                await this.userRepository.addToBlacklist(token);
                res.status(200).send('Logged out successfully');
        } catch (err) {
            console.log(err);
            res.status(400).send('Something went wrong')
        }
    }

    async logoutAllDevices(req,res){
        try {
            
        } catch (err) {
            console.log(err);
            res.status(400).send('Something went wrong')
        }
    }

    async getDetailsById(req,res){
        try {
            
        } catch (err) {
            console.log(err);
            res.status(400).send('Something went wrong')
        }
    }

    async getDetails(req,res){
        try {
            
        } catch (err) {
            console.log(err);
            res.status(400).send('Something went wrong')
        }
    }

    async updateDetails(req,res){
        try {
            
        } catch (err) {
            console.log(err);
            res.status(400).send('Something went wrong')
        }
    }
}