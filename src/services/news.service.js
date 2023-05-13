import News from "../models/news.js";

const createService=(body)=>News.create(body)
const getAllService=(limit, offset)=> News.find().sort({_id: -1}).skip(offset).limit(limit).populate('user')
const countDocument=()=> News.countDocuments()
const getMainService= () => News.findOne().sort({_id: -1}).populate('user')
const getNewsByIdService = (id) => News.findById(id).populate('user')
const getNewsByTitleService = (title) => News.find({
    title:{$regex:`${title || " "}` ,$options:"i"}
}).sort({_id: -1})
const getNewsByUserService = (id)=> News.find({user: id})
const updateServer= (id,title,text,banner)=> News.findByIdAndUpdate({_id:id},{title,text,banner},{rawResult:true})
const deleteNewServer=(id)=>News.findByIdAndDelete(id)
const addLikeServer=(userId,newId)=>News.findOneAndUpdate({_id: newId, 'likes.userId':{$nin:[userId]}},{$push:{likes:{userId,create:new Date()}}})
const deleteLikeServer = (userId,newId) => News.findOneAndUpdate({_id: newId},{$pull:{likes:{userId}}})
const addCommentServer = (newId,comment,userId)=>{
    const commentId = Math.floor(Date.now()*Math.random()).toString(36)
    return News.findByIdAndUpdate(
        {_id: newId},
        {
            $push:{
                comments:{
                    comment,
                    commentId,
                    userId,
                    creatAt: new Date()
                }
            }
            
        }
    )


}
const removeCommentServer = (newId,commentId,userId)=>{
   
    return News.findByIdAndUpdate(
        {_id: newId},
        {
            $pull:{
                comments:{
                    commentId,
                    userId
                }
            }
            
        }
    )

}
export {
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
}