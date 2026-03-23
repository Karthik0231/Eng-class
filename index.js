import express from 'express'
import mongoConnection from './db.js'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './routes/authRoutes.js'

dotenv.config()

const app = express()
app.use(express.json()) 

mongoConnection();
app.use(cors())

const PORT = process.env.PORT

console.log("hello")

//test Api(optional)
app.get("/test",(req,res)=>{
    res.send("hello world")
})

app.use('/auth',userRoutes)

app.listen(PORT,()=>{
    console.log("My new server running on "+PORT)
})

