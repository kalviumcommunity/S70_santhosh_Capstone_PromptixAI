import mongoose from 'mongoose';
const connectionDB=async()=>{
    mongoose.connection.on('connected',( )=>{
        console.log("Database connected")

    })
    await mongoose.connect(`${process.env.MONGO_URI}`)
}
export default connectionDB;










