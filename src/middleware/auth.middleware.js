import userService from '../services/user.service.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const authMiddleware=(req,res, next)=>{
    try {
        const {authorization}=req.headers
        if(!authorization){return res.status(401)}
        const parts= authorization.split(' ')
        if(parts.length !== 2){res.send(401)}
        const [bearer, token] = parts
       
        if(bearer!=='Bearer'){res.send(401)}
    
        jwt.verify(token ,process.env.KEY_JWT, async(error, decode)=>{

            if(error){return res.status(401).send('expired token')}

            const user=await userService.getByIdService(decode.id)

            if(!user){res.status(404).send('user not found')}

            req.userId=user._id    

            return next()
    
        })
        
        
        
    } catch (error) {
        res.status(500).send({message: error.message})
    }
   
}