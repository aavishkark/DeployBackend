const express=require('express')
const noteRouter=express.Router()
const {NoteModel}=require("../Model/note.model")
const {auth}=require('../Middleware/auth.middleware')
const noterouter=express.Router()
noteRouter.use(auth)
noteRouter.post("/create",async(req,res)=>{
  try{
   const note=new NoteModel(req.body)
   await note.save()
   res.status(200).send({"msg":"A new note has been created"})
  }
  catch(err){
   res.status(400).send({"err":err})
  }
})
noteRouter.get("/",async(req,res)=>{
    try{
      const notes=await NoteModel.find({username:req.body.username})
      res.status(200).send({"Notes":notes})
    }
    catch(err){
        res.status(400).send({"Error":err})
    }
})
noteRouter.patch("/update/:noteid",async(req,res)=>{
  const {noteID}=req.params;
  const note=await NoteModel.findOne({_id:noteID})
  try{
  if(req.body.userID==note.userID){
    await NoteModel.findByIdandUpdate({_id:noteID},req.body)
    res.status(200).send({"msg":`The note with ID: ${noteID} has been updated`})
  }
  else{
    res.status(200).send({"msg":"You are not authorized"})
  }
  }
  catch(err){
    res.status(400).send({"error":err})
  }
    
})
noteRouter.patch("/delete/:noteid",async(req,res)=>{
  const {noteID}=req.params;
  const note=await NoteModel.findOne({_id:noteID})
  try{
  if(req.body.userID==note.userID){
    await NoteModel.findByIdandDelete({_id:noteID},req.body)
    res.status(200).send({"msg":`The note with ID: ${noteID} has been deleted`})
  }
  else{
    res.status(200).send({"msg":"You are not authorized"})
  }
  }
  catch(err){
    res.status(400).send({"error":err})
  }
})
module.exports={
    noteRouter
}