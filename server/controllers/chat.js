import Chat from "../models/Chat.js"

export const createNewChat = async (req, res) => {
    const selectedFriends = JSON.parse(req.body.selectedFriends);
    
    if (Object.keys(selectedFriends).length === 1) {
      try {
        const existingChat = await Chat.findOne({
            createdBy: { $in: [req.user.id, selectedFriends[0]] },
            participants: { $in: [req.user.id, selectedFriends[0]] },
        });
  
        if (existingChat) {
          res.status(200).json(existingChat);
          return;
        }
      } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
        return;
      }
    }
  
    const newChat = new Chat({
      participants: selectedFriends,
      createdBy: req.user.id,
    });
  
    try {
      await newChat.save();
      res.status(201).json(newChat);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  };

export const getChats = async(req,res) => {
    const chats = await Chat.find({$or: [{createdBy: req.user.id}, {participants: req.user.id}]}).populate({path:"participants",select:"-password -email -friends -viewedProfile -impressions -createdAt -updatedAt -__v"}).populate({path:"createdBy",select:"-password -email -friends -viewedProfile -impressions -createdAt -updatedAt -__v"}).sort({updatedAt:"desc"})
    res.status(200).json(chats)
}

export const getChat = async(req,res) => {
    const chat = await Chat.findById(req.params.id).populate({path:"participants",select:"-password -email -friends -viewedProfile -impressions -createdAt -updatedAt -__v"}).populate({path:"messages",options:{populate:{path:"sender",select:"-password -email -friends -viewedProfile -impressions -createdAt -updatedAt -__v"}, sort:{createdAt:"asc"}}}).populate({path:"createdBy",select:"-password -email -friends -viewedProfile -impressions -createdAt -updatedAt -__v"})
    res.status(200).json(chat)
}