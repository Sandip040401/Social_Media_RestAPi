
import mongoose from 'mongoose'

export const commentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'post'
    },
    comment: String
})