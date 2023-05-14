import Post from '../models/Post.js'
import User from '../models/User.js'
import Comment from '../models/Comment.js'

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
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;

        const startIndex = (page - 1) * limit;

        const posts = await Post.find()
                    .sort({ createdAt: "desc" })
                    .skip(startIndex)
                    .limit(limit);
        
        const totalPosts = await Post.countDocuments()
       
        res.status(200).json({posts: posts, totalPosts:totalPosts});

    } catch (error) {
        res.status(404).json({error:error.message})
    }

}

export const getUserPost = async(req,res) => {
    try {
        const {userId} = req.params
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const startIndex = (page - 1) * limit;

        const posts = await Post.find({userId:userId})
                                .sort({createdAt:"desc"})
                                .skip(startIndex)
                                .limit(limit);
        const totalPosts = await Post.countDocuments({userId:userId})
        res.status(200).json({posts:posts,totalPosts:totalPosts})
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

export const getComments = async(req,res) => {
    try {
        const {id} = req.params
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 7
        const startIndex = (page - 1) * limit 
        const comments = await Post.findById(id).select({comments:1,_id:0}).populate({
            path: "comments",
            options: { sort: { createdAt: "desc" },skip:startIndex,limit:limit },
          })
        const totalComments = await Post.findById(id)
        res.status(200).json({comments:comments,totalComments:totalComments.comments.length})
    } catch (error) {
        res.status(404).json({error:error.message})
    } 
}

export const postComment = async(req,res) => {
    try {
        const {id} = req.params
        const {text} = req.body
        const newComment = new Comment({
            postId: id,
            userId: req.user.id,
            text: text
        })

        await Post.findByIdAndUpdate(
            id,
            { $push: { comments: newComment } },
            { new: true }
        )

        await newComment.save()

        res.status(201).json(newComment)
    } catch (error) {
        res.status(404).json({error:error.message})
    }

}