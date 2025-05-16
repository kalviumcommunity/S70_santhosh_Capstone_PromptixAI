import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectionDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
const PORT = process.env.PORT||4000
const app=express();
 app.use(cors());
 await connectionDB()
 app.use(express.json())
 app.use('/api/user',userRouter)
 app.get('/',(req,res)=>res.send("API WORKING"))
 app.listen(PORT,()=>console.log(`Server running on port http://localhost:${PORT}`))



 // http://localhost:4000/api/user/register
 // http://localhost:4000/api/user/login
