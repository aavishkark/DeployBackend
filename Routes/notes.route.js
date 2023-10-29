const express=require('express')
const noteRouter=express.Router()
const {NoteModel}=require("../Model/note.model")
const {auth}=require('../Middleware/auth.middleware')
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
  const {noteid}=req.params;
  const note=await NoteModel.findOne({_id:noteid})
  // console.log(note,noteid)
  try{
  if(note!=undefined){
    console.log("Hiii",req.body)
    await NoteModel.findByIdAndUpdate(noteid,req.body)
    res.status(200).send({"msg":`The note with ID: ${noteid} has been updated`})
  }
  else{
    res.status(200).send({"msg":"You are not authorized"})
  }
  }
  catch(err){
    res.status(400).send({"error":err})
  }
    
})
noteRouter.delete("/delete/:noteid",async(req,res)=>{
  const {noteid}=req.params;
  const note=await NoteModel.findOne({_id:noteid})
  // console.log(note._id,`new ObjectId(${noteid})`)
  // console.log(note._id==`new ObjectId("${noteid}")`)
  try{
  if(note!=undefined){
    console.log("Hiii",noteid)
    await NoteModel.findByIdAndDelete(noteid)
    res.status(200).send({"msg":`The note with ID: ${noteid} has been deleted`})
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