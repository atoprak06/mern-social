import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    content:{
       type:String,
       required:true
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    chatId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat"        
    }
},{timestamps:true})

export const Message = new mongoose.model('Message',messageSchema)

const chatSchema = new mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Message',
    }],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})

const Chat = new mongoose.model('Chat',chatSchema)

export default Chat