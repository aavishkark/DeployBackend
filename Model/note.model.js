const mongoose=require("mongoose")

const noteSchema=mongoose.Schema({
    title:String,
    body:String,
    userid:String,
    username:String
},{
    versionKey:null
})
const NoteModel=mongoose.model('note',noteSchema)
module.exports={
 NoteModel
}