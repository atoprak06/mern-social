import jwt from 'jsonwebtoken'

export const verifyToken = async(req,res,next) => {
    try {       
        let token = req.headers.authorization
        if (!token) return res.status(403).send("Access Denied")
        if(token.startsWith("Bearer ")){
            token = token.slice(7,token.length).trimLeft()
        }
        const verified = jwt.verify(token,process.env.JWT_SECRET)
        console.log(verified)
        req.user=verified
        const date = new Date(verified.iat*1000)
        console.log(`Token created at: ${date.toLocaleString()}`)
        next()        
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}