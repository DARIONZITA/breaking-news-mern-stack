import {Router} from 'express'
import usercontroller from '../controllers/user.controller.js'
import valid from '../middleware/global.middleware.js'

const {validId, validUser} = valid

const route= Router();
route.post('/',usercontroller.create)
route.get('/',usercontroller.getAll)
route.get('/:id',validId,validUser,usercontroller.getById)
route.patch('/:id',validId,validUser,usercontroller.updateUser)
export default route