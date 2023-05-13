 import mongoose from 'mongoose'

 const connectDatabase = () => {
    console.log('wait conneting to the database')
    
    mongoose
      .connect(process.env.MONGO_URI
    ,{useNewUrlParser: true, useUnifiedTopology:true})
      .then(()=>console.log('mongodb atlas connected'))
      .catch((error)=>console.log(error))
 } 
export default connectDatabase;