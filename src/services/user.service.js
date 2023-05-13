import User from "../models/user.js"


const createService= (body)=> User.create(body)

const getAllService=()=> User.find()

const getByIdService= (id) => User.findById(id)


const updateServer= (
    id,
    name,
    username,
    email,
    password,
    avatar,
    background
) => User.findOneAndUpdate({_id:id},{name,username,email,password,avatar,background})

export default {
    createService,
    getAllService,
    getByIdService,
    updateServer
    
}