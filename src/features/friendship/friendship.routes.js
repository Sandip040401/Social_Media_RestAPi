
import express from 'express'
import FriendController from './friendship.controller.js';



const friendRouter = express.Router();
const friendController = new FriendController();

friendRouter.post('/:id',(req,res)=>{
    friendController.addComment(req,res)
})



export default friendRouter