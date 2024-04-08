import PostRepository from "./post.repository.js"


export default class PostController{

    constructor(){
        this.postRepository = new PostRepository;
    }

    async addPost(req,res){
        try {
            const {caption} = req.body;
            const imageBuffer = req.file.filename;
            const userId = req.userID;
            const newPost = await this.postRepository.add(caption,imageBuffer,userId);
            res.status(201).send(newPost)
        } catch (err) {
            console.log(err);
            res.status(400).send('something went wrong')
        }
    }

    async getPostById(req,res){
        try{
            const postId = req.params.id
            const post = await this.postRepository.getOnePost(postId)
            if(!post){
                res.status(400).send('post not found')
            }else{
                res.status(200).send(post)
            }
        }catch(err){
            console.log(err);
            res.status(400).send('something went wrong')
        }
    }

    async getPosts(req,res){
        try {
            const id = req.userID;
            const post = await this.postRepository.getPosts(id)
            if(post){
                return res.status(200).send(post)
            }else{
                return res.status(400).send("something went wrong")
            }
        } catch (err) {
            console.log(err);
            res.status(400).send('Something went wrong')
        }
    }

    async deletePost(req,res){
        try {
            const postId = req.params.id
            await this.postRepository.deletePost(postId)
            return res.status(200).send('Post deleted successfully')
        } catch (err) {
            console.log(err);
            res.status(400).send('Something went wrong')
        }
    }

    async updatePost(req,res){
        try {
            const {caption} = req.body;
            const post = await this.postRepository.updatePost(caption,req.file.filename)
            if(post){
                return res.status(200).send("Post Updated Successfully")
            }else{
                return res.status(400).send('Something went wrong')
            }
        } catch (err) {
            console.log(err);
            res.status(400).send('Something went wrong')
        }
    }
}