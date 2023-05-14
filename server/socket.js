import Chat,{Message} from "./models/Chat.js"

let activeUsers = []
const handleSocket = (socket,io)=>{
    console.log("client connected to server:",socket.user)
    console.log("connected",io.engine.clientsCount)

    if(!activeUsers.includes(socket.user.id)){
        activeUsers.push(socket.user.id)
    }
    console.log(activeUsers)  

    socket.on("userLogged",()=>{
        socket.join("activeUsers")
        socket.emit("activeUsers",activeUsers)
    })

    socket.on("listenActiveUsers",()=>{
        socket.join("activeUsers")
        socket.to("activeUsers").emit("activeUsers",activeUsers)
    })

    const handleStartChat = (chatId) => {
        socket.join(chatId)
        console.log('joined to room:',chatId)
    }

    const chatListener = async(data,callback)=>{
        console.log(data)
        const {msg,chatId} = data
        const message = new Message({content:msg,sender:socket.user.id,chatId:chatId})
        await message.save()
        await Chat.findOneAndUpdate({_id: chatId}, {$push: {messages: message}});
        const newMessage = await Message.findById(message._id).populate({path:"sender",select:"-password -email -friends -viewedProfile -impressions -createdAt -updatedAt -__v"})
        callback(newMessage) 
        socket.broadcast.emit("notifications",1)               
        socket.to(chatId).emit("chat",newMessage)
    }
   
    socket.on("startChat",handleStartChat)
    socket.on("chat",chatListener)
    socket.on("leaveRoom",(chatId)=>{
        console.log("leaved room:",chatId)
        socket.leave(chatId)
    })  

    socket.on("disconnect",()=>{
        activeUsers = activeUsers.filter(user=>user!==socket.user.id)        
        socket.to("activeUsers").emit("activeUsers",activeUsers) 
        socket.leave("activeUsers")       
        socket.disconnect()
        console.log(activeUsers)
        console.log("disconnected",io.engine.clientsCount)
    })  
 
}

export default handleSocket