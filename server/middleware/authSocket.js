import jwt from 'jsonwebtoken'

export const verifySocketToken = (socket,next) => {
    try {       
        let token = socket.handshake.query.token
        if (!token) return next(new Error("Authentication error: Token is missing."));       
        const verified = jwt.verify(token,process.env.JWT_SECRET)        
        socket.user=verified     
        next()        
    } catch (err) {
        next(new Error("Authentication error: Invalid token."));
    }
}