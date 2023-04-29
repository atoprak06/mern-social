import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Post'
    },
    userId:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    },
    likes: {
        type: Map,
        of: Boolean,
        default:{}
    },
},{timestamps:true})

const Comment = new mongoose.model('Comment',commentSchema)

export default Comment