
import express from 'express'
import UserController from './user.controller.js';



const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/signup',(req,res)=>{
    userController.signUp(req,res)
})

userRouter.post('/signin',(req,res)=>{
    userController.signIn(req,res)
})

userRouter.get('/logout',(req,res)=>{
    userController.logout(req,res)
})

userRouter.get('/logout-all-devices',(req,res)=>{
    userController.logoutAllDevices(req,res)
})

userRouter.get('/get-details/:userId',(req,res)=>{
    userController.getDetailsById(req,res)
})

userRouter.get('/get-all-details',(req,res)=>{
    userController.getDetails(req,res)
})

userRouter.put('/update-details/:userId',(req,res)=>{
    userController.updateDetails(req,res)
})
export default userRouter