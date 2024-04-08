import mongoose from 'mongoose'

export const postSchema = new mongoose.Schema({
    image: String,
    caption: String,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
}) 