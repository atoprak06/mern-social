import {Router} from 'express'
import {verifyToken} from '../middleware/auth.js'
import { likeComment } from '../controllers/comment.js'

const router = Router()

router.post('/:commentId/like',verifyToken,likeComment)

export default router