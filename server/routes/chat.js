import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import {createNewChat,getChats,getChat} from "../controllers/chat.js"
const router = Router()

router.post("/newChat",verifyToken,createNewChat)
router.get("/chats",verifyToken,getChats)
router.get("/:id",verifyToken,getChat)
export default router