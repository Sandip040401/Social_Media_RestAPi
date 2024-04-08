
import mongoose from 'mongoose'

export const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required:true,
        match: [/.+\@.+\../,"Please enter a valid Email"]
    },
    password: String,
    gender: {type:String, enum:['Male','Female','Others']}
})