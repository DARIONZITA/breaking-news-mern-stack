import bcrypt from "bcryptjs"
import {userByEmail,generateToken} from "../services/auth.service.js"

const login= async(req, res)=>{
    try {
        const {email, password}=req.body 
        const user= await userByEmail(email)

        if(!user){res.status(401).send('user or password incorrect')}

        const userIsValid =await bcrypt.compare(password,user.password)
        if(!userIsValid){res.status(401).send('user or password incorrect')}
        
        const token = generateToken(user._id)
        res.send({token})
   
            
    } catch (error) {
      res.status(500).send({message: error.message})
    }
    

}

export {login}