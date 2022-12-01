//======================== database encription authentication .======================
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose=require("mongoose")
const app=express()
const User=require("./models/user.model")
const md5 = require("md5")
const mongo_url=process.env.M_url
const port =process.env.PORT
//const port=5000
app.use(cors());
mongoose.connect(mongo_url)
.then(()=>{
    console.log("mongo db is connected")
}).catch((error)=>{
    console.log(error)
    process.exit(1)
})


app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/views/index.html")
 })

app.post("/register",async(req,res)=>{
    const {email,password}=req.body
    try {
        const newUser= new User({
            email:email,
            password: md5(password)
        })
     await   newUser.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({
            message: "this is not ok"
        })
    }
})

app.post("/login",async(req,res)=>{
    try {
        const email=req.body.email
        const password=md5(req.body.password)

        const user=await User.findOne({
            email: email
        })
        if(user && user.password === password){
            res.status(200).json({status:"valid user"})
        }else{
            res.status(200).json({status:" not valid user"})
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})
 app.use((err,req,res,next)=>{
    res.status(500).json({
        message:"something broke"
    })
 })
app.listen( port||5000,()=>{
    console.log(`server is running at http://localhost:${port}`)
})