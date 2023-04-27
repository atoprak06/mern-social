import {Router} from 'express'
import { verifyToken } from '../middleware/auth.js'
import {getFeedPosts,getUserPost,likePost} from '../controllers/post.js'

const router = Router()

router.get('/',verifyToken,getFeedPosts)
router.get('/:userId/posts',verifyToken,getUserPost)
router.patch('/:id/like',verifyToken,likePost)


export default router