const { UserModel } = require("../Model/user.model")
const express=require('express')
const userRouter=express.Router()
const jwt=require("jsonwebtoken")
const bcrypt=require('bcrypt')
userRouter.post('/register',(req,res)=>{
    const {username,email,password}=req.body
    console.log(req.body)
    try{
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                console.log("Hiii",err)
                res.status(200).send({"err":err})
            }
            else{
                const user=new UserModel({userName:username,email:email,pass:hash})
                await user.save()
                res.status(200).send({"msg":"A user has been registered"})
            }
        })
    }
    catch{

    }
})
userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    console.log(email,pass)
    try{
        const user=await UserModel.findOne({email})
        console.log(user)
        bcrypt.compare(pass,user.pass,(err,result)=>{
            if(result){
                const token=jwt.sign({username:user.userName,userid:user.id},"masai")
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