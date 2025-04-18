import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const registerUser= async(req,res)=>{
    try{
        const {name , email ,password}=req.body;
        if(!name||!email||!password){
            return res.json({success:false,message:"All fields are mandatory"})
        }
         const salt =await bcrypt.genSalt(10)
         const hashedPassword= await bcrypt.hash(password,salt)
         const userData={
            name,
            email,
            password:hashedPassword
         }
         const newUser= new userModel(userData)
         const user =await newUser.save()
         //JWT-start
         const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{ expiresIn: "7d" })
         res.json({success:true,token,user:{name:user.name}})
         //JWT-end
    }catch(error){
         console.log(error)
         res.json({success:false,message:error.message})
    }
}