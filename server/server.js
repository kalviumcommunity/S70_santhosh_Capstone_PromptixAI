import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectionDB from './config/mongodb.js';
const PORT = process.env.PORT||4000
const app=express();
 app.use(cors());
 await connectionDB()
 app.use(express.json())
 app.get('/',(req,res)=>res.send("API WORKING"))
 app.listen(PORT,()=>console.log(`Server running on port http://localhost:${PORT}`))