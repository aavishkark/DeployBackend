const express=require('express')
const app=express()
const connection=require('./db')
const { userRouter } = require('./Routes/users.routes')
const { noteRouter } = require('./Routes/notes.route')
const cors=require('cors')
app.use(cors())
require("dotenv").config()
app.use(express.json())
app.use('/users',userRouter)
app.use('/notes',noteRouter)
app.get('/',(req,res)=>{
    res.send({"msg":"Thi is the home page for testinf the server"})
})
app.listen(4500,async()=>{
    await connection
    console.log("App connected to atlas")
    console.log("App running on port 4500")
})