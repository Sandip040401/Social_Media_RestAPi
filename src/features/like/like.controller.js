import { LikeRepository } from "./like.repository.js";

export class LikeController{

    constructor(){
        this.likeRepository = new LikeRepository()
    }
    async likePost(req,res){
        try {
            const id = req.params.id;
            const { type } = req.query;
            const userId = req.userID;
            if(type!='Post' && type!='Comment'){
                return res.status(400).send('Invalid Input');
            }
            if(type=='Post'){
                this.likeRepository.likePost(userId,id)
            }else{
                this.likeRepository.likeComment(userId,id)
            }
            return res.status(200).send("successfully liked");
        } catch (err) {
            console.log(err);
            return res.status(500).send('Something went wrong')
        }
    }

    async getLikes(req,res){
        try {
            const id = req.params.id;
            const { type } = req.query;
            const likes =  await this.likeRepository.getLikes(type,id)
            return res.status(200).send(likes)
        } catch (err) {
            console.log(err);
            return res.status(500).send('Something went wrong')
        }
    }

    async getById(req,res){
        try {
            const id = req.params.id;
            const like = await this.likeRepository.getById(id)
            return res.status(200).send(like)
        } catch (err) {
            console.log(err);
            return res.status(500).send('Something went wrong')
        }
    }
}