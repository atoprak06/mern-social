import Comment from '../models/Comment.js'

export const likeComment = async(req,res) => {    
    try {
        const {commentId} = req.params
        const comment = await Comment.findById(commentId)
        if(comment.likes.get(req.user.id)){
            comment.likes.delete(req.user.id)
        }else{
            comment.likes.set(req.user.id,true)
        }
        await comment.save()
        res.status(201).json("success")
    } catch (error) {
        res.status(404).json({error:error.message})
    }
    
}