
import express from 'express'
import CommentController from './comment.controller.js';



const commentRouter = express.Router();
const commentController = new CommentController();

commentRouter.post('/:id',(req,res)=>{
    commentController.addComment(req,res)
})

commentRouter.get('/:id',(req,res)=>{
    commentController.getComment(req,res)
})

commentRouter.put('/:id',(req,res)=>{
    commentController.updateComment(req,res)
})

commentRouter.delete('/:id',(req,res)=>{
    commentController.deleteComment(req,res)
})



export default commentRouter