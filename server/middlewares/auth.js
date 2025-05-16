import jwt from 'jsonwebtoken'

const userAuth= async (req,res,next)=>{
    const {token} = req.body
    if(!token){
        return res.json({success:false , message:"Not Authenticated , Login Again"})
    }
    try{
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        if(tokenDecode.id){
            req.body.userID=tokenDecode.id
        }else{
            return res.json({message:"Not Authenticated ", success:false})
        }
        next()
    }catch(error){
        res.json({success:false,message:error.message})
    }
}
export default userAuth