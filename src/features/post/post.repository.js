import { ObjectId } from "mongodb";
import mongoose from 'mongoose'
import { postSchema } from "./post.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";



const PostModel = mongoose.model('Post',postSchema);


export default class PostRepository{

    async add(caption,imageBuffer,userId){
        try {
            const newPost = new PostModel({
                image: imageBuffer,
                caption: caption,
                user: new ObjectId(userId)
            });
            return await newPost.save();
        } catch (err) {
            console.log(err);
            throw new ApplicationError('Something went wrong in db',500)
        }
    }

    async getOnePost(id){
        try {
            const post = await PostModel.findById(id);
            if(!post){
                throw new Error('Post not found')
            }else{
                return post;
            }
        } catch (err) {
            console.log(err);
            throw new ApplicationError('Something went wrong in db',500)
        }
    }

    async getPosts(id){
        try {
            const post = await PostModel.find({
                user: new ObjectId(id)
            })
            if(!post){
                throw new Error('Post not found')
            }else{
                return post;
            }
        } catch (err) {
            console.log(err);
            throw new ApplicationError('Something went wrong in db',500)
        }
    }

    async deletePost(id){
        try {
            return await PostModel.deleteOne({
                _id: new ObjectId(id)
            })
        } catch (err) {
            console.log(err);
            throw new ApplicationError('Something went wrong in db',500)
        }
    }

    async updatePost(caption,image){
        try {
            const post = await PostModel.updateOne({
                image:image,
                caption:caption
            })
            return post;
        } catch (err) {
            console.log(err);
            throw new ApplicationError('Something went wrong in db',500)
        }
    }
}