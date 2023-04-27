import Post from '../models/Post.js'
import User from '../models/User.js'

export const createPost = async(req,res) => {
    if (req.user.id!==req.body.userId){
        return res.status(403).json("you are not authorized")
    }
    try {
        const {userId,picturePath,description} = req.body
        const user = await User.findById(userId)
        let filename = ""
        if (req.file){
            filename = req.file.filename
        }
        const newPost = new Post({
        userId:userId,
        firstName:user.firstName,
        lastName:user.lastName,
        location:user.location,
        userPicturePath:user.picturePath,
        description:description,
        picturePath:filename
        })
        await newPost.save()
        const posts = await Post.find().sort({createdAt:'desc'})
        res.status(201).json(posts)        
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

export const getFeedPosts = async(req,res) => {
    try {
        const posts = await Post.find().sort({createdAt:'desc'})
        res.status(200).json(posts)

    } catch (error) {
        res.status(404).json({error:error.message})
    }

}

export const getUserPost = async(req,res) => {
    try {
        const {userId} = req.params
        const posts = await Post.find({userId:userId}).sort({createdAt:"desc"})
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({error:error.message})
    }

}

export const likePost = async(req,res) => {
    try {
        const {id} = req.params        
        const post = await Post.findById(id)
        if(post.likes.get(req.user.id)){
            post.likes.delete(req.user.id)
        }else{
            post.likes.set(req.user.id,true)
        }
        await post.save()
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({error:error.message})        
    }
    
}