import {Router} from 'express'

import {
    create,
    getAll,
    getMain,
    getNewsById,
    getNewsByTitle,
    getNewsByUser,
    update,
    deleteNew,
    updateLikeNews,
    addComment,
    removeComment   

        } from '../controllers/news.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'


const route=Router()

route.post('/',authMiddleware,create)
route.get('/',getAll)
route.get('/main',getMain)
route.get('/search', getNewsByTitle)
route.get('/byuser',authMiddleware,getNewsByUser)
route.patch('/like/:id',authMiddleware, updateLikeNews)
route.get('/:id', getNewsById)
route.patch('/:id',authMiddleware, update)
route.delete('/:id',authMiddleware, deleteNew)
route.patch('/comments/:newId',authMiddleware,addComment)
route.patch('/comments/:newId/:commentId',authMiddleware,removeComment)

export default route
