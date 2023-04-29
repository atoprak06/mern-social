import {Router} from 'express'
import { verifyToken } from '../middleware/auth.js'
import {getFeedPosts,getUserPost,likePost,getComments,postComment} from '../controllers/post.js'

const router = Router()

router.get('/',verifyToken,getFeedPosts)
router.get('/:userId/posts',verifyToken,getUserPost)
router.patch('/:id/like',verifyToken,likePost)
router.post('/:id/comments',verifyToken,postComment)
router.get('/:id/comments',verifyToken,getComments)



export default router