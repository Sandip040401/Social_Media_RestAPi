import { CommentRepository } from "./comment.repository.js";


export default class CommentController{
    constructor(){
        this.commentRepository = new CommentRepository()
    }

    async addComment(req,res){
        try {
            const postId = req.params.id;
            const {content} = req.body;
            const userId = req.userID;
            await this.commentRepository.addComments(postId,userId,content)
            return res.status(200).send('Comment is Added')
        } catch (err) {
            console.log(err);
            return res.status(400).send('Something went wrong')
        }
    }

    async getComment(req,res){
        try {
            const postId = req.params.id;
            const comment = await this.commentRepository.getComments(postId)
            return res.status(200).send(comment);
        } catch (err) {
            console.log(err);
            return res.status(400).send('Something went wrong')
        }
    }

    async updateComment(req,res){
        try {
            const {content} = req.body;
            await this.commentRepository.updateComments(content)
            return res.status(200).send("Comment Updated")
        } catch (err) {
            console.log(err);
            return res.status(400).send('Something went wrong')
        }
    }

    async deleteComment(req,res){
        try {
            const id = req.params.id;
            await this.commentRepository.deleteComments(id)
            return res.status(200).send('Comment Deleted')
        } catch (err) {
            console.log(err);
            return res.status(400).send('Something went wrong')
        }
    }
}