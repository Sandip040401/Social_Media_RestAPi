

import mongoose from 'mongoose'
import { userSchema } from './user.schema.js'
import { ApplicationError } from '../../error-handler/applicationError.js';
import { blacklistTokenSchema } from './blacklistedtoken.schema.js';


const UserModel = mongoose.model('user',userSchema)
const BLacklistTokenModel = mongoose.model('blacklistToken',blacklistTokenSchema)

export default class UserRepository{

    async signUp(user){
        try {
            const newUser = new UserModel(user)
            await newUser.save();
            return newUser;
        } catch (err) {
            console.log(err);
            throw new ApplicationError('Something went wrong in db',500)
        }
    }

    async signIn(email){
        try {
            return await UserModel.findOne({email})
        } catch (err) {
            console.log(err);
            throw new ApplicationError('Something went wrong in db',500)
        }
    }

    async addToBlacklist(token) {
        try {
            const newBlacklistedToken = new BLacklistTokenModel({ token });
            return await newBlacklistedToken.save();
        } catch (err) {
            console.log(err);
            throw new ApplicationError('Failed to blacklist token', 500);
        }
    }

    async isTokenBlacklisted(token) {
        try {
            const foundToken = await BLacklistTokenModel.findOne({ token });
            return !!foundToken; // If foundToken exists, return true; otherwise, return false
        } catch (err) {
            console.log(err);
            throw new ApplicationError('Failed to check token blacklist', 500);
        }
    }
}