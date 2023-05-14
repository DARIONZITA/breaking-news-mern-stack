import {
    createService, 
    getAllService,
    countDocument,
    getMainService,
    getNewsByIdService,
    getNewsByTitleService,
    getNewsByUserService,
    updateServer,
    deleteNewServer,
    addLikeServer,
    deleteLikeServer,
    addCommentServer,
    removeCommentServer

} from "../services/news.service.js"



const create=async(req, res)=>{
   try {
    
    const {title,text, banner} = req.body

    if(!title || !text || !banner){
        return res.status(400).send({message:'submit all fields for registration'})
    }
    const user= await createService({
        title,
        text,
        banner,
        user: {_id: req.userId}
    
    })

    if(!user){
     res.status(400).send({message:'user not found'})   
    }

    res.status(201).send(user)

   } catch (error) {
    
    res.status(500).send({message: error.message})
   } 
  
}
const getAll=async(req, res)=>{
    try {
        let {limit, offset} = req.query
    limit= Number(limit)
    offset= Number(offset)
    if(!limit){limit = 5} 
    if(!offset){offset = 0}
    const urlCurrent=req.baseUrl
    const news=await getAllService(limit, offset)
    const total= await countDocument()
    const next=limit + offset
    const next_url=`${urlCurrent}?limit=${limit}&offset=${next < total ? next :total }`

    const prevent=offset-limit

    const prevent_url= `${urlCurrent}?limit=${limit}&offset=${prevent > 0 ? prevent : 0}`

    news.length==0? 
    res.send(news)
    :res.send({
        prevent_url,
        next_url,
        limit,
        offset,
        total,
        results: news.map(item=>
            ({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                Comments:item.comments,
                name:item.user.name,
                username:item.user.username,
                userAvatar:item.user.avatar
            })
            )
    })

        
    } catch (error) {

        res.status(500).send({message: error.message})
        
    }
    
}

const getMain = async(req, res) => {
try {
    const news=await getMainService()
    if(!news){
        return res.status(400).send({menssage:'there are no registered post'})
    }
    res.status(200).send({
      lastnews: {
            id: news._id,
            title: news.title,
            text: news.text,
            banner: news.banner,
            likes: news.likes,
            Comments:news.comments,
            name:news.user.name,
            username:news.user.username,
            userAvatar:news.user.avatar
        }
    })
      
} catch (error) {
    res.status(500).send({message: error.message})
}
} 

const getNewsById = async(req, res) => {
    try {        
    const id = req.params.id
    const news= await getNewsByIdService(id)  
    if(!news){return res.status(400).send({message:'without news'})}
    res.send({
        news: {
              id: news._id,
              title: news.title,
              text: news.text,
              banner: news.banner,
              likes: news.likes,
              Comments:news.comments,
              name:news.user.name,
              username:news.user.username,
              userAvatar:news.user.avatar
          }
      })
        
    } catch (error) {
        res.status(500).send({message:error.message})
        
    }



}
const getNewsByTitle= async(req, res) =>{
    try {
        const {title} = req.query

        const news = await getNewsByTitleService(title)
        if(news.length===0){res.status(400).send({message:'there are no news with this title'})}
        res.send({
            news: news.map(item=>
            ({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                Comments:item.comments,
                name:item.user.name,
                username:item.user.username,
                userAvatar:item.user.avatar
            })
            )}
        
        )
    } catch (error) {
        res.status(500).send({message:error.menssage})
    }

}
const getNewsByUser= async(req, res) => {
    try {
        const id = req.userId
        const news = await getNewsByUserService(id)
        if(!news){res.status(400).send('there are no news for this user')}
        res.send({
            news: news.map(item=>
                ({
                    id: item._id,
                    title: item.title,
                    text: item.text,
                    banner: item.banner,
                    likes: item.likes,
                    Comments:item.comments,
                    name:item.user.name,
                    username:item.user.username,
                    userAvatar:item.user.avatar
                })
                )
        })
    } catch (error) {
        res.status(500).send({message:error.menssage})
    }
}
const update=async(req, res)=>{
    try {
        
        const {title,text,banner}= req.body
        const userId = req.userId
        const id= req.params.id; 
        const news = await getNewsByIdService(id)
        if(!news){
            res.status(400).send({message:'new no found'})
        }
        if(!(news.user._id.equals(userId))){res.sendStatus(401)}
        if(!title && !text && !banner){res.send(400)}
        const newsUpdate =await updateServer(id,title,text,banner) 

        res.send({message:'post sussesfull update',newsUpdate})

    } catch (error) { 
        res.status(500).send({message: error.menssage})   
    }
}

const deleteNew=async(req, res)=>{
    try {
        const userId = req.userId
        const id= req.params.id; 
        const news = await getNewsByIdService(id)
        if(!news){
            res.status(400).send({message:'news no found'})
        }
        if(!(news.user._id.equals(userId))){res.sendStatus(401)}
        await deleteNewServer(id) 

        res.send({message:'post sussesfull delete'})

    } catch (error) { 
        res.status(500).send({message: error.menssage})   
    }
}
const updateLikeNews=async(req,res)=>{
    try{
    const userId = req.userId
    const newId = req.params.id
    const likes= await addLikeServer(userId,newId)
    if(!likes){
        await deleteLikeServer(userId,newId)
        return res.send({message:'Like was removed'})
    }
    res.send({message:'Like add successful'})
    } catch (error) { 
        res.status(500).send({message: error.menssage})   
    }
    }
const addComment= async(req, res)=>{
    try {
        const userId = req.userId
        const {newId}= req.params
        const {comment}= req.body
        if(!comment){return res.send(400)}
        await addCommentServer(newId,comment,userId)
        res.status(201).send({message:'comment successfully added'})

    } catch (error) {
        res.status(500).send({message: error.menssage})   
    }
    
}
const removeComment= async(req, res)=>{
    try {
        const userId = req.userId
        const {newId,commentId}= req.params
    
        const Comment_removed = await removeCommentServer(newId,commentId,userId)

        const filterComments = Comment_removed.comments.some((v) =>
         v.userId === userId)
        if(filterComments){res.sendStatus(401)}
        res.send({message:'comment successfully removed'})

    } catch (error) {
        res.status(500).send({message: error.menssage})   
    }
    
}


export {
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
}