import userService from '../services/user.service.js'


const create=async(req, res)=>{
    
        try {
            const {name,username,email,password,avatar,background} = req.body
            if(!name || !username||!email||!password||!avatar||!background){
                res.status(400).send({message:'dados insuficientes'})
             
            }
        
            let user=await userService.createService(req.body)
        
            if(!user){
                res.status(400).send({message:'Error creating User'})
            }
        
        
            res.status(201).send({
                user:{
                id:user._id,
                name,
                username,
                email,
                avatar,
                background
                },
                message:'user created sucessful'
                }
            )
        } catch (error) {
            res.status(500).send({message: error.message})
        }

}
const getAll = async (req, res) => {
    try {
        let Users= await userService.getAllService()
        Users.length === 0 ? res.status(400).send({message:'There are no registers users'}) : res.send(Users)
        
    } catch (error) {
        res.status(500).send({message: error.message})
    }
}

const getById = async(req, res)=>{
   try{
        let user = req.user

        res.send(user)
    } catch(error){
        res.status(500).send({message: error.message})
    }
}
const updateUser = async(req, res) => {
    try{
        const {name,username,email,password,avatar,background} = req.body
        if(!name && !username && !email && !password && !avatar && !background){
            return res.status(400).send({message:'no one date for change'})
        }
        let id=req.id

        await userService.updateServer(id,name,username,email,password,avatar,background)
        
        res.send({message:'update sucessfull'})
    } catch(error) { 

        res.status(500).send({message: error.message})
    }


}

export default {create, getAll, getById, updateUser}