
import mongoose from 'mongoose'
import { ObjectId } from 'mongodb'
import { ApplicationError } from '../../error-handler/applicationError.js'
import { commentSchema } from './comment.schema.js'

const CommentModel = mongoose.model('Comment',commentSchema)

export class CommentRepository{

    async addComments(postId,userId,comment){
        try {
            const newComment = new CommentModel({
                user: new ObjectId(userId),
                post: new ObjectId(postId),
                comment:comment
            })
            await newComment.save();
        } catch (err) {
            console.log(err);
            throw new ApplicationError('Something went wrong in db',500)
        }
    }

    async getComments(postId){
        try {
            return await CommentModel.find({
                post: new ObjectId(postId)
            })
        } catch (err) {
            console.log(err);
            throw new ApplicationError('Something went wrong in db',500)
        }
    }

    async updateComments(comment){
        try {
            await CommentModel.updateOne({ comment: comment });
            return;
        } catch (err) {
            console.log(err);
            throw new ApplicationError('Something went wrong in db',500)
        }
    }

    async deleteComments(id){
        try {
            return await CommentModel.deleteOne({
                _id: new ObjectId(id)
            })
        } catch (err) {
            console.log(err);
            throw new ApplicationError('Something went wrong in db',500)
        }
    }
}