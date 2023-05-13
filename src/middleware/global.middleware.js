import mongoose from 'mongoose'
import userService from '../services/user.service.js'

const validId = (req, res, next) => {
    try {
        const id=req.params.id
        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(400).send({message:'ID no valid'})
        }
        next()
    } catch (error) {
        res.status(500).send({message: error.message})
    }
    
}
const validUser =async (req, res, next) => {
    try{
        const id=req.params.id

        const user = await userService.getByIdService(id)

        if(!user){
            res.status(400).send({message:'user no found'})
        }
        req.user = user
        req.id = id
        next()
    } catch(error){
        res.status(500).send({message: error.message})
    }
}   

export default {validId, validUser}