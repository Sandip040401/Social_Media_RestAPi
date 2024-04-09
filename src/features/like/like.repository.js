
import mongoose from 'mongoose'
import { LikeSchema } from './like.schema.js'
import {ObjectId} from "mongodb"
import { ApplicationError } from '../../error-handler/applicationError.js';

const LikeModel =  mongoose.model('Like',LikeSchema)

export class LikeRepository{

    async getLikes(type,id){
        try {
            return await LikeModel.find({
                likeable: new ObjectId(id),
                types: type
            }).populate('user').populate({path:'likeable', model:type})
        } catch (err) {
            console.log(err);
            throw new ApplicationError('Something went wrong in db',500)
        }

    }

    async likePost(userId, postId){
        try {
            const newLike = new LikeModel({
                user: new ObjectId(userId),
                likeable: new ObjectId(postId),
                types:'post'
            })
            await newLike.save()
        } catch (err) {
            console.log(err);
            throw new ApplicationError('Something went wrong in db',500)
        }
    }

    async likeComment(userId, commentId){
        try {
            const newLike = new LikeModel({
                user: new ObjectId(userId),
                likeable: new ObjectId(commentId),
                types:'comment'
            })
            await newLike.save()
        } catch (err) {
            console.log(err);
            throw new ApplicationError('Something went wrong in db',500)
        }
    }

    async getById(id){
        try {
            return await LikeModel.find({
                likeable: new ObjectId(id)
            }).populate('user')
        } catch (err) {
            console.log(err);
            throw new ApplicationError('Something went wrong in db',500)
        }
    }
}