
import express from 'express'
import PostController from './post.controller.js';
import {upload} from '../../middlewares/fileupload.middleware.js'


const postRouter = express.Router();
const postController = new PostController();

postRouter.post('/',upload.single('imageUrl'),(req,res)=>{
    postController.addPost(req,res)
})

postRouter.get('/:id',(req,res)=>{
    postController.getPostById(req,res)
})

postRouter.get('/',(req,res)=>{
    postController.getPosts(req,res)
})

postRouter.put('/:id',upload.single('imageUrl'),(req,res)=>{
    postController.updatePost(req,res)
})

postRouter.delete('/:id',(req,res)=>{
    postController.deletePost(req,res)
})


export default postRouter