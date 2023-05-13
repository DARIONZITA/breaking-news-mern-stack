import User from '../models/user.js'
import jwt from 'jsonwebtoken'

const userByEmail= (email) => User.findOne({email:email}).select('+password')
 
const generateToken= (id) => jwt.sign({id: id},process.env.KEY_JWT,{expiresIn: '365d'}) 

export  {userByEmail, generateToken}