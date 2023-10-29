const { UserModel } = require("../Model/user.model")
const express=require('express')
const userRouter=express.Router()
const jwt=require("jsonwebtoken")
const bcrypt=require('bcrypt')
userRouter.post('/register',(req,res)=>{
    const {username,email,pass}=req.body
    
    try{
        bcrypt.hash(pass,5,async(err,hash)=>{
            if(err){
                res.status(200).send({"err":err})
            }
            else{
                const user=new UserModel({username:username,email:email,pass:hash})
                await user.save()
                res.status(200).send({"msg":"A user has been registered"})
            }
        })
    }
    catch(err){
        console.log(err)
      res.status(400).send({"err":err})
    }
})
userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try{
        const user=await UserModel.findOne({email})
        bcrypt.compare(pass,user.pass,(err,result)=>{
            if(result){
                const token=jwt.sign({username:user.username,userid:user.id},"masai")
                res.status(200).send({"msg":"Login Successfull","token":token})
            }
            else{
                res.status(200).send({"msg":"wrong Credentials"})
            }
        })
    }
    catch(err){
        res.status(400).send({"err":err})
    }
})
module.exports={userRouter}