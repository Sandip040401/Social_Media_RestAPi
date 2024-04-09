
import mongoose from 'mongoose'

export const LikeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    likeable:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'types'
    },
    types:{
        type: String,
        enum: ['Post','Comment']
    }
})