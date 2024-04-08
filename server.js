
import express from 'express';
import { connectUsingMongoose } from './src/config/mongooseConfig.js';
import userRouter from './src/features/user/user.routes.js';
import postRouter from './src/features/post/post.routes.js';
import jwtAuth from './src/middlewares/jwt.middleware.js'
import commentRouter from './src/features/comment/comment.routes.js';

const server = express();

server.use(express.json())


server.use('/api/users',userRouter)
server.use('/api/posts',jwtAuth,postRouter)
server.use('/api/comments',jwtAuth,commentRouter)



server.use((req,res)=>{
    res.status(404).send("API not found");
})

server.listen(8000,()=>{
    console.log('Server is running at 8000');
    connectUsingMongoose();
})