import {Router} from 'express'
import User from '../models/User.js'
import { verifyToken } from '../middleware/auth.js'

const router = Router()

router.get("/",verifyToken,async(req,res)=>{
    try { 
        const user = await User.findById(req.user.id)
        const userObject = user.toJSON()
        delete userObject.password
        res.status(200).send({user:userObject})        
    } catch (error) {
        res.status(403).json({error:error.message})
    }
})

export default router